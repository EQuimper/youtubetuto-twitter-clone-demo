import gql from 'graphql-tag';

export default gql`
  {
    getTweets {
      text
      _id
      createdAt
      user {
        username
        avatar
        last_name
        first_name
      }
    }
  }
`;
