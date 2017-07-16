import mongoose, { Schema } from 'mongoose';

const TweetScema = new Schema({
  text: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [144, 'Text cannot be longer than 144'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.model('Tweet', TweetScema);
