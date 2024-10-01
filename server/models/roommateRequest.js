import Mongoose from "mongoose";

const RoommateRequestSchema = new Mongoose.Schema(
  {
    sender: Mongoose.Types.ObjectId,
    recipient: Mongoose.Types.ObjectId,
    status: String,
    type: String
  },
  {
    versionKey: false,
  }
);

RoommateRequestSchema.virtual("id").get(function () {
  //Convert id to HexaDecimal
  return this._id.toHexString();
});

// Set the the values to JSON
RoommateRequestSchema.set("toJSON", { virtuals: true });

const RoommateRequestModel = Mongoose.model("roommateRequest", RoommateRequestSchema);

export const RoommateRequestTypes = {
  create_group : "create_group", // both are individuals, create a new group
  join_group : "join_group", // recipient is in a group, requesting to join the recipients group
  invite_group : "invite_group", // recipient is being invited to join sender's group
}

export default RoommateRequestModel;