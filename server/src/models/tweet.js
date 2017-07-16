import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
  text: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [144, 'Text cannot be longer than 144'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favorite_count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

TweetSchema.statics = {
  incFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favorite_count: 1 } }, { new: true });
  },

  decFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favorite_count: -1 } }, { new: true });
  },
};

export default mongoose.model('Tweet', TweetSchema);
