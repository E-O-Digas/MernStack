import { Router } from "express"
const router = Router()

import { 
    create, 
    findAll, 
    topNews, 
    findById, 
    searchByTitle, 
    findByUser, 
    update,
    delet,
    likeNews,
    commentNews,
    deletNewsComment
} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"


router.post("/", authMiddleware, create)

router.get("/", findAll)
router.get("/top", topNews)
router.get("/search", searchByTitle)
router.get("/byUser", authMiddleware, findByUser)
router.get("/:id", authMiddleware, findById)

router.patch("/:id", authMiddleware, update)
router.patch("/likes/:id", authMiddleware, likeNews)
router.patch("/comment/:id", authMiddleware, commentNews)
router.patch("/comment/:idNews/:commentId", authMiddleware, deletNewsComment)

router.delete("/:id", authMiddleware, delet)

export default router
