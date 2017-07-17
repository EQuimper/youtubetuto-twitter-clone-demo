import Tweet from '../../models/tweet';
import FavoriteTweet from '../../models/favorite_tweet';

export default {
  getTweets: async (_, args, { user }) => {
    const p1 = Tweet.find({}).sort({ createdAt: -1 });
    const p2 = FavoriteTweet.findOne({ user_id: user._id });
    const [tweets, favorites] = await Promise.all([p1, p2]);

    const tweetsToSend = tweets.reduce((arr, tweet) => {
      const tw = tweet.toJSON();
      if (favorites.tweets.some(t => t.equals(tweet._id))) {
        arr.push({
          ...tw,
          isFavorited: true,
        });
      } else {
        arr.push({
          ...tw,
          isFavorited: false,
        });
      }

      return arr;
    }, []);

    return tweetsToSend;
  },
  favoriteTweet: async (_, { _id }, { user }) => {
    const favorites = await FavoriteTweet.findOne({ user_id: user._id });
    if (favorites.tweets.some(t => t.equals(_id))) {
      const tweet = await Tweet.decFavoriteCount(_id);
      favorites.tweets.pull(_id);
      await favorites.save();
      return {
        isFavorited: false,
        ...tweet.toJSON()
      }
    }
    const tweet = await Tweet.incFavoriteCount(_id);
    favorites.tweets.push(_id);
    await favorites.save();
    return {
      isFavorited: true,
      ...tweet.toJSON()
    }
  },
  createTweet: (_, { text }, { user }) => Tweet.create({ text, user: user._id })
};
