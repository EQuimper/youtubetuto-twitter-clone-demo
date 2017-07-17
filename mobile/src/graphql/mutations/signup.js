import gql from 'graphql-tag';

export default gql`
  mutation signup($fullName: String!, $email: String!, $password: String!, $username: String!, $avatar: String!) {
    signup(fullName: $fullName, email: $email, password: $password, username: $username, avatar: $avatar) {
      token
    }
  }
`;
