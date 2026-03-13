# StoreFleet API

A Node.js + Express backend for a store management application with users, products, and orders.

## 🧩 Tech Stack

- Node.js (ESM syntax)
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Cookie-based sessions
- Email integration (Reset password and welcome mail)

## 📁 Project Structure

- `backend/`
  - `app.js` - Express app initialization and routing
  - `server.js` - server startup with DB connection
  - `config/`
    - `db.js` - MongoDB connect helper
    - `uat.env` - sample env vars
  - `middlewares/`
    - `auth.js` - protect routes, role checks
    - `errorHandlerMiddleware.js` - global error middleware
  - `src/`
    - `order/`
      - `controllers/` - business logic for orders
      - `model/` - order schema and repository
      - `routes/` - order endpoints
    - `product/` - product module with routes, controller, repository, schema
    - `user/` - user module with routes, controller, repository, schema
  - `utils/`
    - `errorHandler.js` - custom error classes + response helper
    - `sendToken.js` - JWT token generation & cookie attach
    - `emails/` - password reset and welcome email templates & sender

## ✅ Features

- User signup/login/logout
- Profile update
- Password reset flow (forget/password reset + update)
- Role-based access (`admin` vs `user`)
- Product CRUD + rating/review management
- Order create, view, update status
- Protected route middleware + centralized error handling

## 🔧 Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB (local or Atlas)

## 🚀 Installation

```bash
cd "backend"
npm install
```

## 🔐 Configuration

1. Copy `backend/config/uat.env` to `backend/.env`.
2. Update variables (based on app usage in code):
   - `PORT` (e.g. `3000`)
   - `mongoURI` (e.g. `mongodb://127.0.0.1:27017/storefleet`)
   - `JWT_Secret`
   - `JWT_Expire` (e.g. `1d`)
   - `COOKIE_EXPIRES_IN` (days)
   - `STORFLEET_SMPT_MAIL` (gmail or SMTP email)
   - `STORFLEET_SMPT_MAIL_PASSWORD` (app password)
   - `SMPT_SERVICE` (e.g., `gmail`)

## ▶️ Run

```bash
cd "backend"
npm start
```

or dev mode:

```bash
cd "backend"
npm run dev
```

## 🌐 Base URL

`http://localhost:<PORT>`

Default routes are mounted in `app.js`:

- `/api/storefleet/product`
- `/api/storefleet/user`
- `/api/storefleet/order`

## 📬 Authentication

- JWT token issued on login/signup
- Sent as HTTP-only cookie from `sendToken.js`
- `auth` middleware verifies and injects `req.user`
- `authByUserRole('admin')` protects admin routes

## 🪄 API Endpoints

### User routes (`/api/storefleet/user`)

- `POST /signup` - register new user
  - body: `{ name, email, password }`
- `POST /login` - login user
  - body: `{ email, password }`
- `GET /logout` - logout user
- `GET /details` - current profile (protected)
- `PUT /profile/update` - update profile (protected)
- `PUT /password/update` - change password (protected)
- `POST /password/forget` - send reset password email
  - body: `{ email }`
- `PUT /password/reset/:token` - reset password by token
  - body: `{ password, confirmPassword }`

Admin-only:

- `GET /admin/allusers`
- `GET /admin/user/:id`
- `PUT /admin/user/:id`
- `DELETE /admin/user/:id`

### Product routes (`/api/storefleet/product`)

- `GET /products` - list products
- `GET /details/:id` - get single product
- `GET /reviews/:id` - get product reviews
- `PUT /rate/:id` - rate product (protected)
- `DELETE /review/delete` - delete review (protected)
- `POST /add` - add product (admin)
- `PUT /update/:id` - update product (admin)

### Order routes (`/api/storefleet/order`)

- `POST /new` - create order (protected)
- `GET /:id` - get single order (protected)
- `PUT /update/:id` - update order status (protected)

## 🧪 Example curl flows

### Sign up

```bash
curl -X POST http://localhost:3000/api/storefleet/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"secure123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/storefleet/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secure123"}' \
  -c cookies.txt
```

### Get products (public)

```bash
curl http://localhost:3000/api/storefleet/product/products
```

### Create product (admin)

```bash
curl -X POST http://localhost:3000/api/storefleet/product/add \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","price":100,"stock":20}' \
  -b cookies.txt
```

## 🛡️ Error Handling

Global error middleware is in `backend/middlewares/errorHandlerMiddleware.js`, which uses `utils/errorHandler.js`.
