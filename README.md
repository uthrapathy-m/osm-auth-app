Here’s your complete and polished `README.md` for the GitHub repo of your full-stack login + landing page Docker Compose app:

---

### ✅ `README.md`

```markdown
# 🧠 OSM Auth App

A full-stack login + landing page app using:

- ⚙️ Node.js + Express backend (JWT-based authentication)
- 🎨 Static HTML + Tailwind CSS frontend
- 🍃 MongoDB for user storage
- 🐳 Docker Compose to run everything easily — no local installs required

---

## 📦 Features

- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ JWT token generation and localStorage-based login
- ✅ Elegant UI styled using TailwindCSS
- ✅ Landing page appears after login
- ✅ Entire app runs with a single Docker Compose command

---
```
## 📁 Folder Structure

```

osm-auth-app/
├── backend/           # Node.js Express API (port 5000)
├── frontend/          # Static HTML UI served via npx serve (port 3000)
├── docker-compose.yml # Docker Compose setup

````

---

## 🛠️ Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | HTML, TailwindCSS  |
| Backend    | Node.js, Express   |
| Database   | MongoDB            |
| Auth       | JWT, bcrypt        |
| DevOps     | Docker Compose     |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/uthrapathy-m/osm-auth-app.git
cd osm-auth-app
````

---

### 2. Build & Run the App

#### ✅ Recommended: Full Rebuild

```bash
docker-compose up --build -d
```
---

* Reuses volumes and image cache
* Faster for incremental testing

#### ⚙️ Optional: Clean Build and Start

```bash
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d
```

* Removes all containers, volumes, and cache
* Rebuilds everything fresh
* Starts services in background (detached mode)

---

### 3. Access the Application

| Service  | URL                                                      |
| -------- | -------------------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000)           |
| Backend  | [http://localhost:5000/auth](http://localhost:5000/auth) |
| Database | localhost:27017 (internal via `mongo`)                   |

---

## 🔐 Auth Flow

1. Users submit a username and password via the login page
2. If it’s a first-time user → auto-register and hash the password
3. If user exists → verify password using bcrypt
4. Issue a JWT token on success
5. Save token in `localStorage` and redirect to `landing.html`

---

## 🧪 Dev Commands

```bash
# View backend logs
docker-compose logs -f backend

# View all service logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and wipe everything
docker-compose down -v
```

---

## ❓ Troubleshooting

### Invalid ELF Header on bcrypt?

If you see:

```
Error: invalid ELF header in bcrypt_lib.node
```

You copied `node_modules` from your host into the container. Fix it:

* Add this to `backend/.dockerignore`:

  ```
  node_modules
  ```

Then rebuild with:

```bash
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d
```

