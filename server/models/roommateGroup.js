import Mongoose from "mongoose";
import { string } from "yup";

const RoommateGroupSchema = new Mongoose.Schema(
  {
    groupname: String,
    members: [Mongoose.Types.ObjectId]
  },
  {
    versionKey: false,
  }
);

RoommateGroupSchema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});

// Set the the values to JSON
RoommateGroupSchema.set("toJSON", { virtuals: true });

const RoommateGroupModel = Mongoose.model("roommateGroup", RoommateGroupSchema);

export default RoommateGroupModel;