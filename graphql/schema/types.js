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

    #Query
    type Query {
        sellers: [Seller!]
        seller: Seller!
        inventory(id: Int, offset: Int, limit: Int): [Inventory!]
    }
`;

module.exports = { 
    typeDefs
};