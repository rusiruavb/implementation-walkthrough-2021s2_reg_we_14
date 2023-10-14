import mongoose, { Schema } from "mongoose";

const LoanSchema = new Schema({
  loanAmount: { type: Number, required: true },
  isLoanPaid: { type: Boolean, required: false, default: false },
  digitalWalletId: {
    type: Schema.Types.ObjectId,
    ref: "Digital-Wallet",
    required: true,
  },
}, {
  timestamps: true
});

const Loan = mongoose.model("Loan", LoanSchema);

export default Loan;
