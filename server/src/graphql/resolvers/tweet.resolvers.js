import Tweet from '../../models/tweet';

export default {
  getTweets: (_, args) => Tweet.find({}),
};
