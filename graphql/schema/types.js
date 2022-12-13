const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLSchema } = require("graphql");
const { getInventoryBySellerId, getSellers, findProductById, findSeller, findProduct } = require("../resolver");

const reuse = (type) => {
    const spreadable = {};
    if (type instanceof GraphQLObjectType) {
        for (const fieldName in type.getFields()) {
            spreadable[fieldName] = { type: Inventory.getFields()[fieldName]['type'] }
        }
    }
    return spreadable;
}

const Seller = new GraphQLObjectType({
    name: 'Seller',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        pincode: { type: GraphQLString }
    })
});

const Product = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

const Inventory = new GraphQLObjectType({
    name: 'Inventory',
    fields: () => ({
        productId: { type: GraphQLInt },
        sellerId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        mrp: { type: GraphQLFloat },
        seller: { type: Seller, resolve: findSeller },
        product: { type: Product, resolve: findProduct },
    })
});

const SellerInventory = new GraphQLObjectType({
    name: 'SellerInventory',
    fields: () => ({
        seller: { type: Seller, resolve: findSeller },
        product: { type: Product, resolve: findProductById },
        inventory: {
            type: Inventory,
            resolve: getInventoryBySellerId
        }
    })
});

const ProductInventory = new GraphQLObjectType({
    name: 'ProductInventory',
    fields: () => ({
        seller: { type: Seller },
        product: { type: Product },
        ...reuse(Inventory)
    })
});


module.exports = { 
    Seller, 
    Product, 
    Inventory, 
    SellerInventory,
    ProductInventory 
};