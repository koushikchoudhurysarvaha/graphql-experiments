const { _sellers, products, _inventory } = require("../../data");
const { query } = require("../../mysql");

const getSellers = async (parent, args) => {
    parent && console.log("getSellers Parent: ", parent);
    const [sellers] = await query(`
        SELECT * FROM seller
        ${args.id && `WHERE id=${args.id}` || ''}
    `);
    return sellers;
}

const findSeller = async (parent, args) => {
    parent && console.log("findSeller Parent: ", parent);
    const [[seller]] = await query(`
        SELECT * FROM seller
        WHERE id = ${parent.sellerId}
    `);
    return seller;
}

const findProductById = async (parent, args) => {
    console.log("findProductById Parent: ", parent);
    return products.find(p => p.id === args.id);
}

const findProduct = async (parent, args) => {
    parent && console.log("findProduct Parent: ", parent);
    const [[product]] = await query(`
        SELECT * FROM product
        WHERE id=${parent.productId}
    `);
    return product;
}

const getInventoryBySellerId = async (parent, args) => {
    const { limit, offset } = args;
    console.log("L", limit)
    console.log("O", offset, !!offset)
    const [inventory] = await query(`
        SELECT * FROM inventory
        WHERE sellerId=${args.sellerId}
        ${limit && `LIMIT ${limit}` || ''}
        ${offset && `OFFSET ${offset}` || ''}
    `);
    return inventory;
}

const getSellerInventory = async (parent, args) => {
    /* console.log("Parent: ", parent);
    const sellerInventory = _inventory.filter(i => i.sellerId === args.sellerId);
    for (const item of sellerInventory) {
        item.product = products.find(p => p.id === item.productId);
        item.seller = sellers.find(s => s.id === item.sellerId);
    }
    return sellerInventory; */
    return _inventory.filter(i => i.sellerId === args.sellerId);
}

const getProductInventory = async (parent, args) => {
    const productInventory = _inventory.filter(i => i.productId === args.productId);
    for (const item of productInventory) {
        item.product = products.find(p => p.id === item.productId);
        item.seller = _sellers.find(s => s.id === item.sellerId);
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