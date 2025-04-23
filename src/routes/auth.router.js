import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const authRouter = Router()
const controller = new AuthController()

authRouter.post('/auth/register', controller.registerContoller.bind(controller))
authRouter.post('/auth/login', controller.loginController.bind(controller))

export default authRouter
