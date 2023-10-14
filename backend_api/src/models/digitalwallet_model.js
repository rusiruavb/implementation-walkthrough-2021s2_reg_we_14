import mongoose, { Schema } from "mongoose";

const WalletSchema = new Schema({
  availableAmount: { type: Number, required: true },
  initialAmount: { type: Number, required: true },
  passengerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  isLoan: { type: Boolean, required: false, default: false },
  reload: [{ type: Schema.Types.ObjectId, ref: "Reload", required: false }],
  loan: { type: Schema.Types.ObjectId, ref: "Loan", required: false, default: null },
});

const DigitalWallet = mongoose.model("Digital-Wallet", WalletSchema);

export default DigitalWallet;
