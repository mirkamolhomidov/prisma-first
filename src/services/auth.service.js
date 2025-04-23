import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import CustomError from '../utils/customerror.js'
import JwtService from './jwt.service.js'

class AuthService {
  constructor() {
    this.prisma = new PrismaClient()
    this.jwtService = new JwtService()
  }
  async register(data) {
    try {
      const hashedPass = await bcrypt.hash(data.password, 12)
      data.password = hashedPass
      const user = await this.prisma.user.create({ data })
      return user
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
  async login({ email, password }) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } })
      const checkPass = await bcrypt.compare(password, user.password)
      if (!user || !checkPass) {
        throw new CustomError('Email or password invalid', 400)
      }
      const token = this.jwtService.generateToken(user.id)
      return { token, user }
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
}

export default AuthService
