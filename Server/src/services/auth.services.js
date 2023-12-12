import bcrypt from "bcrypt"
import { generateTokenRepository, loginRepository } from "../repository/auth.repository.js"

const loginServices = async ({ email, senha }) => {
    const user = await loginRepository(email)

    if (!user) throw new Error("Usuário não existe")

    const passwordIsValid = bcrypt.compareSync(senha, user.senha)

    if (!passwordIsValid) throw new Error("Usuário ou Senha inválida!")

    const token = generateTokenRepository(user.id)

    return token
}

export { loginServices }