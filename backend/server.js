import express from "express";
import dotenv from "dotenv";
import {connect} from "./db/db.js"
import transroutes from './routes/transactions.js'
import authroutes from './routes/auth.js';
import savingroutes from './routes/savings.js';
import billsRoutes from './routes/bills.js';
import userroutes from './routes/user.js';
import grouproutes from './routes/groups.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/bills",billsRoutes)
app.use("/api/transactions",transroutes)
app.use("/api/savings",savingroutes)  
app.use("/api/auth",authroutes)
app.use("/api/user",userroutes)  
app.use("/api/group",grouproutes)

app.use((err,req,res,next)=>{
    const status = err.status||500;
    const message = err.message||"errorrrr";
    // console.log(err);
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

//server listens on port 3001
const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    //connecting to database
    connect()
    console.log("connected");
})