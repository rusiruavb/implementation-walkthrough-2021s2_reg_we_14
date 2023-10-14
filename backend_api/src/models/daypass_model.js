import mongoose, { Schema } from 'mongoose';

const DayPassSchema = new Schema({
  amount: { type: Number, required: false },
  passengerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  cardType: { type: String, required: false, default: 'DAY PASS' },
  tripId: { type: Schema.Types.ObjectId, required: false, ref: 'Trip' },
  expireAt: { type: Date, required: false, default: null },
  isExpired: { type: Boolean, required: false, default: false },
}, {
  timestamps: true
});

DayPassSchema.post('save', async function(res, next) {
  const dayPass = this;
  let timeOutId;

  setDayPassExpire();

  function setDayPassExpire() {
    timeOutId = setTimeout(async (data) => {  
      dayPass.expireAt = Date.now();
      dayPass.isExpired = true;
      await dayPass.save().then(() => {
        clear();
      })
      next();
    }, 60000);
  }
  
  function clear() {
    console.log('Day pass expired');
    clearTimeout(timeOutId);
  }
})

const DayPassCard = mongoose.model('DayPassCard', DayPassSchema);

export default DayPassCard;