import mongoose, { Schema } from 'mongoose';

const RouteSchema = new Schema({
  routeId: { type: String, required: true, default: null },
  startingLocation: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true, default: 0 },
});

const Route = mongoose.model('Route', RouteSchema);

export default Route;
