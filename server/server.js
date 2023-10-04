const express= require('express')
const app= express()

app.get('/', (req,res) => {
    const User= {
        nome:"Diogo de Lorenzi Pinheiro",
        _id:"12893471029384",
    }
    res.json(User)
})

app.get('/home', (req,res)=>{
    const home= "home"
    res.json(home)
})

app.listen(3000)