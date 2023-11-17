import { updUserInfoRepository, createRepository, findAllRepository } from "../repository/user.repository.js"

const createService = async (body) => {

    const { name, username, email, password, background, avatar } = body

    if (!name || !username || !email || !password || !background || !avatar) throw new Error("Campo vazio ou inválido")


    const user = await createRepository(body)

    if (!user) throw new Error("Erro na criação do usuário!")

    return ({
        message: "Usuário criado!",
        id: user._id,
        user
    })

}

const findAllService = async () => {

    const users = await findAllRepository()

    if (users.length === 0) throw new Error("Não há usuários cadastrados")

    return users


}

const findByIdService = async (id, user) => {
    return (id, user)
}

const updUserInfoService = async (id, user) => {

    const userId = id

    const { name, username, email, password, background, avatar } = user

    if (!name || !username || !email || !password || !background || !avatar) throw new Error("Campos vazios ou inválidos")

    await updUserInfoRepository(
        userId,
        user
    )

    return ({ message: "Usuário atualizado com sucesso!" })

}

export { createService, findAllService, findByIdService, updUserInfoService }