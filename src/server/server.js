import express from "express"
import conn from "./database/db.js"
import Router from "./routes/user.route.js"
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000
conn()

app.use(express.json())
app.use("/user", Router)

app.listen(port, () => console.log(`Server running on port ${port}`))