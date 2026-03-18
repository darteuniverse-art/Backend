const ordersService = require("./orders.service");

async function createOrder(req, res) {
  await ordersService.createOrder();
}
async function getOrders(req, res) {
  await ordersService.getOrders();
}
async function getOrderById(req, res) {
  await ordersService.getOrderById();
}
async function verifyDiscountCode(req, res) {
  await ordersService.verifyDiscountCode();
}

module.exports = { createOrder, getOrders, getOrderById, verifyDiscountCode };
