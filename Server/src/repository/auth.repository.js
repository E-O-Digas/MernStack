import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const loginRepository = (email) => User.findOne({ email: email })

const generateTokenRepository = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 })

export { loginRepository, generateTokenRepository } 