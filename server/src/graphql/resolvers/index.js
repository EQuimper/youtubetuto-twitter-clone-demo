import TweetResolvers from './tweet.resolvers';
import User from '../../models/user';

export default {
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getTweets: TweetResolvers.getTweets,
  },
};
