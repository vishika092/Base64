

import "./dbConnect.js"    
import UserModel from "../models/User.js";


async function createAdmin(){
    let email = "vishikajain0@gmail.com";
    let user = await UserModel.findOne({email})
    if(!user){
        console.log("User Not Found !");
        return;
        
    }
    await UserModel.updateOne({email}, {$set : {role : "admin"}})
    console.log("Role set to Admin !");
    return;
    
    
}

createAdmin()