import mongoose, { Schema } from "mongoose";

const TripSchema = new Schema({
  startTime: { type: Date, required: true, default: null },
  endTime: { type: Date, required: true, default: null },
  pricePerKilometer: { type: Number, required: true, default: 0 },
  trespasserCount: { type: Number, required: false, default: 0 },
  route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  inspector: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  passengers: [{ type: Schema.Types.ObjectId, ref: "passengers", required: false }],
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true }
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
