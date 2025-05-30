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
      default: "",
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

/** Virtuals */
UserSchema.virtual("hashes")
  .set(function (pass) {
    this._password = pass;
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(pass);
  })
  .get(function () {
    return this._password;
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
    var saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
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
