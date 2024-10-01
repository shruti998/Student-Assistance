import Mongoose from "mongoose";
import { string } from "yup";

const RoommateProfileSchema = new Mongoose.Schema(
  {
    username: String,
    picture: String,
    name: String,
    age: Number,
    likes: [String],
    dislikes: [String],
    group: Mongoose.Types.ObjectId,
    livingPreferences: {
      numberOfPeople: Number,
      eatingPreferences: String,
      smoking: Boolean,
      drinking: Boolean
    }
  },
  {
    versionKey: false,
  }
);

RoommateProfileSchema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});

// Set the the values to JSON
RoommateProfileSchema.set("toJSON", { virtuals: true });

const RoommateProfileModel = Mongoose.model("roommateProfile", RoommateProfileSchema);

export default RoommateProfileModel;