import faker from 'faker';

import Tweet from '../models/tweet';
import User from '../models/user';

const FAKE_TWEETS = 10;
const FAKE_USERS = 3;

export default async () => {
  await Tweet.remove();
  await User.remove();
  await Array.from({ length: FAKE_USERS }).forEach(async () => {
    const user = await User.create({ username: faker.internet.userName() });
    await Array.from({ length: FAKE_TWEETS }).forEach(async () => {
      await Tweet.create({ text: faker.lorem.words(4), user: user._id });
    });
  });
};
