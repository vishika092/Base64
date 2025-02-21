import { execFileFn, execFn } from "../helper.js";
import {exec, execFile} from "child_process"
import fs from 'fs/promises'

function killPID(pid){
    return new Promise((resolve, reject)=>{
        exec(`kill ${pid}`, ((error, stdout, stderr)=>{
            //null -> success
            if(error){
                error.stdout = stdout; 
                error.stderr = stderr; //used in case of executable failure -> command failed , '/bin/sh: 1: kill: No such process\n\n'
            }
            resolve({error}); //contains status/signal/killed (command failed message)
        }))
    })
}


// sceniours 
// all code executing properly , no errors
// compilation errors, syntax errors
// infinite loops , recursions   (stack overflow issues --> memory blocks)
//  runtime issues -->  time out , max buffer

// ------------------------------------------

// time complexity  --> acutal time taken by cpu is different from file system


// ------------------------------------------
// stack  -->  hold temporily , once the job is done , memory is released , all functions calls
// heap  --> new Object()    -->  asking memory to be allocated to this object dynamically   --> dynamic memory management
// rss   --> resident set size memory -->  code , stack 
//  heapUsed  --> amount of code tht is actively is in buffer  , variables , objects , arrays , code tht is actively used by ur programming language object
// why are we not taking into account the stack , when calculating heap   --> bcz stacks are fixed ??
// garbage collection   --> how much memory allocated to heap
// htop  --> virt = rss , 
// pm2 also has memory percent , to capture heap used


// how will u differentiate compiled lang (gives a binary executable , which we have to execute) and interpreted
// first we do gcc and generate binary  , nd for tht binary  , u gotta do all tht drama  (exec or execFile  ???)
// also show the client ip in app
// compilation will happen using exec , nd binary will run using execFile , where to put the time -p ??   --> know the pros and cons of both the cases

export async function interprettedLanguageMiddlewareTwo(req, res, next) {
    try {
        let args = req.executionArgs, msg;
        //exec allows process termination
        let output = await execFn(args);
        if (output.code) msg = "Runtime error"; //covers all errors
        else msg = "Successfully executed";
         if(output.code == null){ //time metrics not captured
            msg = "process forcefully terminated, program must adhere to a runtime of 4000ms and 90KB";
         
        }else{
            let time = {
                "real": `${output.stderr.match(/real (\d+\.\d+)/)[1]}s`,
                "user": `${output.stderr.match(/user (\d+\.\d+)/)[1]}s`,
                "sys": `${output.stderr.match(/sys (\d+\.\d+)/)[1]}s`
            }
            output.time = time;
            const index = output.stderr.indexOf("real");
            let stderr = index!==1 ? output.stderr.substring(0, index) : output.stderr;
            output.stderr = stderr;
           
        }
        output.msg = msg;
        output.memory = {
            "heapUsed": `${Math.floor((process.memoryUsage().heapUsed)/1024)}KB`,
            "heapTotal": `${Math.floor((process.memoryUsage().heapTotal)/1024)}KB`,
            "rss": `${Math.floor((process.memoryUsage().rss)/1024)}KB`
        };
        req.processInfo = {...output, ...req.processInfo};
        await fs.rm(req.dirPath, { recursive: true, force: true });
        next();
    } catch (error) {
        console.log("middleware2-interpretted :", error);
        await fs.rm(req.dirPath, { recursive: true, force: true });
        next()
    }
}


export async function CompiledLanguageMiddlewareTwo(req, res, next) {
    try {
        let msg;

        await new Promise((resolve, reject) => {
            exec(`${req.compileCmd}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    
                   req.compileErr =  `Compilation Error:\n${error}`
                    return next();
                }
                console.log("Compilation Successful!");
                resolve();
            });
        });

        console.log("Executing...");
        
        let output = await execFileFn(req.runCmd, req.body.args.split(" "))
       
        if (output.code) msg = "Runtime error"; 
        else msg = "Successfully executed";
         if(output.code == null){ 
            msg = "process forcefully terminated, program must adhere to a runtime of 4000ms and 90KB";
           
        }else{
            let time = {
                "real": `${output.stderr.match(/real (\d+\.\d+)/)[1]}s`,
                "user": `${output.stderr.match(/user (\d+\.\d+)/)[1]}s`,
                "sys": `${output.stderr.match(/sys (\d+\.\d+)/)[1]}s`
            }
            output.time = time;
            const index = output.stderr.indexOf("real");
            let stderr = index!==1 ? output.stderr.substring(0, index) : output.stderr;
            output.stderr = stderr;
        }
        output.msg = msg;
        output.memory = {
            "heapUsed": `${Math.floor((process.memoryUsage().heapUsed)/1024)}KB`,
            "heapTotal": `${Math.floor((process.memoryUsage().heapTotal)/1024)}KB`,
            "rss": `${Math.floor((process.memoryUsage().rss)/1024)}KB`
        };
        req.processInfo = {...output, ...req.processInfo};
        await fs.rm(req.dirPath, { recursive: true, force: true });
        next();
    } catch (error) {
        console.log("middleware2-compiled :", error);
        await fs.rm(req.dirPath, { recursive: true, force: true });
        next()
    }
}