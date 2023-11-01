import {
    findAllServices,
    createServices,
    countNewsServices,
    topNewsServices,
    findByIdServices,
    searchByTitleServices,
    findByUserServices,
    updateServices,
    deletService
} from "../services/news.services.js"

const create = async (req, res) => {
    try {
        const { titulo, texto, imagem } = req.body

        if (!titulo || !texto || !imagem) {
            return res.status(400).send({ message: "Campos vazios ou inválidos!" })
        }

        await createServices({
            titulo,
            texto,
            imagem,
            user: req.userId
        })

        res.status(201).send({ message: "Post feito" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        limit = Number(limit)

        offset = Number(offset)

        if (!limit) {
            limit = 5
        }

        if (!offset) {
            offset = 0
        }


        const news = await findAllServices(offset, limit)
        const total = await countNewsServices()
        const currUrl = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total ? `${currUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit != 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currUrl}?limit=${limit}&offset=${previous}` : null

        if (news.length === 0) {
            return res.status(400).send({ message: "Não há posts no banco de dados!" })
        }

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

        if (!topNews) {
            return res.status(400).send({ message: "Não há notícias..." })
        }

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
            return res.status(404).send({ message: "Este post não existe" })
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

    const news = await findByIdServices(id)

    if (news.user._id != req.userId) {
        return res.status(401).send({ message: "Esse post não é seu!" })
    }

    await deletService(id)

    res.status(200).send({ message: "Post deletado" })

}

export {
    findAll,
    create,
    topNews,
    findById,
    searchByTitle,
    findByUser,
    update,
    delet
}