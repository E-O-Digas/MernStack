const mongoose= require("mongoose")
const userServices= require("../services/user.services")

const validId= async(req ,res ,next)=>{
    const id= req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message:"Id não existe!" })
    }

    next()
}

const validUser= async(req, res, next)=>{
    const id= req.params.id

    const user= await userServices.findByIdServices(id)
    
    if(!user){
        return res.status(400).send({ message: "Usuário não existe!" })
    }

    req.id= id
    req.user= user

    next()
}

module.exports= { validId, validUser }