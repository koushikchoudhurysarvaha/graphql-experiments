const { query } = require("../../mysql");
const { AuthenticationError } = require("apollo-server-errors");

const sellers = async (parent, args) => {
    parent && console.log("sellers Parent: ", parent);
    const [sellers] = await query(`
        SELECT * FROM seller
        ${args.id && `WHERE id=${args.id}` || ''}
    `);
    return sellers;
}

const seller = async (parent, args) => {
    parent && console.log("seller Parent: ", parent);
    const [[data]] = await query(`
        SELECT * FROM seller
        ${parent.id && `WHERE id=${parent.id}` || ''}
        LIMIT 1
    `);
    return data;
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

const inventory = async (parent, args, context) => {
    if (context.user.id !== 1) {
        throw new AuthenticationError('Error 2');
    }
    const { limit, offset, id } = args;
    console.log("L", limit)
    console.log("O", offset, !!offset)
    const [data] = await query(`
        SELECT 
            i.*,
            JSON_OBJECT(
                'id', s.id,
                'name', s.name,
                'pincode', s.pincode
            ) AS seller
        FROM inventory i
        INNER JOIN seller s ON s.id=i.sellerId
        ${id && `WHERE s.id=${id}` || ''}
        ${limit && `LIMIT ${limit}` || ''}
        ${offset && `OFFSET ${offset}` || ''}
    `);
    return data;
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

const authenticate = async (parent, args) => {
    const { email, password } = args;
    if (email === '1' && password === '2') {
        return {
            token: "123",
            timestamp: new Date()
        }
    }
}

module.exports = {
    sellers,
    findProductById,
    //getInventoryBySellerId,
    getSellerInventory,
    getProductInventory,
    findSeller,
    findProduct,
    resolvers: {
        Query: {
            seller,
            sellers,
            inventory,
            authenticate
        }
    }
}