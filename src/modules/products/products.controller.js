const productsService = require("./products.service");

async function getProducts(req, res) {
  await productsService.getProducts();
}
async function getProductById(req, res) {
  await productsService.getProductById();
}
async function getProductsByCategory(req, res) {
  await productsService.getProductsByCategory();
}
async function getRecommendedProducts(req, res) {
  await productsService.getRecommendedProducts();
}
async function createProduct(req, res) {
  await productsService.createProduct();
}
async function updateProduct(req, res) {
  await productsService.updateProduct();
}
async function deleteProduct(req, res) {
  await productsService.deleteProduct();
}
async function rateProduct(req, res) {
  await productsService.rateProduct();
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getRecommendedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
};
