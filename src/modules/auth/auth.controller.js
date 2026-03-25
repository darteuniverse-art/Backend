const authService = require("./auth.service");

// Placeholder controller functions
async function register(req, res) {
  await authService.register(req.body);
}
async function login(req, res) {
  await authService.login(req.body);
}
async function forgotPassword(req, res) {
  await authService.forgotPassword(req.body);
}
async function resetPassword(req, res) {
  await authService.resetPassword(req.body);
}
async function getUser(req, res) {
  await authService.getUser(req.body);
}
async function logout(req, res) {
  await authService.logout(req.body);
}
async function uploadProfilePicture(req, res) {
    await authService.uploadProfilePicture();
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  logout,
  uploadProfilePicture
};
