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

const deletService = (id) => News.findOneAndDelete({ _id: id })

export {
    createServices,
    findAllServices,
    countNewsServices,
    topNewsServices,
    findByIdServices,
    searchByTitleServices,
    findByUserServices,
    updateServices,
    deletService
}