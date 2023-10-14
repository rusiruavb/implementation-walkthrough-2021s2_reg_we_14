import mongoose, { Schema } from "mongoose";

const ReloadSchema = new Schema({
  amount: { type: Number, required: true },
  location: {
    type: Schema.Types.ObjectId,
    ref: "ReloadLocation",
    required: false,
  },
  digitalWallet: {
    type: Schema.Types.ObjectId,
    ref: "Digital-Wallet",
    required: true,
  },
}, {
  timestamps: true,
});

const Reload = mongoose.model("Reload", ReloadSchema);

export default Reload;
