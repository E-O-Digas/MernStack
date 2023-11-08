import { Router } from "express"
const router = Router()

import swaggerUi from "swagger-ui-express"
import swaggerDocs from "../swagger.json" assert {type: "json"}

router.use("/", swaggerUi.serve)
router.get("/", swaggerUi.setup(swaggerDocs))

export default router