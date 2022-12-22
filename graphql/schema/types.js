const { gql } = require("apollo-server-express");

const typeDefs = gql`

    scalar FileUpload
    
    # Types
    type Seller {
        id: Int!
        name: String!
        pincode: String!
    }

    type Inventory {
        sellerId: Int!
        productId: Int!
        quantity: Int!
        mrp: Float!
        seller: Seller!
    }

    type Authentication {
        token: String!,
        timestamp: DateTime!
    }

    type UploadResult {
        status: Int!
    }

    #Queries
    type Query {
        sellers: [Seller!]
        seller: Seller!
        inventory(id: Int, offset: Int, limit: Int): [Inventory!]
        authenticate(email: String!, password: String!): Authentication!
    }

    #Mutations
    type Mutation {
        uploadSingleFile(file: FileUpload!): UploadResult!
        testMutation(in: Int!): String
    }
`;

module.exports = { 
    typeDefs
};