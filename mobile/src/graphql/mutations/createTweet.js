import gql from 'graphql-tag';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      isFavorited
      favorite_count
      _id
      createdAt
      text
      user {
        username
        first_name
        last_name
        avatar
      }
    }
  }
`;
