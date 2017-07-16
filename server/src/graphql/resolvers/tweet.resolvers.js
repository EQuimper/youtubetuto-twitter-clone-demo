import Tweet from '../../models/tweet';

export default {
  getTweets: () => Tweet.find({}).sort({ createdAt: -1 }),
};
