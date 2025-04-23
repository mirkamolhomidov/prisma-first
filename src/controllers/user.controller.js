import UserService from '../services/user.service.js'

class UserController {
  constructor() {
    this.service = new UserService()
  }
  async getUsersController(req, res, next) {
    try {
      const users = await this.service.getUsers()
      res.status(200).json({ success: 'true', users })
    } catch (error) {
      next(error)
    }
  }
  async createUserController(req, res, next) {
    try {
      const user = await this.service.createUser(req.body)
      res.status(201).json({ success: 'true', user })
    } catch (error) {
      next(error)
    }
  }
  async updateUserController(req, res, next) {
    try {
      console.log(req.params.id)

      const user = await this.service.updateUser(
        Number(req.params.id),
        req.body
      )
      res.status(201).json({ success: 'true', user })
    } catch (error) {
      next(error)
    }
  }
  async deleteUserController(req, res, next) {
    try {
      const data = await this.service.deleteUser(Number(req.params.id))
      res.status(200).json({ success: 'true', data })
    } catch (error) {
      next(error)
    }
  }
}
export default UserController
