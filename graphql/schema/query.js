const { GraphQLObjectType, GraphQLInt, GraphQLSchema, GraphQLList } = require("graphql");
const { Seller, Product, Inventory, SellerInventory, ProductInventory } = require("./types");
const { 
    getSellers, 
    findProductById, 
    getInventoryBySellerId, 
    getSellerInventory,
    getProductInventory 
} = require("../resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        sellers: {
            type: new GraphQLList(Seller),
            args: { id: { type: GraphQLInt } },
            resolve: getSellers
        },
        product: {
            type: Product,
            args: { id: { type: GraphQLInt } },
            resolve: findProductById
        },
        inventory: {
            type: new GraphQLList(Inventory),
            args: { 
                sellerId: { type: GraphQLInt }, 
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve: getInventoryBySellerId
        },
        sellerInventory: {
            type: new GraphQLList(SellerInventory),
            args: { sellerId: { type: GraphQLInt } },
            resolve: getSellerInventory
        },
        productInventory: {
            type: new GraphQLList(ProductInventory),
            args: { productId: { type: GraphQLInt } },
            resolve: getProductInventory
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})