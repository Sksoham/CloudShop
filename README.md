[README (2).md](https://github.com/user-attachments/files/29677286/README.2.md)
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

## ☁️ AWS Deployment

CloudShop is deployed on AWS using a scalable, self-healing architecture:

- **Amazon Machine Image (AMI)** — a custom AMI is baked with Node.js, the app dependencies, and a process manager (e.g. PM2) pre-installed, so new instances boot ready to serve traffic.
- **Launch Template** — defines the instance configuration (AMI, instance type, key pair, security groups, user data script) used to launch new EC2 instances consistently.
- **Auto Scaling Group (ASG)** — launches and manages EC2 instances from the Launch Template across multiple Availability Zones, scaling out/in based on demand (e.g. CPU utilization) and automatically replacing unhealthy instances.
- **Application Load Balancer (ALB)** — distributes incoming HTTP(S) traffic across the healthy instances in the ASG, performs health checks, and is the single entry point for the application.
- **Amazon EC2** — the underlying virtual machines running the Node.js/Express backend (and optionally the built frontend, if served from the same instances).

### Architecture Flow

```
                 ┌───────────────────────┐
   Users  ─────► │  Application Load     │
                 │  Balancer (ALB)       │
                 └───────────┬───────────┘
                             │  health checks + routing
                             ▼
                 ┌───────────────────────┐
                 │  Auto Scaling Group   │
                 │  (Launch Template)    │
                 ├───────────┬───────────┤
                 ▼           ▼           ▼
              EC2 #1       EC2 #2      EC2 #N
             (from AMI)  (from AMI)  (from AMI)
                             │
                             ▼
                    MongoDB (Atlas / external)
```

### Deployment Steps (high level)

1. **Build/prepare the app**
   - Backend: `cd backend && npm install --production`
   - Frontend: `cd frontend && npm install && npm run build` (deploy the `dist/` output to a static host, e.g. S3/CloudFront, or serve it from the EC2 instances alongside the API)

2. **Create the AMI**
   - Launch a base EC2 instance (e.g. Amazon Linux 2023 or Ubuntu).
   - Install Node.js, clone/copy the app, install dependencies, and configure environment variables (`.env` or, preferably, AWS Systems Manager Parameter Store / Secrets Manager).
   - Set up the app to run under a process manager (e.g. `pm2 start server.js` with `pm2 startup`) so it restarts on boot/crash.
   - Create an AMI from this configured instance (EC2 → Actions → Image → Create Image).

3. **Create a Launch Template**
   - Select the custom AMI, instance type, key pair, security group (allow inbound HTTP/HTTPS from the ALB, and SSH restricted to your IP), and IAM instance profile.
   - Add a user data script if you need to pull the latest code/config at boot instead of baking everything into the AMI.

4. **Create the Auto Scaling Group**
   - Attach it to the Launch Template.
   - Configure desired/min/max capacity, and spread instances across multiple subnets/Availability Zones for high availability.
   - Define scaling policies (e.g. target tracking on average CPU utilization).
   - Attach the ASG to the ALB's target group so new instances are automatically registered.

5. **Create the Application Load Balancer**
   - Create a target group pointing at the app's port (e.g. 5000) with a health check path (e.g. `/`, which returns the "CloudShop Backend is Running Successfully!" message).
   - Create the ALB (internet-facing), attach listeners (HTTP/HTTPS), and route traffic to the target group.
   - (Optional) Attach an ACM certificate to the ALB listener for HTTPS, and put a Route 53 domain in front of it.

6. **Point the frontend at the ALB**
   - Update `frontend/src/api/api.js`'s `baseURL` to the ALB's DNS name (or your custom domain) instead of a hardcoded instance IP, so the frontend keeps working as instances scale in/out.

> ⚠️ As with local development, never bake real secrets (`MONGO_URI`, `JWT_SECRET`) directly into a public AMI or repo — use environment variables injected at boot via user data, or a secrets manager.

## 📝 License

ISC
