const app = require("./app");
const connectDatabase = require("./config/database")
// const cors = require("cors");
// const express = require("express");

// const exp = express(); 
// exp.use(cors(
//     {
//         origin: ["https://algo-log-snpg.vercel.app"],
//         method: ["POST", "GET"],
//         credentials: true
//     }
// ))

//Handling uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    server.close(()=>{
        process.exit(1);
    });
})

//config
if(process.env.NODE_ENVIRONMENT !== "PRODUCTION"){
    require("dotenv").config({path:"config/config.env"});
}

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log (`Server is working on ${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
})