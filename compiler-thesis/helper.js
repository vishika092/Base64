import {exec, execFile} from "child_process"
import { log } from "console";
import { cp } from "fs";



// sigkill , vs sigterm

export function execFn(args) {
    let output = {}
    let child = exec(args, {
        timeout: 4000,
        maxBuffer: 1024*90, //maxBuffer terminates succesfully
        killSignal: "SIGKILL"
    }, (error, stderr, stdout)=>{
       
        //time metrics enter 'stderr' only after program termination along with error.message (merged)
        if(error && error.message == "stdout maxBuffer length exceeded"){
            //node terminated process
            output.errorMsg = error.message;
        }
    });

    console.log(`node child-process : ${child.pid}, script : ${+child.pid + 2}`);
    return new Promise((resolve, reject) => {
        output.pid = +child.pid + 2;       

        let stdout = '';
        child.stdout.on('data', (data) => {
            stdout += data;
        });

        // Capture standard error -> nodejs error merged
        let stderr = '';
        child.stderr.on('data', (data) => {
            stderr += data;
        });


        // Capture the exit event
        child.on('exit', (code, signal) => {
            output.code = code;
            output.signal = signal;
            output.stderr = stderr;
            output.stdout = stdout;
             resolve(output);
        });

    
       
    })
}


export function execFileFn(filePath, args = []) {
    let output = {};
    let child = execFile('time',["-p" ,...filePath.split(" "), ...args], {
        timeout: 4000,
        maxBuffer: 1024 * 90, 
        killSignal: "SIGKILL"
    }, (error, stdout, stderr) => {
        if (error && error.message.includes("stdout maxBuffer length exceeded")) {
            output.errorMsg = error.message;
        }
    });

   
    return new Promise((resolve, reject) => {
        output.pid = +child.pid;

        let stdout = '';
        let stderr = '';

        child.stdout.on("data", (data) => {
            stdout += data;
        });

        child.stderr.on("data", (data) => {
            stderr += data;
        });

        child.on("exit", (code, signal) => {
            output.code = code;
            output.signal = signal;
            output.stderr = stderr;
            output.stdout = stdout;
            resolve(output);
        });

        child.on("error", (err) => {
            output.errorMsg = err.message;
        });
    });
}
