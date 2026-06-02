# 📚 ShopSphere Documentation

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment Guide](#deployment-guide)

---

## Architecture Overview

ShopSphere follows a standard MERN stack architecture:

```
┌─────────────┐     HTTP/REST     ┌─────────────┐     Mongoose     ┌─────────────┐
│   React     │ ◄──────────────►  │   Express   │ ◄──────────────► │   MongoDB   │
│   (Vite)    │    Axios/Fetch    │   (Node.js) │    ODM Queries   │   (Atlas)   │
│   :3000     │                   │   :5000     │                   │             │
└─────────────┘                   └─────────────┘                   └─────────────┘
     │                                  │
     │ Tailwind CSS                     │ JWT Auth
     │ React Router                     │ Multer (uploads)
     │ Context API                      │ bcryptjs
```

## API Documentation

Refer to the [README.md](../README.md#-api-endpoints) for a complete list of API endpoints.

## Database Schema

### Users Collection
- `name`, `email`, `password` (hashed), `role`, `avatar`, `phone`, `address`

### Products Collection
- `name`, `description`, `price`, `images[]`, `category`, `brand`, `stock`, `reviews[]`, `averageRating`, `numReviews`, `featured`

### Orders Collection
- `user`, `orderItems[]`, `shippingAddress`, `paymentMethod`, `paymentResult`, `itemsPrice`, `taxPrice`, `shippingPrice`, `totalPrice`, `isPaid`, `isDelivered`, `status`

### Categories Collection
- `name`, `description`, `image`

## Deployment Guide

> TODO: Add deployment instructions for platforms like Render, Vercel, Railway, etc.
