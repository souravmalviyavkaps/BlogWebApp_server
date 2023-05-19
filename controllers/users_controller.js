import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '../config/environment.js'
import sharp from 'sharp'

//register or signup data should come here
export const create = async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.password != req.body.confirm_password) {
      return res.status(200).json({
        message: 'Password and confirm password does not match',
        success: false,
      })
    }
    const user = await User.create(req.body)

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    console.log('Error while creating user : ', error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//login data validation and redirection to home page
export const createSession = async (req, res) => {
  try {
    let token
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password)
      if (match) {
        token = jwt.sign({ _id: user.id }, env.jwt_secret, {
          expiresIn: '244444s',
        })
        return res.status(200).json({
          data: { token, user },
          success: true,
          message: 'Logged in successfully !!',
        })
      } else {
        return res.status(200).json({
          success: false,
          message: 'Email or password is invalid',
        })
      }
    } else {
      return res.status(200).json({
        success: false,
        message: 'Email or password is invalid',
      })
    }
  } catch (error) {
    console.log('Error while creating session : ', error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//show profile for current logged in user
export const readProfile = async (req, res) => {
  try {
    return res.status(200).json({
      data: req.user,
      success: true,
      message: 'Profile fetched successfully !!',
    })
  } catch (error) {
    console.log('Error while reading profile : ', error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  if (req.file) {
    console.log(req.file)
    req.user.avatar = `uploads/avatars/${Date.now()}-${req.file.originalname}`

    const updates = Object.keys(req.body)
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()

    await sharp(req.file.buffer)
      .resize({ width: 400, height: 400 })
      .toFile(`uploads/avatars/${Date.now()}-${req.file.originalname}`)

    return res.status(200).json({
      success: true,
      message: 'profile update successfully',
      data: req.user,
    })
  } else {
    const updates = Object.keys(req.body)
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()

    return res.status(200).json({
      success: true,
      message: 'profile update successfully',
      data: req.user,
    })
  }
}

export const deleteProfile = async (req, res) => {}


export const fetchUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)

    return res.status(200).json({
      message: 'User fetched successfully !!',
      success: true,
      data: user,
    })
  } catch (error) {
    console.log('Error while fetching user by id : ', error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
