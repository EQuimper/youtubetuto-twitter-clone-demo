import TweetResolvers from './tweet.resolvers';
import UserResolvers from './user.resolvers';
import User from '../../models/user';

export default {
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getTweets: TweetResolvers.getTweets,
  },
  Mutation: {
    signup: UserResolvers.signup,
    favoriteTweet: TweetResolvers.favoriteTweet,
  },
};
