import Tweet from '../../models/tweet';

export default {
  getTweets: () => Tweet.find({}).sort({ createdAt: -1 }),
  favoriteTweet: (_, { _id }) => Tweet.incFavoriteCount(_id),
};
