import os from "os"

const cpus = os.cpus()
const numCores = cpus.length
const osType = os.type() == "Darwin" ? "Apple Mac" : os.type()

//  uname -a

const networkInterfaces = os.networkInterfaces()
const freeMem = os.freemem();
const totalMem = os.totalmem();   //  ram memory 
const userMem = totalMem - freeMem; 

console.log("System has Cpus : ", cpus);
console.log("System has Cpu Cores : ", numCores);
console.log(osType);
console.log(networkInterfaces);

console.log();

// it comes in bytes  --> kilo bytes --> mega  --> giga
console.log("Total Memory : " , totalMem / (1024 * 1024 * 1024));
console.log("Free Memory : " , freeMem / (1024 * 1024 * 1024));
console.log("User Memory : " , userMem / (1024 * 1024 * 1024));
