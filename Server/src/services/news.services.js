import {
    findAllRepository,
    createRepository,
    countNewsRepository,
    topNewsRepository,
    findByIdRepository,
    searchByTitleRepository,
    findByUserRepository,
    updateRepository,
    deletRepository,
    likeNewsRepository,
    deletLikeNewsRepository,
    commentNewsRepository,
    deletNewsCommentRepository
} from "../repository/news.repository.js"


const createServices = async (titulo, texto, imagem) => {
    const newsBody = { titulo, texto, imagem }

    if (!titulo || !texto || !imagem) throw new Error("Campos vazios ou inválidos!")

    await createRepository({
        titulo,
        texto,
        imagem,
        user: req.userId
    })

    return (newsBody)
}

const findAllServices = async (offset, limit) => {
    limit = Number(limit)

    offset = Number(offset)

    if (!limit) limit = 5

    if (!offset) offset = 0

    const news = await findAllRepository(offset, limit)

    const total = await countNewsRepository()

    return ({ total, news })
}

const topNewsServices = async () => {
    const topNews = await topNewsRepository()

    return (topNews)
}

const findByIdServices = async (req, res) => {

    const { id } = req.params

    if (!id) {
        throw new Error("Este post não existe")
    }

    const news = await findByIdRepository(id)

    return ({
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
}

const searchByTitleServices = async (req, res) => {

    const { title } = req.query

    if (!title) throw new Error("Este post não existe")

    const news = await searchByTitleRepository(title)

    if (news.length === 0) throw new Error("Esse título não existe")


    return ({
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
}

const findByUserServices = async (req, res) => {

    const id = req.userId

    if (!id) throw new Error("Voçe não está logado")

    const news = await findByUserRepository(id)

    return ({
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
}

const updateServices = async (req, res) => {
    const { titulo, texto, imagem } = req.body

    const { id } = req.params

    if (!id) throw new Error("Este post não existe")

    if (!titulo && !texto && !imagem) throw new Error("Campo vazio ou inválido!")

    const news = await findByIdRepository(id)

    if (news.user._id != req.userId) throw new Error("Esse post não é seu!")

    await updateRepository(id, titulo, texto, imagem)

    return ({ message: "Post atualizado" })
}

const deletServices = async (req, res) => {
    const { id } = req.params

    if (!id) throw new Error("Este post não existe")


    const news = await findByIdRepository(id)

    if (news.user._id != req.userId) throw new Error("Esse post não é seu!")

    await deletRepository(id)

    return ("Post deletado")

}

const likeNewsServices = async (req, res) => {

    const { id } = req.params
    const userId = req.userId

    if (!id) throw new Error({ message: "Este post não existe" })

    if (!userId) throw new Error({ message: "Voçe não está logado" })

    const likedNews = await likeNewsRepository(id, userId)

    if (!likedNews) {
        await deletLikeNewsRepository(id, userId)
        throw new Error({ message: "Voce descurtiu este post" })
    }

    return ({ message: "Voce curtiu este post" })

}

const commentNewsServices = async (req, res) => {

    const { id } = req.params
    const userId = req.userId
    const { userComment } = req.body

    if (!id) throw new Error({ message: "Este post não existe" })

    if (!userId) throw new Error({ message: "Voçe não está logado" })

    if (!userComment) throw new Error({ message: "Comentário vazio" })

    await commentNewsRepository(id, userComment, userId)

    return ({ message: "comentário feito" })
}

const deletNewsCommentServices = async (req, res) => {
    const { idNews, commentId } = req.params
    const userId = req.userId

    if (!idNews) throw new Error("Este post não existe")

    if (!userId) throw new Error("Voçe não está logado")

    const deletedComment = await deletNewsCommentRepository(idNews, commentId, userId)

    const commentFinder = deletedComment.comentarios.find((comentarios) => comentarios.commentId === commentId)

    if (!commentFinder) throw new Error("Esse comentário não existe")

    if (commentFinder.userId !== userId) {
        throw new Error("Esse comentário não é seu")
    }

    return ("comentário apagado")
}


export {
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
}