import JwtService from '../services/jwt.service.js'
import CustomError from '../utils/customerror.js'

const jwtService = new JwtService()

const auth = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    throw new CustomError('Token not found', 401)
  }

  try {
    const decoded = jwtService.verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}

export default auth
