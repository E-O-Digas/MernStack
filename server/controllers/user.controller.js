const userServices= require("../services/user.services")

const create= async(req,res)=>{
    const { name, username, email, password, image, background, avatar } = req.body
    
    if(!name || !username || !email || !password || !image || !background || !avatar ){
        const err= {
            message: "Campo vazio ou inválido"
        }

        res.status(400).send({err})
    }
    
    const user= await userServices.create(req.body)

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

module.exports= { create }