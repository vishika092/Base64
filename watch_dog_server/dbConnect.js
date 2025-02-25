import mongoose from "mongoose"; 

export async function connectMonogo(){
    try{
        await mongoose.connect(`mongodb+srv://vishika744:password123password@bootcamp.jdbm9y3.mongodb.net/WatchDog`);
        console.log("Connected to MongoDB");

    }
    catch(err){
        console.log("Error Connecting to MongoDb");
        console.log(err);
    }
}