import faker from 'faker';

import Tweet from '../models/tweet';
import User from '../models/user';
import FavoriteTweet from '../models/favorite_tweet';

const FAKE_TWEETS = 3;
const FAKE_USERS = 3;

export default async () => {
  await Tweet.remove();
  await User.remove();
  await FavoriteTweet.remove();
  await Array.from({ length: FAKE_USERS }).forEach(async (_, i) => {
    const user = await User.create({
      username: faker.internet.userName(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
      password: 'password123'
    });
    await Array.from({ length: FAKE_TWEETS }).forEach(async () => {
      await Tweet.create({ text: faker.lorem.words(7), user: user._id });
    });
  });
};
