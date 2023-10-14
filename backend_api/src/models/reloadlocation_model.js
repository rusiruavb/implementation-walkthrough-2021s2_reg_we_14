import mongoose, { Schema } from "mongoose";

const ReloadLocationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  distance: { type: String, required: true },
});

const ReloadLocation = mongoose.model("ReloadLocation", ReloadLocationSchema);

export default ReloadLocation;
