const express= require('express')
const app= express()

app.get('/', (req,res) => {
    res.send("Root")
})

app.get('/home', (req,res)=>{
    res.send("Home")
})

app.listen(3000)