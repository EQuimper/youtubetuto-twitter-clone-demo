import gql from 'graphql-tag';

export default gql`
  subscription {
    tweetAdded {
      text
      _id
      createdAt
      favorite_count
      isFavorited
      user {
        username
        avatar
        last_name
        first_name
      }
    }
  }
`;
