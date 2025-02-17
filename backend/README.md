# Backend - NestJS + PostgreSQL + Prisma

## 🚀 Overview
Backend API for Menu Management System built with:
- **NestJS**
- **PostgreSQL**
- **Prisma**

## 📌 Important Links
- **Live API**: https://menu-managment-system-8a9y.onrender.com/api
- **GitHub**: https://github.com/wondwosen-bewketu/Menu-Managment-System
- **API Documentation**: https://menu-managment-system-8a9y.onrender.com/api

## ⚙️ Setup
1. **Install dependencies**  
   
      npm install
   

2. **Environment variables**  
   
      # Application Configuration
      APP_NAME=Menu Management API
      PORT=3000
      NODE_ENV=development

      # Database Configuration
      DATABASE_URL=postgresql://username:password@localhost:5432/database_name
      # CORS Configuration
      CORS_ORIGIN=*
      CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
      CORS_ALLOWED_HEADERS=Content-Type, Authorization   

3. **Run migrations & start**  
   
      npx prisma migrate dev
      npm run start:dev
   
