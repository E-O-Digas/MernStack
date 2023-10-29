import News from "../models/News.js"

const createService = (body) => News.create(body)

const findAllServices = (offset, limit) => 
    News.find({}).sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countNewsService = () => News.countDocuments()

export { createService, findAllServices, countNewsService }