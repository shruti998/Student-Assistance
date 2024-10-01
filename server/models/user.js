//Description : Here schema is defined that will be saved in the Database.
import Mongoose from "mongoose";
import { string } from "yup";
import bcrypt from "bcrypt";
const Userschema = new Mongoose.Schema(
  {
    userName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    savedHouse:[Mongoose.Types.ObjectId]
  },
  {
    versionKey: false,
  }
);

Userschema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});

// Set the the values to JSON
Userschema.set("toJSON", { virtuals: true });


const Usermodel = Mongoose.model("user", Userschema);

export default Usermodel;
