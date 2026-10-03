const productDatabase = require('../database/productDatabase');

async function getProducts() {
    return await productDatabase.readFileWithDelay();
}

async function getProductById(id) {
    const products = await productDatabase.readFileWithDelay();

    return products.find(item => item.id === id);
}

module.exports = {
    getProducts,
    getProductById
};