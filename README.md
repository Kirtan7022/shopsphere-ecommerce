# 🛒 ShopSphere E-Commerce

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application.

---

## 🚀 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | React + Vite + Tailwind CSS    |
| Backend    | Node.js + Express.js           |
| Database   | MongoDB + Mongoose             |
| Auth       | JWT (JSON Web Tokens)          |
| State      | React Context API              |
| HTTP       | Axios                          |

---

## 📁 Project Structure

```
shopsphere-ecommerce/
├── client/                 # React frontend (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API service functions
│   │   └── utils/          # Helper utilities
│   └── ...config files
│
├── server/                 # Express backend API
│   ├── config/             # DB & service configurations
│   ├── controllers/        # Route handler logic
│   ├── middleware/          # Auth, error, validation
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── utils/              # Utility functions
│   └── uploads/            # File uploads directory
│
├── docs/                   # Documentation
├── .env.example            # Environment variables template
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/chauhankirtan7022/shopsphere-ecommerce.git
cd shopsphere-ecommerce
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI and JWT secret.

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Run the Application

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📡 API Endpoints

### Auth
| Method | Endpoint              | Description         | Access  |
|--------|-----------------------|---------------------|---------|
| POST   | `/api/auth/register`  | Register user       | Public  |
| POST   | `/api/auth/login`     | Login user          | Public  |
| GET    | `/api/auth/profile`   | Get user profile    | Private |
| PUT    | `/api/auth/profile`   | Update profile      | Private |

### Products
| Method | Endpoint                    | Description         | Access        |
|--------|-----------------------------|---------------------|---------------|
| GET    | `/api/products`             | Get all products    | Public        |
| GET    | `/api/products/:id`         | Get single product  | Public        |
| POST   | `/api/products`             | Create product      | Admin         |
| PUT    | `/api/products/:id`         | Update product      | Admin         |
| DELETE | `/api/products/:id`         | Delete product      | Admin         |
| POST   | `/api/products/:id/reviews` | Add review          | Private       |

### Orders
| Method | Endpoint                  | Description         | Access  |
|--------|---------------------------|---------------------|---------|
| POST   | `/api/orders`             | Create order        | Private |
| GET    | `/api/orders/my-orders`   | Get my orders       | Private |
| GET    | `/api/orders/:id`         | Get order by ID     | Private |
| PUT    | `/api/orders/:id/status`  | Update order status | Admin   |

### Users (Admin)
| Method | Endpoint              | Description         | Access |
|--------|-----------------------|---------------------|--------|
| GET    | `/api/users`          | Get all users       | Admin  |
| GET    | `/api/users/:id`      | Get user by ID      | Admin  |
| DELETE | `/api/users/:id`      | Delete user         | Admin  |
| PUT    | `/api/users/:id/role` | Update user role    | Admin  |

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
