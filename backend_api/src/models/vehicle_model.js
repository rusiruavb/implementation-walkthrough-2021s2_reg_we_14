import mongoose, { Schema } from "mongoose";

const VehicleSchema = new Schema({
  vehicleId: { type: String, required: true },
  driver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  routeList: [{ type: Schema.Types.ObjectId, ref: "Route", required: false }],
  numberOfCoaches: { type: Number, required: false },
  capacityPerCoach: { type: Number, required: false },
  metroCapacity: { type: Number, required: false },
  numberOfSeats: { type: Number, required: false },
  isPublic: { type: Boolean, required: false, default: false },
  registrationNumber: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["BUS", "METRO", "TRAIN"],
    default: "BUS",
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
