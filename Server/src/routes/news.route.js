import { Router } from "express"
const newsRouter = Router()

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


newsRouter.post("/", authMiddleware, create)

newsRouter.get("/", findAll)
newsRouter.get("/top", topNews)
newsRouter.get("/search", searchByTitle)
newsRouter.get("/byUser", authMiddleware, findByUser)
newsRouter.get("/:id", authMiddleware, findById)

newsRouter.patch("/:id", authMiddleware, update)
newsRouter.patch("/likes/:id", authMiddleware, likeNews)
newsRouter.patch("/comment/:id", authMiddleware, commentNews)
newsRouter.patch("/comment/:idNews/:commentId", authMiddleware, deletNewsComment)

newsRouter.delete("/:id", authMiddleware, delet)

export default newsRouter
