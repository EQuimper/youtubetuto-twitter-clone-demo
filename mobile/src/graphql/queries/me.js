import { gql } from 'react-apollo';

export default gql`
  {
    me {
      avatar
      username
      first_name
      last_name
      tweets_number
    }
  }
`;
