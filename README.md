<div align="center">

# 🎓 CampusPulse
**Clubs & Events Management System**

A modern, comprehensive full-stack platform designed to streamline campus club registrations, event management, and student engagement. 

![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

---

## 🌟 Overview

**CampusPulse** bridges the gap between campus organizations and students. It provides a centralized hub where administrators can manage club activities, club leaders can host events, and students can discover and participate in campus life dynamically.

Built with performance, security, and a premium user experience in mind, this application features a **Java Spring Boot backend** seamlessly integrated with a highly responsive, modern **React frontend**.

---

## ✨ Key Features

- 🔐 **Secure Authentication:** Role-based access control (Admin, Club Leader, Student) powered by JWT (JSON Web Tokens) and Spring Security.
- 🏢 **Club Management:** Explore, join, and create campus clubs. Dedicated portals for club leaders to manage members.
- 📅 **Event Scheduling & Registration:** Create detailed events, set RSVP limits, and track student attendance in real time.
- 🎨 **Premium UI/UX:** A stunning, fully responsive interface powered by **Tailwind CSS** with smooth micro-animations using **Framer Motion**.
- 📊 **Dynamic Dashboards:** Real-time data visualization and activity feeds for quick insights into campus happenings.
- 🛡️ **Robust Data Protection:** Passwords securely hashed with **BCrypt**, and robust backend validation pipelines.

---

## 💻 Technology Stack

This project was developed adhering to modern industry standards.

### 🎨 Frontend
- **Framework:** React 19 (managed via Vite)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS + Autoprefixer + PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios (for API communication)

### ⚙️ Backend
- **Core:** Java 17 + Spring Boot 3.2.4
- **Security:** Spring Security + JSON Web Tokens (jjwt 0.12.5) + BCrypt
- **ORM & Data Access:** Spring Data JPA + Hibernate
- **Boilerplate Reduction:** Lombok
- **Validation:** Spring Boot Starter Validation

### 🗄️ Database
- **Primary Database:** MySQL
- **Driver:** MySQL Connector/J

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- **Node.js** (v18+ recommended)
- **Java JDK 17**
- **Maven**
- **MySQL Server**

### 1️⃣ Database Setup
1. Open your MySQL client.
2. Create a new database for the project (e.g., `campuspulse_db`).
3. Update the `application.properties` or `application.yml` file in the backend directory with your database root credentials and database name.

### 2️⃣ Backend Setup (Spring Boot)
```bash
# Navigate to the backend directory
cd backend

# Clean and install dependencies using Maven
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```
*The backend server will typically start on `http://localhost:8080`.*

### 3️⃣ Frontend Setup (React/Vite)
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install package dependencies
npm install

# Start the Vite development server
npm run dev
```
*The React application will be accessible at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
CampusPulse/
├── backend/               # Spring Boot Application
│   ├── src/main/java/     # Java Source Code (Controllers, Models, Services, Security)
│   ├── src/main/resources/# Configuration (application.properties, static assets)
│   └── pom.xml            # Maven Configuration & Dependencies
│
├── frontend/              # React Application
│   ├── src/               # UI Components, Pages, Context, Hooks, Utils
│   ├── public/            # Public Assets
│   ├── package.json       # Node Dependencies & Scripts
│   ├── tailwind.config.js # Tailwind Design System Configurations
│   └── vite.config.js     # Vite Bundler Settings
│
└── README.md              # Project Documentation
```

---

## 🛡️ Security Implementation
- **Stateless Sessions:** Leverages JWT for stateless session management to ensure scalability.
- **Password Hashing:** Utilizes BCrypt to securely store all user credentials in the database.
- **Route Protection:** 
  - *Frontend:* Protected API routes and component guards using React Router.
  - *Backend:* Endpoint-level authorization using Spring Security filter chains.

<br />

<div align="center">
  <i>Developed with ❤️ for the Campus Community</i>
</div>
