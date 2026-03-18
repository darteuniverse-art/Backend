const sellerService = require("./seller.service");

async function applyForSeller(req, res) {
  await sellerService.applyForSeller();
}
async function getSellerStatus(req, res) {
  await sellerService.getSellerStatus();
}
async function getSellerProducts(req, res) {
  await sellerService.getSellerProducts();
}
async function createSellerProduct(req, res) {
  await sellerService.createSellerProduct();
}
async function updateSellerProduct(req, res) {
  await sellerService.updateSellerProduct();
}
async function deleteSellerProduct(req, res) {
  await sellerService.deleteSellerProduct();
}
async function getSellerOrders(req, res) {
  await sellerService.getSellerOrders();
}
async function getSellerOrderById(req, res) {
  await sellerService.getSellerOrderById();
}
async function updateSellerOrderStatus(req, res) {
  await sellerService.updateSellerOrderStatus();
}

module.exports = {
  applyForSeller,
  getSellerStatus,
  getSellerProducts,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
  getSellerOrders,
  getSellerOrderById,
  updateSellerOrderStatus,
};
