import mongoose from "mongoose"

const conn= ()=>{
    console.log("Waiting for connection...")
    
    mongoose.connect("mongodb+srv://admin:1234@cluster0.njvl2nk.mongodb.net/?retryWrites=true&w=majority", { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(()=>console.log("Database connected..."))
    .catch((err)=>console.log(err))
}

export default conn