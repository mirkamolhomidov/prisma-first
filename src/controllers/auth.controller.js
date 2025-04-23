import AuthService from '../services/auth.service.js'

class AuthController {
  constructor() {
    this.authService = new AuthService()
  }
  async registerContoller(req, res, next) {
    try {
      const user = await this.authService.register(req.body)
      res.status(201).json({ success: 'true', user })
    } catch (error) {
      next(error)
    }
  }
  async loginController(req, res, next) {
    try {
      const { token, user } = await this.authService.login(req.body)
      const { accessToken, refreshToken } = token
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: 'strict',
      })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000,
        sameSite: 'strict',
      })
      res.status(201).json({ success: 'true', user })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
