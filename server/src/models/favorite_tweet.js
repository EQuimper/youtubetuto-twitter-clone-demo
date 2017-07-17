import mongoose, { Schema } from 'mongoose';

const FavoriteTweetSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tweets: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweet'
  }],
});

FavoriteTweetSchema.index({ user_id: 1 }, { unique: true });

export default mongoose.model('FavoriteTweet', FavoriteTweetSchema);
