const User = require("../auth/models/User");
const Seller = require("../seller/models/Seller");
const Product = require("../products/models/Product");
const Order = require("../orders/models/Order");
const DiscountCode = require("../orders/models/DiscountCode");

async function getAllUsers() {}
async function getAllSellers() {}
async function approveSeller() {}
async function rejectSeller() {}
async function suspendSeller() {}
async function deleteProduct() {}
async function getAllOrders() {}
async function getOrderById() {}
async function getDiscountCodes() {}
async function createDiscountCode() {}
async function updateDiscountCode() {}
async function deleteDiscountCode() {}

module.exports = {
  getAllUsers,
  getAllSellers,
  approveSeller,
  rejectSeller,
  suspendSeller,
  deleteProduct,
  getAllOrders,
  getOrderById,
  getDiscountCodes,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
};
