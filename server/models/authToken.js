import Mongoose from "mongoose";
import { string } from "yup";

const AuthTokenSchema = new Mongoose.Schema(
  {
    username: String,
    token: String,
    type: String
  },
  {
    versionKey: false,
  }
);

AuthTokenSchema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});

// Set the the values to JSON
AuthTokenSchema.set("toJSON", { virtuals: true });

const AuthTokenModel = Mongoose.model("authToken", AuthTokenSchema);

export default AuthTokenModel;