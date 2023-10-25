import { findAllServices, createService } from "../services/news.services.js"

const create = async (req, res) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401)
        }

        const parts = authorization.split(" ")
        
        if(parts.length!==2){
            return res.status(401)
        }
        
        const [schema, token] = parts


        const { titulo, texto, imagem } = req.body

        if (!titulo || !texto || !imagem) {
            return res.status(400).send({ message: "Campos vazios ou inválidos!" })
        }

        await createService({
            titulo,
            texto,
            imagem,
            user: { _id: "652dccdf996ac43ba6803e61" }
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