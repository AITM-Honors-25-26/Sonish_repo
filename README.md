# Vault — MongoDB Authentication Starter

A full-stack authentication project: Express + MongoDB (Mongoose) + Joi on the backend,
React (Vite) on the frontend, JWT stored in `localStorage`.

```
project/
├── backend/     Express API (controller → service → validator → route pattern)
└── frontend/    React (Vite) client
```

## Backend

**Structure**
```
backend/
├── .env                      # your local config (already filled with dev defaults)
├── .env.example               # template for others / production
└── src/
    ├── config/db.js           # MongoDB connection
    ├── models/user.model.js   # Mongoose schema, password hashing
    ├── validators/auth.validator.js  # Joi schemas
    ├── middleware/
    │   ├── validate.middleware.js    # runs Joi schema against req.body
    │   ├── auth.middleware.js        # verifies JWT, protects routes
    │   └── error.middleware.js       # centralized error handling
    ├── services/auth.service.js      # business logic + DB calls
    ├── controllers/auth.controller.js # req/res glue, calls the service
    ├── routes/auth.routes.js         # wires validator + controller together
    ├── app.js                        # Express app (middleware, routes)
    └── server.js                     # entry point, connects DB, starts server
```

**Setup**
```bash
cd backend
npm install
```

Edit `.env` if needed (defaults to a local MongoDB on `mongodb://127.0.0.1:27017/auth_db`).
If you use MongoDB Atlas, paste your connection string into `MONGO_URI`.

**Run**
```bash
npm run dev     # with nodemon, auto-restarts
# or
npm start
```

Server runs on `http://localhost:5000`.

**Endpoints**

| Method | Route              | Body                              | Auth required |
|--------|---------------------|------------------------------------|---------------|
| POST   | `/api/auth/register` | `{ name, email, password }`       | No            |
| POST   | `/api/auth/login`    | `{ email, password }`             | No            |
| GET    | `/api/auth/me`       | —                                  | Yes (Bearer token) |
| GET    | `/api/health`        | —                                  | No            |

Password rule (enforced by Joi): at least 8 characters, containing at least one letter and one number.

Every response follows the shape `{ success, message?, data?, errors? }`.

## Frontend

**Structure**
```
frontend/
├── .env                        # VITE_API_URL points at the backend
└── src/
    ├── api/auth.js              # axios instance + register/login/me calls
    ├── context/AuthContext.jsx  # holds user + token, exposes login/register/logout
    ├── components/
    │   ├── ProtectedRoute.jsx   # redirects to /login if not authenticated
    │   └── VaultDial.jsx        # decorative dial visual
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   └── Dashboard.jsx        # protected page shown after login
    └── styles/                  # global.css, auth.css, dashboard.css
```

**Setup**
```bash
cd frontend
npm install
```

**Run**
```bash
npm run dev
```

App runs on `http://localhost:5173` and talks to the backend at the URL set in `frontend/.env`.

## How auth works

1. **Register** — client posts `{ name, email, password }`. Joi validates the shape on the
   server, the password is hashed with bcrypt before saving, and a JWT is returned.
2. **Login** — client posts `{ email, password }`. Server compares the hashed password and
   returns a JWT on success.
3. The frontend stores the JWT in `localStorage` and attaches it as
   `Authorization: Bearer <token>` on every subsequent request via an axios interceptor.
4. **Protected routes** (`GET /api/auth/me`) run through `auth.middleware.js`, which verifies
   the JWT and attaches `req.userId`.
5. **Logout** simply clears the token from `localStorage` — since this is a stateless JWT
   setup, there's nothing to invalidate server-side.

## Next steps you may want

- Add refresh tokens if you need silver-bullet long sessions without re-login.
- Add email verification / password reset flows (same controller → service → validator pattern).
- Swap `localStorage` for an httpOnly cookie if you want protection against XSS token theft.
- Add a `role` field to the user model plus role-based middleware if you need authorization tiers.
