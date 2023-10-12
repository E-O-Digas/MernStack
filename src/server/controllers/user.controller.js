import userServices from "../services/user.services.js"

const create = async (req, res) => {
    try {
        const { name, username, email, password, image, background, avatar } = req.body

        if (!name || !username || !email || !password || !image || !background || !avatar) {
            const err = {
                message: "Campo vazio ou inválido"
            }

            res.status(400).send({ err })
        }

        const user = await userServices.createServices(req.body)

        if (!user) {
            return res.status(400).send({ message: "Erro na criação do usuário!" })
        }

        res.status(200).send({
            message: "Usuário criado!",
            user: {
                id: user._id,
                username,
                name,
                email,
                avatar,
                image,
                background
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userServices.findAllServices()

        if (users.length === 0) {
            return res.status(400).send({ message: "Não há usuários cadastrados" })
        }
        res.send(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const findById = async (req, res) => {
    try {
        const user = req.user
        res.send(user)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const updUserInfo = async (req, res) => {
    try {
        const { id, user } = req

        const { name, username, email, password, image, background, avatar } = req.body

        if (!name && !username && !email && !password && !image && !background && !avatar) {
            res.status(400).send({ message: "Campos vazios ou inválidos" })
        }

        await userServices.updUserInfoServices(
            id,
            name,
            username,
            email,
            password,
            image,
            background,
            avatar
        )

        res.status(200).send({ message: "Usuário atualizado com sucesso!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { create, findAll, findById, updUserInfo }