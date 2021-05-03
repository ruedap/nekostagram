export const schema = gql`
  type Neko {
    id: Int!
    url: String!
    imageFileName: String!
    createdAt: DateTime!
  }

  type Query {
    nekos: [Neko!]!
    neko(id: Int!): Neko
  }

  input CreateNekoInput {
    url: String!
    imageFileName: String!
  }

  input UpdateNekoInput {
    url: String
    imageFileName: String
  }

  type Mutation {
    createNeko(input: CreateNekoInput!): Neko!
    updateNeko(id: Int!, input: UpdateNekoInput!): Neko!
    deleteNeko(id: Int!): Neko!
  }
`
