import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";


const app=express();
const server=createServer(app);
const io=connectToSocket(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        allowHeaders:["*"],
        credentials:true
    }
});

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users",userRoutes);

app.get("/home",(req,res)=>{
    return res.json({"hellow": "world"})
})

const start=async()=>{
    const connectionDb= await mongoose.connect("mongodb+srv://oppof9prodbd786_db_user:Affan%40123@cluster0.na8wpjc.mongodb.net/video_conferencing_platform?retryWrites=true&w=majority");
    console.log(`MONGO Connected DB Host:${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log(("Listening on port " + app.get("port")));
        
    });
}

start();