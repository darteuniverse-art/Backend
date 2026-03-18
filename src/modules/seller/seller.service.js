const { Seller } = require("./models");
const { Product } = require("../products/models");
const { Order } = require("../orders/models");

async function applyForSeller() {}
async function getSellerStatus() {}
async function getSellerProducts() {}
async function createSellerProduct() {}
async function updateSellerProduct() {}
async function deleteSellerProduct() {}
async function getSellerOrders() {}
async function getSellerOrderById() {}
async function updateSellerOrderStatus() {}

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
