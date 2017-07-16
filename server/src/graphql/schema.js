export default`
  type Tweet {
    _id: String
    text: String
    updatedAt: String
    createdAt: String
    user: User
    favorite_count: Int
  }

  type User {
    _id: String
    username: String
    first_name: String
    last_name: String
    avatar: String
    updatedAt: String
    createdAt: String
  }

  type Query {
    getTweets: [Tweet]
  }

  type Mutation {
    favoriteTweet(_id: String!): Tweet
  }
`;
