//Description : Here schema is defined that will be saved in the Database.
import Mongoose from "mongoose";

const adminSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
    },

    email: {
      type: String,
    },
    password: {
      type: String,
    }
  },
  {
    versionKey: false,
  }
);

adminSchema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});


adminSchema.set("toJSON", { virtuals: true });


const Usermodel = Mongoose.model("admin", adminSchema);

export default Usermodel;
