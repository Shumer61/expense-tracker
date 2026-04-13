# Expense Tracker

A full stack expense tracking application built with React, Node.js, Express, and MongoDB.

## Live Demo
- Frontend: https://expense-tracker-xi-eosin.vercel.app/
- Backend API: https://expense-tracker-biro.onrender.com/

## Features
- User registration and login with JWT authentication
- Add, view, and delete personal expenses
- Filter expenses by category
- Data persists in MongoDB — survives page refresh
- Every user's data is fully isolated

## Tech Stack
**Frontend**
- React (Vite)
- Context API for auth state
- Deployed on Vercel

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- Deployed on Render

## Project Structure
expense-tracker/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── server/          # Express backend
├── models/
├── routes/
└── middleware/
## Running Locally

**Backend**
```bash
cd server
npm install
npm run dev
```
Create a `.env` file in server/:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
**Frontend**
```bash
cd client
npm install
npm run dev
```
Create a `.env` file in client/:
VITE_API_URL=http://localhost:5000
## API Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login user | No |
| GET | /expenses | Get all expenses | Yes |
| POST | /expenses | Create expense | Yes |
| DELETE | /expenses/:id | Delete expense | Yes |

## Author
Ryan Shuma — [GitHub](https://github.com/Shumer61)