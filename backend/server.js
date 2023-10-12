const express= require('express')
const userRoute= require("./routes/user.route")
const conn= require("./database/db")

const app= express()

const port= 3000
conn()

app.use(express.json())
app.use("/user", userRoute)

app.listen(port,()=>console.log(`Server running on port ${port}`))