import User from '../../models/user';
import FavoriteTweet from '../../models/favorite_tweet';
import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { fullName, username, password, email, avatar }) => {
    const [first_name, ...last_name] = fullName.split(' ');

    const user = await User.create({ first_name, last_name, username, password, email, avatar });
    await FavoriteTweet.create({ user_id: user._id });

    return {
      token: user.createToken()
    };
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not exist!');
    }

    if (!user.authenticateUser(password)) {
      throw new Error('Password not match!');
    }

    return {
      token: user.createToken()
    }
  },
  me: async (_, args, { user }) => {
    await requireAuth(user);
    const favorite = await FavoriteTweet.findOne({ user_id: user._id });
    const me = await User.findById(user._id);
    const favJson = favorite.toJSON();

    return {
      ...me.toJSON(),
      tweets_likes: favJson.tweets.length
    }
  }
}
