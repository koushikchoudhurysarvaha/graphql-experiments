const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
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

    #Query
    type Query {
        sellers: [Seller!]
        seller: Seller!
        inventory(id: Int, offset: Int, limit: Int): [Inventory!]
        authenticate(email: String!, password: String!): Authentication!
    }
`;

module.exports = { 
    typeDefs
};