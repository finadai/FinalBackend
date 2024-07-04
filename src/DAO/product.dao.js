const Product = require('../models/product');

const findById = (id) => {
    return Product.findById(id);
};

const deleteOne = (filter) => {
    return Product.deleteOne(filter);
};

const create = (productData) => {
    const product = new Product(productData);
    return product.save();
};

const updateOne = (filter, update) => {
    return Product.updateOne(filter, update);
};

const find = (filter) => {
    return Product.find(filter);
};

module.exports = {
    findById,
    deleteOne,
    create,
    updateOne,
    find
};
