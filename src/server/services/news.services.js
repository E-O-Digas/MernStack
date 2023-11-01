import News from "../models/News.js"

const createServices = (body) => News.create(body)

const findAllServices = (offset, limit) =>
    News.find({}).sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countNewsServices = () => News.countDocuments()

const topNewsServices = () => News.findOne({}).sort({ _id: "-1" }).populate("user")

const findByIdServices = (id) => News.findById({ _id: id }).populate("user")

const searchByTitleServices = (title) => News.find({
    titulo: {
        $regex:
            `${title || ""}`,
        $options: "i"
    }
}).sort({ _id: -1 }).populate("user")

const findByUserServices = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user")

const updateServices = (id, titulo, texto, imagem) => News.findOneAndUpdate(
    { _id: id },
    { titulo, texto, imagem },
    { rawResult: true })

const deletServices = (id) => News.findOneAndDelete({ _id: id })

const likeNewsServices = (id, userId) => News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } })

const deletLikeNewsServices = (id, userId) => News.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: { userId } } })

const commentNewsServices = (id, userComment, userId) => {
    const commentId = Math.floor(Date.now() * Math.random()).toString(36)

    return News.findOneAndUpdate(
        { _id: id },
        {
            $push: {
                comentarios: {
                    commentId,
                    userId,
                    userComment,
                    createdAt: new Date()
                }
            }
        }
    )
}

const deletNewsCommentServices = (idNews, commentId, userId) => News.findOneAndUpdate(
    { _id: idNews },
    {
        $pull: {
            comentarios: {
                commentId,
                userId
            }
        }
    }
)


export {
    createServices,
    findAllServices,
    countNewsServices,
    topNewsServices,
    findByIdServices,
    searchByTitleServices,
    findByUserServices,
    updateServices,
    deletServices,
    likeNewsServices,
    deletLikeNewsServices,
    commentNewsServices,
    deletNewsCommentServices
}