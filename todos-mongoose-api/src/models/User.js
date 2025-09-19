import { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export default model('User', userSchema);
