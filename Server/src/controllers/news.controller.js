import {
    findAllServices,
    createServices,
    topNewsServices,
    findByIdServices,
    searchByTitleServices,
    findByUserServices,
    updateServices,
    deletServices,
    likeNewsServices,
    commentNewsServices,
    deletNewsCommentServices
} from "../services/news.services.js"

const create = async (req, res) => {
    try {
        const { titulo, texto, imagem } = req.body

        const news = await createServices(titulo, texto, imagem)

        if (!news) res.status(400).send({ message: "Algo deu errado"})

        res.status(200).send({ message: "Post feito" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        const currUrl = req.baseUrl

        const { total, news } = await findAllServices(offset, limit)

        const next = offset + limit
        const nextUrl = next < total ? `${currUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit != 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currUrl}?limit=${limit}&offset=${previous}` : null

        res.status(200).send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            result: news.map((newsItem) => ({
                id: newsItem._id,
                titulo: newsItem.titulo,
                texto: newsItem.texto,
                imagem: newsItem.imagem,
                likes: newsItem.likes,
                comentarios: newsItem.comentarios,
                name: newsItem.user.name,
                username: newsItem.user.username,
                avatar: newsItem.user.avatar
            }))
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNews = async (req, res) => {
    try {
        const topNews = await topNewsServices()

        res.send({
            news: {
                id: topNews._id,
                titulo: topNews.titulo,
                texto: topNews.texto,
                imagem: topNews.imagem,
                likes: topNews.likes,
                comentarios: topNews.comentarios,
                name: topNews.user.name,
                username: topNews.user.username,
                avatar: topNews.user.avatar
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        const news = await findByIdServices(id)

        res.status(200).send({
            news: {
                id: news._id,
                titulo: news.titulo,
                texto: news.texto,
                imagem: news.imagem,
                likes: news.likes,
                comentarios: news.comentarios,
                name: news.user.name,
                username: news.user.username,
                avatar: news.user.avatar
            }
        })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query

        if (!title) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        const news = await searchByTitleServices(title)

        if (news.length === 0) {
            return res.status(400).send({ message: "Esse título não existe" })
        }

        res.status(200).send({
            result: news.map((newsItem) => ({
                id: newsItem._id,
                titulo: newsItem.titulo,
                texto: newsItem.texto,
                imagem: newsItem.imagem,
                likes: newsItem.likes,
                comentarios: newsItem.comentarios,
                name: newsItem.user.name,
                username: newsItem.user.username,
                avatar: newsItem.user.avatar
            }))
        })



    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const findByUser = async (req, res) => {
    try {
        const id = req.userId

        if (!id) {
            return res.status(401).send({ message: "Voçe não está logado" })
        }

        const news = await findByUserServices(id)

        res.status(200).send({
            result: news.map((newsItem) => ({
                id: newsItem._id,
                titulo: newsItem.titulo,
                texto: newsItem.texto,
                imagem: newsItem.imagem,
                likes: newsItem.likes,
                comentarios: newsItem.comentarios,
                name: newsItem.user.name,
                username: newsItem.user.username,
                avatar: newsItem.user.avatar
            }))
        })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { titulo, texto, imagem } = req.body

        const { id } = req.params

        if (!id) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        if (!titulo && !texto && !imagem) {
            res.status(400).send({ messagem: "Campo vazio ou inválido!" })
        }

        const news = await findByIdServices(id)

        if (news.user._id != req.userId) {
            return res.status(401).send({ message: "Esse post não é seu!" })
        }

        await updateServices(id, titulo, texto, imagem)

        res.status(200).send({ message: "Post atualizado" })

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const delet = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(404).send({ message: "Este post não existe" })
    }

    const news = await findByIdServices(id)

    if (news.user._id != req.userId) {
        return res.status(401).send({ message: "Esse post não é seu!" })
    }

    await deletServices(id)

    res.status(200).send({ message: "Post Deletado" })

}

const likeNews = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId

        if (!id) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        if (!userId) {
            return res.status(401).send({ message: "Voçe não está logado" })
        }

        await likeNewsServices(id, userId)

        res.status(200).send({ message: "Voce curtiu este post" })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const commentNews = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const { userComment } = req.body

        if (!id) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        if (!userId) {
            return res.status(401).send({ message: "Voçe não está logado" })
        }

        if (!userComment) {
            return res.status(400).send({ message: "Comentário vazio" })
        }

        await commentNewsServices(id, userComment, userId)

        return res.status(200).send({ message: "comentário feito" })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const deletNewsComment = async (req, res) => {
    try {
        const { idNews, commentId } = req.params
        const userId = req.userId

        if (!idNews) {
            return res.status(404).send({ message: "Este post não existe" })
        }

        if (!userId) {
            return res.status(401).send({ message: "Voçe não está logado" })
        }

        const deletedComment = await deletNewsCommentServices(idNews, commentId, userId)

        const commentFinder = deletedComment.comentarios.find((comentarios) => comentarios.commentId === commentId)


        if (!commentFinder) {
            return res.status(400).send({ message: "Esse comentário não existe" })
        }

        if (commentFinder.userId !== userId) {
            return res.status(400).send({ message: "Esse comentário não é seu" })
        }

        return res.status(200).send({ message: "comentário apagado" })

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}



export {
    findAll,
    create,
    topNews,
    findById,
    searchByTitle,
    findByUser,
    update,
    delet,
    likeNews,
    commentNews,
    deletNewsComment
}