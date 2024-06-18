import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    files:{
        type:[Object],
    },
    groups:{
        type:[String],
    },
    image:{
        type: String,
        default:null
    },
    token:{
        type:String
    }
})

export default mongoose.model("User",userSchema)