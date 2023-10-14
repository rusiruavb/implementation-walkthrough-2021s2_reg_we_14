import mongoose, { Schema } from 'mongoose';

const PassCardSchema = new Schema({
  packageName: { type: String, required: true }, 
  digitalWalletId: { type: Schema.Types.ObjectId, required: true, ref: 'Digital-Wallet'},
  cardNumber: { type: String, required: false },
  securityNumber: { type: String, required: false },
  passengerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  cardType: {
    type: String,
    required: true,
    enum: ['SMART CARD', 'FOREIGN EXPRESS PASS'],
    default: 'SMART CARD',
  },
  tripId: { type: Schema.Types.ObjectId, required: false, ref: 'Trip', default: null },
}, {
  timestamps: true
});

const PassCard = mongoose.model('PassCard', PassCardSchema);

export default PassCard;