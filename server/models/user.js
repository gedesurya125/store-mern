import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  cratedAt: {
    type: Date,
    default: new Date()
  },
  fullName: {
    type: String,
    default: ''
  },
  nickName: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  birthday: {
    type: String,
    default: ''
  },
  photo: {
    lastModified : {
      type: Date,
      default: new Date()
    },
    name: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		size: {
			type: Number,
			default: 0,
		},
		base64: {
			type: String,
			default: '',
		},
  }
})

export const user = mongoose.model('user', userSchema);