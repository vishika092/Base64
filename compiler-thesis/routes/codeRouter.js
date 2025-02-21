import express from 'express'
import { languageValidation, validationCheck } from '../middlewares/validations/validations.js';
import fs from 'fs/promises'
import { execFn } from '../helper.js';
import { languageBashMiddlewareOne, languageCMiddlewareOne, languageCPPMiddlewareOne, languageJavaMiddlewareOne, languageJsMiddlewareOne, languagePythonMiddlewareOne, languageRubyMiddlewareOne } from '../middlewares/reqHandlerMiddlewares.js';
import { CompiledLanguageMiddlewareTwo, interprettedLanguageMiddlewareTwo } from '../middlewares/systemCallMiddlewares.js';

const router = express.Router();
// total cpu time calculated
// web vitals


/*
    API : /api/compiler/js
    Method : POST
    body : 
    {
        "language" : "js",
        "source_code" : "console.log('Hello World')"
        "cmd_args" : ""
    }
    validations : 
        --> language cannot be empty and must be one of the following : js, c, cpp, java, python3, ruby, bash
    
    response :
    {
    "pid": ""
    "msg": "",
    "stdout": "",
    "stderr": "",
    "time": {
        "real": "",
        "user": "",
        "sys": ""
    },
    "memory": {
        "heapUsed": "",
        "heapTotal": "",
        "rss": ""
    }
}
*/



// workspace name (dynamic), directory path



router.post("/java", languageValidation, validationCheck, languageJavaMiddlewareOne, CompiledLanguageMiddlewareTwo,async (req, res) => {
    try{

        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
        // return res.send(req.processInfo);
        
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       compileErr : req.compileErr,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})


router.post("/sh", languageValidation, validationCheck, languageBashMiddlewareOne, interprettedLanguageMiddlewareTwo,async (req, res) => {
    try{

        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
       
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})

router.post("/py", languageValidation, validationCheck, languagePythonMiddlewareOne, interprettedLanguageMiddlewareTwo,async (req, res) => {
    try{

        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
       
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
    
})


router.post("/rb", languageValidation, validationCheck, languageRubyMiddlewareOne, interprettedLanguageMiddlewareTwo,async (req, res) => {
    try{

        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
       
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})


router.post("/c", languageValidation, validationCheck, languageCMiddlewareOne, CompiledLanguageMiddlewareTwo,async (req, res) => {
    try{
        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
        // return res.send(req.processInfo);
        
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       compileErr : req.compileErr,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})


router.post("/cpp", languageValidation, validationCheck, languageCPPMiddlewareOne, CompiledLanguageMiddlewareTwo,async (req, res) => {
    try{
        let {pid , stderr, stdout, msg, memory , time, code , signal} = req.processInfo
        // return res.send(req.processInfo);
        
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
       time, memory,
       ip : req.ip,
       compileErr : req.compileErr,
       code , signal
       })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})

router.post("/js", languageValidation, validationCheck, languageJsMiddlewareOne, interprettedLanguageMiddlewareTwo, async (req, res) => {
    try{
     let {pid , stderr, stdout, msg, memory , time, code, signal} = req.processInfo
     console.log(req.processInfo);
     
      
    return res.status(200).json({
        "pid": pid,
        "msg": msg,
        "stdout": stdout,
        "stderr": stderr,
        time,
        memory   ,
        ip : req.ip ,
        code, signal
    })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "error"})
        
    }
})

export default router;