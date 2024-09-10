import mongoose from "mongoose"; 

// connect to a MongoDB database using Mongoose
async function connectMonogo(){
    try{
        let db = process.env.DB_NAME;
        let mongoURI = process.env.MONGO_URI;
        await mongoose.connect(`${mongoURI}${db}`);
        console.log("Connected to MongoDB");

    }
    catch(err){
        console.log("Error Connecting to MongoDb");
        console.log(err);
    }
}


connectMonogo()