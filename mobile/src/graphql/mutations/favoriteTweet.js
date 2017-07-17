import gql from 'graphql-tag';

export default gql`
  mutation favoriteTweet($_id: String!) {
    favoriteTweet(_id: $_id) {
      isFavorited
      favorite_count
      _id
    }
  }
`;
