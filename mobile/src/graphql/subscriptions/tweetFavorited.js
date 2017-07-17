import gql from 'graphql-tag';

export default gql`
  subscription {
    tweetFavorited {
      _id
      favorite_count
    }
  }
`;
