# Tasks and Users REST API

A REST API built with Node.js, Express, and MongoDB.

## Setup

Requirements: Node.js 20 or later and MongoDB.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGO_URI` in `.env` to your MongoDB connection string. The default is `mongodb://127.0.0.1:27017/tasks_api`.

## Deploying to Render

The repository root contains `package.json`; the API setup and startup logic
are in `src/server.js`. In Render, leave **Root Directory** blank (the
repository root). Use `npm install` as the build command and `npm start` as
the start command. The included `render.yaml` configures these settings and
uses `/health` for health checks.

Set `MONGO_URI` in the Render service's environment variables to a reachable
MongoDB connection string, such as one from MongoDB Atlas. The local `.env`
file is not deployed.

## Endpoints

Successful resource responses use a `data` property, except for delete requests, which return `204 No Content`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Check that the API is responding |
| GET | `/api/tasks` | List tasks; optionally filter with `?completed=true` or `?completed=false` |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task with a required `title` and optional `description` |
| PATCH | `/api/tasks/:id` | Update `title`, `description`, or `completed` |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create a user |
| PATCH | `/api/users/:id` | Update user details |
| DELETE | `/api/users/:id` | Delete a user |

Example create request:

```json
{
  "title": "Write API documentation",
  "description": "Document the task endpoints"
}
```

Example user request:

```json
{
  "firstName": "Taylor",
  "lastName": "Morgan",
  "email": "taylor@example.com",
  "phone": "+1-555-0100",
  "age": 28
}
```

User emails are stored in lowercase and must be unique. User profiles do not include authentication or password storage.

Run the database-independent tests with `npm test`.