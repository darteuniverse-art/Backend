const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./modules/auth/auth.routes");
const sellerRouter = require("./modules/seller/seller.routes");
const adminRouter = require("./modules/admin/admin.routes");
const productRouter = require("./modules/products/products.routes");
const paymentsRouter = require("./modules/payments/payments.routes");
const cartRouter = require("./modules/cart/cart.routes");
const ordersRouter = require("./modules/orders/orders.routes");

const app = express();




// Basic express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1); 
// CORS configuration 
app.use(cors());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // MongoStore for session persistence in db
    store: MongoStore.default.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'sessions'
    }),
    cookie: { 
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    },
  })
);

app.set("trust proxy", true);

// Health check endpoints
app.get("/health", (req, res) => {
  const mongooseConnected = mongoose.connection.readyState === 1;
  res.status(mongooseConnected ? 200 : 503).json({
    status: mongooseConnected ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    mongodb: mongooseConnected ? "connected" : "disconnected",
  });
});

app.get("/healthz", (req, res) => {
  const mongooseConnected = mongoose.connection.readyState === 1;
  res.status(mongooseConnected ? 200 : 503).json({
    status: mongooseConnected ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    mongodb: mongooseConnected ? "connected" : "disconnected",
  });
});

// Route routers
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);


module.exports = app;
