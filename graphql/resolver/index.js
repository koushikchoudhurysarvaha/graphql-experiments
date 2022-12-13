const { sellers, products, inventory } = require("../../data");

const getSellers = async (parent, args) => {
    console.log("getSellers Parent: ", parent);
    return args.id && sellers.filter(s => s.id === args.id) || sellers;
}

const findSeller = async (parent, args) => {
    console.log("findSeller Parent: ", parent);
    return sellers.find(s => s.id === parent.sellerId);
}

const findProductById = async (parent, args) => {
    console.log("findProductById Parent: ", parent);
    return products.find(p => p.id === args.id);
}

const findProduct = async (parent, args) => {
    console.log("findProductById Parent: ", parent);
    return products.find(p => p.id === parent.productId);
}

//const getSeller = async(parent, args)

const getInventoryBySellerId = async (parent, args) => {
    return inventory.filter(i => i.sellerId === args.sellerId);
}

const getSellerInventory = async (parent, args) => {
    /* console.log("Parent: ", parent);
    const sellerInventory = inventory.filter(i => i.sellerId === args.sellerId);
    for (const item of sellerInventory) {
        item.product = products.find(p => p.id === item.productId);
        item.seller = sellers.find(s => s.id === item.sellerId);
    }
    return sellerInventory; */
    return inventory.filter(i => i.sellerId === args.sellerId);
}

const getProductInventory = async (parent, args) => {
    const productInventory = inventory.filter(i => i.productId === args.productId);
    for (const item of productInventory) {
        item.product = products.find(p => p.id === item.productId);
        item.seller = sellers.find(s => s.id === item.sellerId);
    }
    return productInventory;
}

module.exports = {
    getSellers,
    findProductById,
    getInventoryBySellerId,
    getSellerInventory,
    getProductInventory,
    findSeller,
    findProduct
}