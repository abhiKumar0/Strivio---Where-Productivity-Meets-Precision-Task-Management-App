import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "email"
      },
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    role: {
      type: String,
      enum: ["leader", "member", "admin"],
      default: "member",
    },
    googleId: String,
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dy5hgr3ie/image/upload/v1622193986/avatar/avatar-1.png",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.generateAccessToken = async function() {
  return jwt.sign({
    _id: this._id,
    email:this.email,
    username: this.username,
    fullName: this.fullName,
    
  }, 
  process.env.ACCESS_SECRET_KEY,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    
  })
}

UserSchema.methods.generateRefreshToken = async function() {
  return jwt.sign({
    _id: this._id,
    
  }, 
  process.env.REFRESH_SECRET_KEY,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    
  })
}

export const User = mongoose.model("User", UserSchema);
