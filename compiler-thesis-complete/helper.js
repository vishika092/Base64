import {exec, execFile} from "child_process"



// sigkill , vs sigterm

export function execFn(args) {
    let output = {};
    console.log("Executing command:", args);

    return new Promise((resolve, reject) => {
        let child = exec(` ${args}`, {
            timeout: 4000,
            maxBuffer: 1024 * 90, 
            killSignal: "SIGKILL",
            uid: 1002
        });

        console.log(`Child process started with PID: ${child.pid}`);

        output.pid = child.pid;

        let stdout = "";
        let stderr = "";

        child.stdout.on("data", (data) => {
            stdout += data;
        });

        child.stderr.on("data", (data) => {
            stderr += data;
        });

        child.on("error", (error) => {
            console.error("Process execution error:", error);
            reject({ error: error.message });
        });

        child.on("exit", (code, signal) => {
            output.code = code;
            output.signal = signal;
            output.stderr = stderr;
            output.stdout = stdout;
           

            if (code !== 0) {
                console.log(`Process exited with error (code: ${code}, signal: ${signal})`);
                output.msg = "Runtime error";
            } else {
                console.log("Process executed successfully");
                output.msg = "Successfully executed";
            }

            resolve(output);
        });

        child.on("close", (code) => {
            console.log(`Process closed with code: ${code}`);
        });

        child.on("disconnect", () => {
            console.log("Process disconnected");
        });
    });
}


export function execFileFn(filePath, args = []) {
    let output = {};
    let child = execFile('time',[ "-p" , ...filePath.split(" "), ...args], {
        timeout: 4000,
        maxBuffer: 1024 * 90, 
        killSignal: "SIGKILL",
        uid: 1002
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
