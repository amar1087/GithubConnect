# 🔗 GitHub Integration Dashboard (Fullstack)

This project is a complete fullstack application that allows users to connect their GitHub account, fetch repository-related data, and visualize it using an interactive dashboard. It consists of:

- A **Frontend** built in Angular with Angular Material and Ag-Grid
- A **Backend** built in Node.js with GitHub OAuth, MongoDB for persistence, and Express APIs

---

## ✨ Features

### 🚀 Frontend (Angular)
- GitHub connection panel with OAUTH/Auth app
- Dropdown filters (Integration, Entity type)
- Quick search box to filter repositories
- Ag-Grid table with pagination, sorting, filtering
- Full Import button to sync GitHub organization data

### 🔧 Backend (Node.js + Express)
- GitHub OAuth callback handler (`/callback`)
- Fetch and persist GitHub organization and repo data
- JWT-based session token generation
- APIs to fetch filtered data by repo, state, and type
- Delete all user and repo data with a single call

---

## 🗂 Project Structure

```bash
project-root/
│
├── frontend/
│   ├── home-page.ts         # Angular component logic
│   ├── home-page.html       # Angular template
│   ├── home-page.scss       # Component styles
│   └── home-page.spec.ts    # Component tests
│
├── backend/
│   ├── controllers/
│   │   └── githubController.js # Main API logic
│   ├── models/
│   │   ├── githubService.js
│   │   └── dbService.js
│   └── helpers/
│       └── githubOrgData.js   # Mongoose model
