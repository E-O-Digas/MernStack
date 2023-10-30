import News from "../models/News.js"

const createService = (body) => News.create(body)

const findAllServices = (offset, limit) =>
    News.find({}).sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countNewsService = () => News.countDocuments()

const topNewsService = () => News.findOne({}).sort({ _id: "-1" }).populate("user")

const findByIdService = (id) => News.findById({ _id: id }).populate("user")

const searchByTitleService = (title) => News.find({
    titulo: {
        $regex:
            `${title || ""}`,
        $options: "i"
    }
}).sort({ _id: -1 }).populate("user")

const findByUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user")

export {
    createService,
    findAllServices,
    countNewsService,
    topNewsService,
    findByIdService,
    searchByTitleService,
    findByUserService
}