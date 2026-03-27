# Expense Tracker

A full stack web application for tracking personal expenses with AI-powered spending insights.

**Live Demo:** [link coming after deployment]  
**GitHub:** https://github.com/Shumer61/expense-tracker

---

## Features

- User authentication — register and login with JWT
- Add, view, and delete personal expenses
- Category filtering — food, transport, housing, entertainment, health
- Real-time spending total that updates automatically
- ***AI-powered monthly spending summary (Anthropic Claude) this is still in the works so a high idea with implementation set up already just not functional
- Fully responsive — works on mobile and desktop
- User data isolation — every user sees only their own expenses

---

## Tech Stack

**Frontend**
- React 18 with Vite
- Context API for state management
- Fetch API for HTTP requests

**Backend**
- Node.js and Express
- MongoDB with Mongoose
- JWT authentication with bcryptjs
- Anthropic Claude API for AI insights

**Tools**
- Git and GitHub for version control
- Thunder Client for API testing
- MongoDB Atlas for cloud database
- Render for backend deployment
- Vercel for frontend deployment

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Anthropic API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Shumer61/expense-tracker.git
cd expense-tracker
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Create a `.env` file in the server folder
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Install client dependencies
```bash
cd ../client
npm install
```

5. Run the application

In one terminal:
```bash
cd server
npm start
```

In another terminal:
```bash
cd client
npm run dev
```

6. Open http://localhost:5173

---

## Project Structure
```
expense-tracker/
├── server/
│   ├── middleware/
│   │   └── auth.js          # JWT protection middleware
│   ├── models/
│   │   ├── Expense.js       # Expense schema
│   │   └── User.js          # User schema
│   ├── routes/
│   │   ├── auth.js          # Register and login routes
│   │   ├── expenses.js      # CRUD routes for expenses
│   │   └── summary.js       # AI summary route
│   ├── db.js                # MongoDB connection
│   └── index.js             # Server entry point
├── client/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Login and Register pages
│   │   └── App.jsx          # Root component
└── README.md
```

---

## What I Learned

- Building a complete REST API with Express and MongoDB
- Implementing JWT authentication from scratch
- Managing global state in React with Context API
- Connecting a React frontend to a Node.js backend
- Securing routes with middleware
- Integrating the Anthropic Claude API for AI features
- User data isolation at the database query level

---

## What I Would Improve

- Add expense editing functionality
- Add date range filtering
- Add spending charts and visualisations
- Implement refresh tokens for better security
- Add pagination for large expense lists

---

*Built by me, Ryan Shuma — Full Stack Developer based in Nairobi, Kenya*