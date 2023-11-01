import express from "express"
import conn from "./database/db.js"

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import newsRouter from "./routes/news.route.js"
import swaggerRouter from "./routes/swagger.route.js"

import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT || 3000
conn()

app.use(express.json())
app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/news", newsRouter)
app.use("/doc", swaggerRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))