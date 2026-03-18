# DarteBackend

Modular Node.js backend for Darte, supporting user authentication, product management, orders, payments, notifications, and more.

## Tech Stack and Dependencies

- **Base Framework:** Express
- **Database:** MongoDB via mongoose
- **Rate Limit:** express-rate-limit
- **Cloud Storage:** S3 Compatible Cloudflare R2 Object Storage
- **Emails:** SendGrid
- **Payments:** Paystack

## Architecture Overview

- **Modular Structure:** Each domain (auth, products, orders, cart, payments, seller, admin, notifications) is a separate module with its own models, controllers (validation and sanitation of request bodies), services (for actual business logic), and routes (mapping endpoints to middleware and controllers).
- **MongoDB/Mongoose:** All data is stored in MongoDB, with Mongoose schemas for each model.
- **RESTful API:** Exposes endpoints for all major operations, with authentication and role-based access control.

## Module Relationships

- **User:** Central to the system. Users can be regular users, sellers, or admins.
  - Referenced by: Cart, Order, Seller, Payment, Notification
  - Has: `favoriteProducts` (array of Product references)

- **Product:** Created and managed by Sellers.
  - `sellerId` references Seller
  - Referenced by: Cart (as items), Order (as items)

- **Cart:** Each user has one cart.
  - `userId` references User
  - `items`: array of `{ productId (Product), quantity }`

- **Order:** Placed by a user, contains purchased products.
  - `userId` references User
  - `items`: array of `{ productId (Product), ... }`
  - Linked to Payment

- **Seller:** Linked to a User, manages products and receives orders.
  - `userId` references User

- **Payment:** Linked to an Order and User.
  - `userId` references User
  - `orderId` references Order

- **DiscountCode:** Used in orders for discounts.

- **Notification:** Linked to a User.
  - `userId` references User
  - Contains: `type`, `content`, `read`, `createdAt`

## Getting Started

1. Clone the repo and run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in your environment variables.
3. Start MongoDB and run `npm start` or `npm run dev`.

## Folder Structure

- `src/modules/` — All business logic, grouped by domain
- `src/shared/` — Shared libraries (mail, storage, middleware, etc.)
- `test/` — Tests
- `jobs/` — For scheduling background tasks