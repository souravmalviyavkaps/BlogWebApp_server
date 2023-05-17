import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import env from '../config/environment.js'

const auth = async (req, res, next) => {
  try {
    console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, env.jwt_secret)
    const user = await User.findById(decoded._id)
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).json({ success: false, error: 'Please authenticate!' })
  }
}

export default auth;