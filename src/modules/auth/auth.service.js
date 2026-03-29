const { User, Otp } = require("./models");
const { sendMail, queueMail } = require("../../shared/lib/mail/mailer");

// Placeholder service functions
async function register({ fullName, email, password }) {
  // Check for existing user with the same email
  const existingUser = await User.findOne({ email: email });
  if (existingUser) throw new Error("A user with this email already exists");

  const userData = { fullName, email };

  const ADMIN_EMAILS = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim())
    : [];
  if (ADMIN_EMAILS.includes(email)) userData.role = "admin";

  // Create new user and set password
  const user = new User(userData);
  await user.setPassword(password);

  try {
    await user.save();
  } catch (err) {
    throw err;
  }

  // Queue welcome email (non-blocking on purpose)
  try {
    const html = `<p>Hi, ${user.fullName.split(" ")[0]}</p>
      <p>Welcome to Darte — your account has been created successfully.</p>
      <p>You can now log in and explore products.</p>`;
    const text = `Hi, ${user.fullName.split(" ")[0]}\n\nWelcome to Darte — your account has been created successfully.\n\nYou can now log in and explore products.`;
    queueMail({ to: user.email, subject: "Welcome to Darte", html, text });
  } catch (emailErr) {
    console.warn(
      "Failed to queue welcome email for new user:",
      emailErr && emailErr.message ? emailErr.message : emailErr,
    );
  }
}
async function login({ email, password }) {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Invalid Credentials");

  const match = await user.validatePassword(password);
  if (!match) throw new Error("Invalid Credentials");

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profilePictureKey: user.profilePictureKey,
    favoriteProducts: user.favoriteProducts,
  };
}
async function forgotPassword(email) {
  const user = await User.findOne({ email: email });
  if (!user) {
    return;
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await Otp.deleteMany({ email: email });

  const otp = new Otp({
    user: user._id,
    email: email,
    code,
    expiresAt,
  });

  await otp.save();

  const emailContent = `
    <p>Hello ${user.fullName || "User"},</p>
    <p>You requested a password reset for your Darte account. Use the code below to reset your password:</p>
    <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
      <h1 style="color: #24b819; font-size: 32px; margin: 0; letter-spacing: 4px;">${code}</h1>
    </div>
    <p><strong>This code expires in 10 minutes.</strong></p>
    <p>If you didn't request this password reset, please ignore this email.</p>
  `;

  const mailOptions = {
    to: email,
    subject: "Darte - Password Reset Code",
    html: emailContent,
    text: `Hello ${user.fullName || "User"},\n\nYour password reset code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
  };

  try {
    // Send password reset immediately rather than queueing
    const result = await sendMail(mailOptions);
  } catch (err) {
    console.warn("Failed to send email:", err.message);
    throw new Error("Failed to send email");
  }
}

async function resetPassword(email, code, newPassword) {
  try {
    const invalidOtpError = "Invalid or Expired Otp";

    const otp = await Otp.findOne({ email, code });
    if (!otp) throw new Error(invalidOtpError);

    const user = await User.findById(otp.user);
    if (!user) throw new Error(invalidOtpError);

    await user.setPassword(newPassword);
    await user.save();
  } catch (err) {
    throw err;
  }
}

async function uploadProfilePicture() {}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  uploadProfilePicture,
};
