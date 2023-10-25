import { findAllServices, createService } from "../services/news.services.js"

const create = async (req, res) => {
    try {
        const { titulo, texto, imagem } = req.body

        if (!titulo || !texto || !imagem) {
            return res.status(400).send({ message: "Campos vazios ou inválidos!" })
        }

        await createService({
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
    const news = await findAllServices()
    if (news.length === 0) {
        return res.status(400).send({ message: "Não há posts no banco de dados!" })
    }
    res.status(200).send({ news })
}

export { findAll, create }