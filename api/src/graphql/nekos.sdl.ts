export const schema = gql`
  type Neko {
    id: Int!
    url: String!
    createdAt: DateTime!
  }

  type Query {
    nekos: [Neko!]!
    neko(id: Int!): Neko
  }

  input CreateNekoInput {
    url: String!
  }

  input UpdateNekoInput {
    url: String
  }

  type Mutation {
    createNeko(input: CreateNekoInput!): Neko!
    updateNeko(id: Int!, input: UpdateNekoInput!): Neko!
    deleteNeko(id: Int!): Neko!
  }
`
