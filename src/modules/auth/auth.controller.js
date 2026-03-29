const authService = require("./auth.service");

// Auth Controller Functions
async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // Basic request validation
    if (
      !fullName ||
      String(fullName).trim() === "" ||
      String(fullName).split(" ").length < 2
    )
      return res
        .status(400)
        .json({ ok: false, message: "Full Name is required" });

    if (!email || String(email).trim() === "")
      return res.status(400).json({ ok: false, message: "Email is required" });

    if (!password || String(password).trim() === "")
      return res
        .status(400)
        .json({ ok: false, message: "Password is required" });

    // Call service function
    await authService.register({ fullName, email, password });

    return res.json({ ok: true, message: "Registered" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Request validation
    if (!email || String(email).trim() === "")
      return res.status(400).json({ ok: false, message: "Email is required" });

    if (!password || String(password).trim() === "")
      return res
        .status(400)
        .json({ ok: false, message: "Password is required" });

    // Call service function
    const user = await authService.login({ email, password });

    // Set session user and save
    req.session.user = user;
    req.session.save((err) => {
      if (err) return res.status(500).json({ error: "Session error" });
      return res.json({ ok: true, message: "Logged in" });
    });

  } catch (err) {
    console.log(err);
    return res.status(401).json({ ok: false, error: err.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email || String(email).trim() === "")
      return res.status(400).json({ ok: false, message: "Email is required" });

    await authService.forgotPassword(email);

    return res.status(200).json({
      message: "If an account exists for that email, a reset code was sent.",
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword)
      return res.status(400).json({ message: "Missing fields" });

    await authService.resetPassword(email, code, newPassword);

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function getUser(req, res) {
  return res.json({ user: req.session.user });
}

async function logout(req, res) {
  req.session.destroy(() => res.json({ message: "Logged out" }));
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
  uploadProfilePicture,
};
