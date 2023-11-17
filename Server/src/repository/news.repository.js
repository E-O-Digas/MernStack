import News from "../models/News.js"

const createRepository = (body) => News.create(body)

const findAllRepository = (offset, limit) =>
    News.find({}).sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countNewsRepository = () => News.countDocuments()

const topNewsRepository = () => News.findOne({}).sort({ _id: "-1" }).populate("user")

const findByIdRepository = (id) => News.findById({ _id: id }).populate("user")

const searchByTitleRepository = (title) => News.find({
    titulo: {
        $regex:
            `${title || ""}`,
        $options: "i"
    }
}).sort({ _id: -1 }).populate("user")

const findByUserRepository = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user")

const updateRepository = (id, titulo, texto, imagem) => News.findOneAndUpdate(
    { _id: id },
    { titulo, texto, imagem },
    { includeResultMetadata: false })

const deletRepository = (id) => News.findOneAndDelete({ _id: id })

const likeNewsRepository = (id, userId) => News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } })

const deletLikeNewsRepository = (id, userId) => News.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: { userId } } })

const commentNewsRepository = (id, userComment, userId) => {
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

const deletNewsCommentRepository = (idNews, commentId, userId) => News.findOneAndUpdate(
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
    createRepository,
    findAllRepository,
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
}