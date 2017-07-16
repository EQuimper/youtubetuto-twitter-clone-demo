import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  avatar: String,
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
