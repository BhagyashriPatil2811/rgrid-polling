# 🗳️ RGrid Live Polling System

A real-time election polling application built for the RGrid recruitment test.
Allows audience members to vote for nominees and displays live results to an admin dashboard using WebSockets.

---

## 🚀 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js, Chart.js, Socket.io     |
| Backend    | Node.js, Express.js, Socket.io    |
| Auth       | JWT (JSON Web Token)              |
| Real-time  | Socket.io (WebSockets)            |
| Storage    | In-Memory (No database required)  |
| DevOps     | Docker, Docker Compose            |

---

## 📁 Project Structure

rgrid-polling/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── nominees.js         # Default nominees (seeder)
│   │   ├── controllers/
│   │   │   ├── authController.js   # Admin login logic
│   │   │   └── pollController.js   # Vote + results logic
│   │   ├── middleware/
│   │   │   └── authMiddleware.js   # JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Auth endpoints
│   │   │   └── pollRoutes.js       # Poll endpoints
│   │   ├── socket/
│   │   │   └── socketHandler.js    # Real-time socket events
│   │   └── store/
│   │       └── pollStore.js        # In-memory data store
│   ├── .env.example
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── VoteCard.jsx        # Nominee vote card
│   │   │   ├── ResultChart.jsx     # Chart.js bar chart
│   │   │   └── ProtectedRoute.jsx  # Admin route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # Admin login page
│   │   │   ├── VotePage.jsx        # Public voting page
│   │   │   └── AdminPage.jsx       # Live admin dashboard
│   │   ├── services/
│   │   │   ├── api.js              # Axios API calls
│   │   │   └── socket.js           # Socket.io client
│   │   └── App.js                  # Routes setup
│   ├── .env.example
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

---

## ⚙️ Local Setup (Without Docker)

### Prerequisites
- Node.js v18+
- npm

### Step 1: Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/rgrid-polling.git
cd rgrid-polling
```

### Step 2: Setup Backend
```bash
cd backend

# Create environment file
cp .env.example .env

# Install dependencies
npm install

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Setup Frontend
```bash
# Open new terminal
cd frontend

# Create environment file
cp .env.example .env

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🐳 Docker Setup (With Docker)

### Prerequisites
- Docker Desktop installed and running
- WSL2 enabled (Windows)

### Step 1: Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/rgrid-polling.git
cd rgrid-polling
```

### Step 2: Run with Docker Compose
```bash
docker-compose up --build
```

### Step 3: Access the app
| Page            | URL                          |
|-----------------|------------------------------|
| Voting Page     | http://localhost             |
| Admin Login     | http://localhost/login       |
| Admin Dashboard | http://localhost/admin       |

### Stop the app
```bash
docker-compose down
```

---

## 👤 Default Credentials

| Role  | Username | Password |
|-------|----------|----------|
| Admin | admin    | admin123 |

---

## 🗳️ Default Nominees

| Symbol | Name          | Party             |
|--------|---------------|-------------------|
| 🌟     | Alice Johnson | Progressive Party |
| 🦅     | Bob Smith     | Liberty Party     |
| 🌿     | Carol White   | Green Party       |
| 🤝     | David Brown   | Unity Party       |
| ⭐     | Eva Martinez  | People's Party    |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint         | Description        | Access |
|--------|------------------|--------------------|--------|
| POST   | /api/auth/login  | Admin login        | Public |

### Poll
| Method | Endpoint            | Description              | Access    |
|--------|---------------------|--------------------------|-----------|
| GET    | /api/poll/nominees  | Get all nominees         | Public    |
| POST   | /api/poll/vote      | Cast a vote              | Public    |
| GET    | /api/poll/results   | Get results              | Admin     |

### Health
| Method | Endpoint  | Description       | Access |
|--------|-----------|-------------------|--------|
| GET    | /health   | Server health check | Public |

---

## ⚡ Real-time Flow
Audience votes
↓
POST /api/poll/vote
↓
In-memory store updated
↓
Socket.io emits "vote-updated" to admin-room
↓
Admin dashboard updates live

---

## 🔐 Security

- JWT token required for admin dashboard access
- Admin credentials stored in `.env` file
- One vote per session enforced via `sessionStorage` + server-side Set
- Socket.io admin room protected with JWT verification

---

## 📝 Notes

- All vote data is stored in-memory — resets on server restart (by design for this demo)
- Nominees are configured in `backend/src/config/nominees.js`
- No database required — zero setup friction for reviewers

---

## 👩‍💻 Author

Bhagyashri  
Full Stack Developer  
Built for RGrid Recruitment — Phase 1
