const adminService = require("./admin.service");

async function getAllUsers(req, res) {
  await adminService.getAllUsers();
}
async function getAllSellers(req, res) {
  await adminService.getAllSellers();
}
async function approveSeller(req, res) {
  await adminService.approveSeller();
}
async function rejectSeller(req, res) {
  await adminService.rejectSeller();
}
async function suspendSeller(req, res) {
  await adminService.suspendSeller();
}
async function deleteProduct(req, res) {
  await adminService.deleteProduct();
}
async function getAllOrders(req, res) {
  await adminService.getAllOrders();
}
async function getOrderById(req, res) {
  await adminService.getOrderById();
}
async function getDiscountCodes(req, res) {
  await adminService.getDiscountCodes();
}
async function createDiscountCode(req, res) {
  await adminService.createDiscountCode();
}
async function updateDiscountCode(req, res) {
  await adminService.updateDiscountCode();
}
async function deleteDiscountCode(req, res) {
  await adminService.deleteDiscountCode();
}

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
