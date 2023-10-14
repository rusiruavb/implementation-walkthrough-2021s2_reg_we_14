import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import LOGGER from '../log/logger';

const options = {
  timestamps: true,
};

const UserSchema = new Schema(
  {
    nic: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    role: {
      type: String,
      required: true,
      enum: [
        'MANAGER',
        'PASSENGER',
        'FOREIGN_PASSENGER',
        'INSPECTOR',
        'DRIVER',
      ],
      default: 'PASSENGER',
    },
    routesList: [
      { type: Schema.Types.ObjectId, required: false, ref: 'routes' },
    ],
    licenceNumber: { type: String, required: false, default: null },
    permitNumber: { type: String, required: false, default: null },
    visaExpirationDate: { type: Date, required: false, default: null },
    imageUrl: { type: String, required: true },
    stripeSmartPassCustomerId: { type: String, required: false, default: null },
    stripePaymentId: { type: String, required: false, default: null },
    token: { type: String },
    deletedAt: { type: Date, required: false, default: null },
  },
  options
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'CSSESecret');
  user.token = token;
  await user.save();
  return token;
};

UserSchema.statics.findByUsernamePassword = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    LOGGER.error('User not found');
    return 'User not found';
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    LOGGER.error('Email or password is not match');
    return 'Email or password is not match';
  }
  return user;
};

const User = mongoose.model('User', UserSchema);

export default User;
