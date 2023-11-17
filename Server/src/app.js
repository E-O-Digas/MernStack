import express from "express"
import conn from "./database/db.js"
import cors from "cors"
import router from "./routes/router.js"

const app = express()

const corsConfig = { Credential: true }
conn()

app.use(express.json())
app.use(cors(corsConfig))
app.use(router)

export default app