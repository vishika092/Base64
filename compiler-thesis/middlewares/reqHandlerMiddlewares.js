import fs from 'fs/promises'


export async function languageJsMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath);
        await fs.writeFile(`${dirPath}/code.js`, code);
        let cmdArgs = `time -p node ${dirPath}/code.js`;
        cmdArgs = args ? cmdArgs + " " + args : cmdArgs;
        req.executionArgs = cmdArgs;
        req.processInfo = processInfo;
        // console.log(req);
        next();
    } catch (error) {
        console.log("middleware1-js :", error);
        next()
    }
}


export async function languageBashMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath, {recursive : true});
        await fs.writeFile(`${dirPath}/code.sh`, code);
        await fs.chmod(`${dirPath}/code.sh`, 0o755);
        let cmdArgs = `time -p ./${dirPath}/code.sh ${args || ""}`;
        req.executionArgs = cmdArgs;
        req.processInfo = processInfo;
        next();
    } catch (error) {
        console.log("middleware1-bash :", error);
        next()
    }
}


export async function languagePythonMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath, {recursive : true});
        await fs.writeFile(`${dirPath}/code.py`, code);
        let cmdArgs = `time -p python3 ${dirPath}/code.py ${args || ""}`;
        req.executionArgs = cmdArgs;
        req.processInfo = processInfo;
        next();
    } catch (error) {
        console.log("middleware1-py :", error);
        next()
    }
}

export async function languageRubyMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath, {recursive : true});
        await fs.writeFile(`${dirPath}/code.rb`, code);
        let cmdArgs = `time -p ruby ${dirPath}/code.rb ${args || ""}`;
        req.executionArgs = cmdArgs;
        req.processInfo = processInfo;
        next();
    } catch (error) {
        console.log("middleware1-py :", error);
        next()
    }
}


export async function languageCMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath);
        await fs.writeFile(`${dirPath}/code.c`, code);
        let compileCmd = `gcc ${dirPath}/code.c -o ${dirPath}/a.out`;
        let runCmd = `${dirPath}/a.out`
        req.compileCmd = compileCmd;
        req.runCmd = runCmd;
        req.processInfo = processInfo;
        // console.log(req);
        next();
    } catch (error) {
        console.log("middleware1-c :", error);
        next()
    }
}


export async function languageCPPMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code, args } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath, {recursive : true});
        await fs.writeFile(`${dirPath}/code.cpp`, code);
        // g++ -o my_program main.cpp
        let compileCmd = `g++ -o ${dirPath}/my_program  ${dirPath}/code.cpp`;
        let runCmd = `./${dirPath}/my_program`
        req.compileCmd = compileCmd;
        req.runCmd = runCmd;
        req.processInfo = processInfo;
        // console.log(req);
        next();
    } catch (error) {
        console.log("middleware1-cpp :", error);
        next()
    }
}



export async function languageJavaMiddlewareOne(req, res, next) {
    const workspaceName = Math.random().toString(36).slice(2, 9);
    const { language, code } = req.body;
    const dirPath = `./workspaces/${language}/${workspaceName}`;
    req.dirPath = dirPath;
    let processInfo = {};
    processInfo.language = language;
   
    try {
        await fs.mkdir(dirPath , { recursive: true });
        const match = code.match(/public\s+class\s+(\w+)/);
        console.log(match);
        let fileName = match[1]  || "code";
        
        await fs.writeFile(`${dirPath}/${fileName}.java`, code);
        let compileCmd = `javac ${dirPath}/${fileName}.java`;
        let runCmd = `java -cp ${dirPath} ${fileName}`;
        req.compileCmd = compileCmd;
        req.runCmd = runCmd;
        req.processInfo = processInfo;
        // console.log(req);
        next();
    } catch (error) {
        console.log("middleware1-java :", error);
        next()
    }
}