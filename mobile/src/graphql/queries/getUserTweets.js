import { gql } from 'react-apollo';

export default gql`
  {
    getUserTweets {
      _id
      text
      createdAt
      favorite_count
      isFavorited
      user {
        first_name
        last_name
        avatar
        username
      }
    }
  }
`;
