import { gql } from 'react-apollo';

export default gql`
  {
    getTweets {
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
