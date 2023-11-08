import mongoose from "mongoose"

const NewsSchema= mongoose.Schema({
    titulo:{
        type:String,
        require: true
    },
    imagem:{
        type:String,
        require:true
    },
    texto:{
        type:String,
        require:true
    },
    data:{
        type:Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    likes:{
        type: Array,
        require: true
    },
    comentarios:{
        type: Array,
        require: true
    }
})

const News= mongoose.model("News", NewsSchema)

export default News