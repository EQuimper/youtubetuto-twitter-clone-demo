import TweetResolvers from './tweet.resolvers';
import UserResolvers from './user.resolvers';
import User from '../../models/user';

export default {
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getTweets: TweetResolvers.getTweets,
    me: UserResolvers.me
  },
  Mutation: {
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    createTweet: TweetResolvers.createTweet,
    favoriteTweet: TweetResolvers.favoriteTweet,
  },
  Subscription: {
    tweetAdded: TweetResolvers.tweetAdded,
    tweetFavorited: TweetResolvers.tweetFavorited
  }
};
