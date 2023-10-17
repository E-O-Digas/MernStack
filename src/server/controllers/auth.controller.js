import bcrypt from "bcrypt"
import { generateToken, loginService } from "../services/auth.services.js"

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await loginService(email)

        if (!user) {
            return res.status(404).send({ message: "Usuário ou Senha inválida!" })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Usuário ou Senha inválida!" })
        }

        const token= generateToken(user.id)

        res.status(200).send({ message: "Login efetuado!", token: token })

    } catch (err) {
        res.status(500).send(err.message)

    }
}

export { login, }