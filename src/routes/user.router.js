import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import auth from '../middlewares/auth.middleware.js'

const userRouter = Router()
const controller = new UserController()

userRouter.get('/user/', auth, controller.getUsersController.bind(controller))
userRouter.post(
  '/user/',
  auth,
  controller.createUserController.bind(controller)
)
userRouter.put(
  '/user/:id',
  auth,
  controller.updateUserController.bind(controller)
)
userRouter.delete(
  '/user/:id',
  auth,
  controller.deleteUserController.bind(controller)
)

export default userRouter
