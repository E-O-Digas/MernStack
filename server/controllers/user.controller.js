const mongoose= require("mongoose")
const userServices= require("../services/user.services")

const create= async(req,res)=>{
    const { name, username, email, password, image, background, avatar } = req.body
    
    if(!name || !username || !email || !password || !image || !background || !avatar ){
        const err= {
            message: "Campo vazio ou inválido"
        }

        res.status(400).send({err})
    }
    
    const user= await userServices.createServices(req.body)

    if(!user){
        return res.status(400).send({message: "Erro na criação do usuário!"})
    }
    
    res.status(200).send({
        message: "Usuário criado!",
        user:{
            id: user._id,
            username,
            name, 
            email, 
            avatar, 
            image, 
            background
        }
    })
}

const findAll= async(req,res)=>{
    const users= await userServices.findAllServices()

    if(users.length === 0){
        return res.status(400).send({message:"Não há usuários cadastrados"})
    }
    res.send(users)

}

const findById= async(req,res)=>{
    const id= req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:"Id não existe!"})
    }

    const user= await userServices.findByIdServices(id)

    if(!user){
        return res.status(400).send({message:"Usuário não existe!"})
    }
    
    res.send(user)
}

module.exports= { create, findAll, findById }