import mongoose from "mongoose";
import validator from 'validator';

const user = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: [6, 'Too few chars'],
      max: 30
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [(email)=> {
         return validator.isEmail(email); 
      }, 'this is the message if not validateي email'],
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "MANAGER"],
      default: "USER"
    },
    avatar: {
      type: String,
      default: 'profile.jpg'
    }
  });
  const User = mongoose.model('User', user);

  export {
    User
};
    