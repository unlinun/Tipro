import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: [true, "Email has been used! Please Try another"], //是否唯一？
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    min: 6,
  },
  birthday: {
    type: Date,
    required: [true, "Please provide birthday"],
  },
  companyID: {
    type: String,
    default: "Tipro",
  },
  avatar: {
    type: String,
    default: "assets/avatar.svg",
  },
  position: {
    type: String,
    default: "staff",
  },
  adminProjects: {
    type: Boolean,
    default: false,
  },
  adminReport: {
    type: Boolean,
    default: false,
  },
});

// 先將 User schema 做預處理
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  const companyManage = await User.find({ companyID: this.companyID });
  if (companyManage.length <= 0) {
    this.adminProjects = true;
    this.adminReport = true;
  }
});

// 建立 token (此處使用 Schema 的 methods)
UserSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

//進行密碼比較
UserSchema.methods.comparePassword = async function (reqPassword) {
  const isMatch = await bcrypt.compare(reqPassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);
export default User;
