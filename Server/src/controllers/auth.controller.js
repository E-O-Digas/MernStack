import { loginService } from "../services/auth.services.js"

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const token = await loginService(email, senha)
        return res.send(token)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export { login }