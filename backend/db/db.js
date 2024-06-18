import mongoose from "mongoose"

// console.log(process.env.MONGO)
export const connect =()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{

        throw err;
    })
}
