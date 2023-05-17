import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email')
            }
        }
    },
    bio: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    isPaidUser: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

// hashing password before saving the user
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
    }
    next()
  })

const User = mongoose.model('User', userSchema);
export default User;