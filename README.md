[README (1).md](https://github.com/user-attachments/files/29677207/README.1.md)
# 📚 CloudShop

CloudShop is a full-stack e-commerce web app for browsing and buying tech books (AWS, Docker, Kubernetes, React, and more). It has a React frontend and a Node.js/Express + MongoDB backend, with user authentication, a shopping cart, wishlist, and order history.

## ✨ Features

- **Book catalog** — browse books by category (Cloud, DevOps, Frontend, etc.), view details, ratings, and stock
- **Search & categories** — dedicated categories page with per-category counts
- **Cart & wishlist** — add/remove books, adjust quantities, save favorites for later
- **Checkout** — order summary and checkout flow
- **Authentication** — register/login with hashed passwords (bcrypt) and JWT-based sessions
- **Order history** — logged-in users can view their past orders
- **Protected routes** — profile and order pages are only accessible when logged in
- **Responsive UI** — built with React, React Router, and Framer Motion animations

## 🛠 Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM 7
- Axios (API calls)
- Framer Motion (animations)
- React Icons, React Toastify

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs (password hashing)
- CORS, dotenv

## 📂 Project Structure

```
CloudShop/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/      # Auth & order logic
│   ├── models/            # Mongoose schemas (User, Order)
│   ├── routes/            # Express routes (/api/auth, /api/orders)
│   └── server.js          # App entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── assets/books/   # Book cover images
        ├── components/    # Navbar, ProductCard, CartItem, route guards, etc.
        ├── context/        # Auth, Cart, and Wishlist context providers
        ├── data/books.js   # Book catalog data
        ├── pages/          # Home, Books, BookDetails, Cart, Checkout, Login, etc.
        └── App.jsx         # Route definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (e.g. from MongoDB Atlas)

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd CloudShop

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

Create a `backend/.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ **Never commit your `.env` file.** It's already listed in `.gitignore` — keep it that way, and rotate any credentials that may have been shared or committed previously.

### 3. Run the backend

```bash
cd backend
npm run dev     # starts with nodemon
# or
npm start
```

The API will run at `http://localhost:5000` by default.

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

The app will be available at the URL Vite prints (typically `http://localhost:5173`).

> **Note:** `frontend/src/api/api.js` currently points `baseURL` at a hardcoded IP address. Update this to `http://localhost:5000` (or your deployed backend URL) as needed, ideally via an environment variable.

## 📡 API Endpoints

| Method | Endpoint              | Description                    |
|--------|------------------------|---------------------------------|
| POST   | `/api/auth/register`   | Register a new user            |
| POST   | `/api/auth/login`      | Log in and receive a JWT        |
| POST   | `/api/orders`          | Create a new order              |
| GET    | `/api/orders/:userId`  | Get all orders for a user       |

## 📝 License

ISC
