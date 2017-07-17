export default `
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
    email: String
    avatar: String
    updatedAt: String
    createdAt: String
  }

  type Auth {
    token: String
  }

  type Query {
    getTweets: [Tweet]
  }

  type Mutation {
    signup(fullName: String!, email: String!, password: String!, username: String!): Auth
    favoriteTweet(_id: String!): Tweet
  }
`;
