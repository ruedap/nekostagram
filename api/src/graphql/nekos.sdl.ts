export const schema = gql`
  type Neko {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    url: String!
    imageFileName: String!
    imageFileNameOriginal: String!
    imageFileExt: String
  }

  type Query {
    nekos: [Neko!]!
    neko(id: Int!): Neko
  }

  input CreateNekoInput {
    url: String!
    imageFileName: String!
    imageFileNameOriginal: String!
    imageFileExt: String
  }

  input UpdateNekoInput {
    url: String!
    imageFileName: String!
    imageFileNameOriginal: String!
    imageFileExt: String
  }

  type Mutation {
    createNeko(input: CreateNekoInput!): Neko!
    updateNeko(id: Int!, input: UpdateNekoInput!): Neko!
    deleteNeko(id: Int!): Neko!
  }
`
