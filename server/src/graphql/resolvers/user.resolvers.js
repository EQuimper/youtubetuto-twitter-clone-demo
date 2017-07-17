import User from '../../models/user';
import FavoriteTweet from '../../models/favorite_tweet';

export default {
  signup: async (_, { fullName, username, password, email }) => {
    const [first_name, ...last_name] = fullName.split(' ');

    const user = await User.create({ first_name, last_name, username, password, email });
    await FavoriteTweet.create({ user_id: user._id });

    return {
      token: user.createToken()
    };
  }
}
