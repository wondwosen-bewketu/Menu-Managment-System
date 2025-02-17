# Menu Management System

A full-stack application for managing hierarchical menus with frontend and backend components.

## Frontend
- Next.js 14
- React
- Redux

## Backend
- NestJS
- PostgreSQL
- Prisma.js

## Quick Start

### Clone Repository

git clone https://github.com/wondwosen-bewketu/Menu-Managment-System.git
cd Menu-Managment-System


### Frontend Setup
1. Install dependencies:

npm install


2. Create `.env`:

NEXT_PUBLIC_API_BASE_URL=https://menu-managment-system-8a9y.onrender.com/api


3. Run frontend:

npm run dev


### Backend Setup
1. Install dependencies:

npm install


2. Setup database in `.env`:

DATABASE_URL=postgresql://root:uF3Ojh0bRMWkiHuaU86QlTYh1XJ5MzTg@dpg-cup1orqj1k6c739eti90-a.oregon-postgres.render.com/test_database_p6sc


3. Run migrations:

npx prisma migrate deploy


4. Start backend:

npm run start


## API Documentation
Access Swagger UI at: `https://menu-managment-system-8a9y.onrender.com/api`
