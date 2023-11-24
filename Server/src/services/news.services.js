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

const topNewsServices = async (id) => {
    const topNews = await topNewsRepository(id)

    return (topNews)
}

const findByIdServices = async (id) => {
    const news = await findByIdRepository(id)

    return (news)
}

const searchByTitleServices = async (title) => {
    const news = await searchByTitleRepository(title)

    return (news)
}

const findByUserServices = async (id) => {
    const news = await findByUserRepository(id)

    return (news)
}

const updateServices = async (id, titulo, texto, imagem) => {
    const news = await findByIdRepository(id)

    await updateRepository(id, titulo, texto, imagem)

    return (news)
}

const deletServices = async (idNews) => {
    const id = await findByIdRepository(idNews)

    const newDeleted = await deletRepository(id)

    return (newDeleted)
}

const likeNewsServices = async (id, userId) => {
    const likedNews = await likeNewsRepository(id, userId)

    if (!likedNews) {
        await deletLikeNewsRepository(id, userId)
        throw new Error("Voce descurtiu este post")
    }

    return (likedNews)

}

const commentNewsServices = async (id, userComment, userId) => {
    await commentNewsRepository(id, userComment, userId)

    return
}

const deletNewsCommentServices = async (idNews, commentId, userId) => {
    const deletedComment = await deletNewsCommentRepository(idNews, commentId, userId)

    const commentFinder = deletedComment.comentarios.find((comentarios) => comentarios[0].commentId === commentId)
    
    return (deletedComment, commentFinder)
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