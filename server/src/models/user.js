import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
