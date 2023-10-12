import mongoose from "mongoose"

const conn= ()=>{
    console.log("Waiting for connection...")
    
    mongoose.connect( process.env.DB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(()=>console.log("Database connected..."))
    .catch((err)=>console.log(err))
}

export default conn