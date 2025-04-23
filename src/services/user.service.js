import { PrismaClient } from '@prisma/client'
import CustomError from '../utils/customerror.js'

class UserService {
  constructor() {
    this.prisma = new PrismaClient()
  }
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany()
      return users
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
  async createUser(data) {
    try {
      const user = await this.prisma.user.create({ data })
      return user
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
  async updateUser(id, data) {
    try {
      const user = await this.prisma.user.update({ where: { id }, data })
      return user
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
  async deleteUser(id) {
    try {
      const data = await this.prisma.user.delete({ where: { id } })
      return data
    } catch (error) {
      throw new CustomError(error.message, error.status)
    }
  }
}
export default UserService
