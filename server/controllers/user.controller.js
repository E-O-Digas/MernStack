const userInfo= (req,res)=>{
    const User= {
        nome:"Diogo de Lorenzi Pinheiro",
        _id:"12893471029384",
    }
    res.json(User)
}

module.exports= { userInfo }