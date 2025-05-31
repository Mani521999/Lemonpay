/** Packages */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

/** Services */
import config from "../../../Config/config";

/** Global-Usage */
const Schema = mongoose.Schema;

/** Login-History */
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

/** Virtuals */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/** Methods */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: async function (password) {
    const hash = await bcrypt.hash(password, 10);
    return await bcrypt.compare(password, hash);
  },
  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: async function (password) {

    return await bcrypt.hash(password, 10)
  },
};

UserSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.KEY, { expiresIn: 280000 }); // exptime 8hours in seconds
  return `Bearer ${token}`;
};

UserSchema.methods.decodejwt = function (payload) {
  var token = jwt.verify(payload, config.KEY);
  return token;
};

const User = mongoose.model("user", UserSchema, "user");

export default User;
