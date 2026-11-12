# CollabFlow API

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

A REST API with real-time chat that helps small teams organise **projects** and **tasks** in one place.

Built in September 2025 during my web development internship at **Bénin Codeurs** (App Forge), to practise backend architecture on the MERN stack.

## Why

Small teams often juggle tasks across chats and spreadsheets. CollabFlow provides a single backend where members create projects, attach prioritised tasks with due dates, and talk in a per-project chat room in real time.

## Features

- **Authentication**: register and log in with bcrypt-hashed passwords and JWT (1h expiry)
- **Role-based access**: `member` / `admin`. Only admins can delete projects and tasks.
- **Projects**: create, list, update, delete (cascades to the project's tasks), and fetch a project with its tasks
- **Tasks**: status (`a faire`, `en cours`, `terminer`), priority (`basse`, `moyenne`, `haute`), due date
- **Filtering & sorting**: `GET /api/tasks?status=en cours&priority=haute&sortBy=createdAt&order=desc`
- **Real-time chat**: Socket.io rooms per project, with a ready-to-use test client (`chat.html`)

## Tech stack

| Layer | Tools |
|---|---|
| Runtime | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens, bcryptjs |
| Real-time | Socket.io |
| Quality | ESLint 9 |

## Project structure

```
├── index.js            # HTTP server, routes, Socket.io events
├── config/db.js        # MongoDB connection
├── controllers/        # Business logic (auth, projects, tasks)
├── middleware/         # JWT auth + admin-only guard
├── models/             # Mongoose schemas (User, Project, Task)
├── routes/             # Express routers
├── utils/              # JWT generation
└── chat.html           # Minimal browser client for the real-time chat
```

## Getting started

### Prerequisites
- Node.js 18+
- A MongoDB database (local `mongod` or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Installation

```bash
git clone https://github.com/Harry06-X/BC_APP-FORGE_Collabflow.git
cd BC_APP-FORGE_Collabflow
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev            # or: npm start
```

The API runs on `http://localhost:5000` by default.

### Environment variables

| Variable | Description |
|---|---|
| `PORT` | HTTP port (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign tokens. Generate one with `openssl rand -hex 32`. |

## API reference

Routes marked 🔒 require an `Authorization: Bearer <token>` header. Routes marked 👑 also require the `admin` role.

### Auth
| Method | Route | Body |
|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` → returns `token` |

New accounts are always `member`. To promote an admin, update the user in the database: `db.users.updateOne({ email: "..." }, { $set: { role: "admin" } })`.

### Projects
| Method | Route | Notes |
|---|---|---|
| GET | `/api/projects` | List projects |
| GET | `/api/projects/:id` | Project and its tasks |
| POST | `/api/projects` 🔒 | `{ title, description }` |
| PUT | `/api/projects/:id` 🔒 | `{ title, description }` |
| DELETE | `/api/projects/:id` 🔒👑 | Also deletes the project's tasks |
| GET | `/api/projects/:projectId/tasks` | Tasks of a project |
| POST | `/api/projects/:projectId/tasks` 🔒 | `{ title, description, status?, priority?, dueDate? }` |

### Tasks
| Method | Route | Notes |
|---|---|---|
| GET | `/api/tasks` | Filters: `status`, `priority`, `projectId`; sorting: `sortBy`, `order=asc\|desc` |
| GET | `/api/tasks/project/:projectId` | Tasks of a project |
| POST | `/api/tasks/:projectId` 🔒 | Same body as above |
| PUT | `/api/tasks/:id` 🔒 | `{ title, status }` |
| DELETE | `/api/tasks/:id` 🔒👑 | |

### Example

```bash
# Log in and keep the token
TOKEN=$(curl -s -X POST localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"secret123"}' | jq -r .token)

# Create a project
curl -X POST localhost:5000/api/projects \
  -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Website redesign","description":"Q1 marketing site"}'
```

## Real-time chat

| Event | Direction | Payload |
|---|---|---|
| `joinProject` | client → server | `projectId` |
| `sendMessage` | client → server | `{ projectId, user, message }` |
| `receiveMessage` | server → room | `{ user, message, time }` |

To try it, start the server and open `chat.html` in two browser tabs. Join the same project ID in both tabs and chat between them.

## Roadmap

- [ ] Request validation (e.g. `express-validator`) with proper 400 responses
- [ ] Automated tests (Jest + Supertest)
- [ ] Assign tasks to users and restrict project access to members
- [ ] Authenticate Socket.io connections with the JWT
- [ ] React front end

## Author

**Harry Sègnon HOUNSOU**: Computer Science student at Epitech Cotonou
[LinkedIn](https://www.linkedin.com/in/harry-hounsou/) · [GitHub](https://github.com/Harry06-X)
