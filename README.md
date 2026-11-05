# 🏋️ Gym Membership Management System

A web-based **Gym Membership Management System** developed using **HTML, CSS, JavaScript, Node.js, Express.js, and MySQL**. The system helps manage gym members, membership plans, trainers, and member enrollments through a simple and user-friendly interface.

## 📌 Project Overview

The Gym Membership Management System is designed to digitally manage the basic operations of a gym.

Instead of maintaining member information manually, the system provides a centralized database for storing and managing:

- 👤 Gym members
- 💳 Membership plans
- 🏋️ Trainers
- 📅 Membership enrollments
- ⏳ Membership expiry
- ✅ Active and expired memberships

## 🚀 Features

### 👤 Member Management
- Add new gym members
- View member details
- Store name, email, phone number, joining date, and status
- Manage active/inactive members

### 💳 Membership Plans
- View available membership plans
- Store plan name and duration
- Store membership fees

### 🏋️ Trainer Management
- View trainers
- Store trainer specialization
- Store trainer contact information

### 📅 Enrollment Management
- Assign membership plans to members
- Assign trainers to members
- Store membership start and expiry dates
- Automatically determine whether a membership is **Active** or **Expired**

### 📊 Dashboard
- Display gym management information
- View members, plans, trainers, and enrollments
- Simple and responsive user interface

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MySQL | Database management |
| mysql2 | MySQL connection |
| CORS | Cross-origin API requests |
| dotenv | Environment variable management |
| VS Code | Development environment |

## 📂 Project Structure

```text
Gym-Management-System/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🗄️ Database

The project uses a MySQL database named:

```text
gym_management
```

### Tables

```text
members
membership_plans
trainers
enrollments
```

### Members

Stores gym member information such as:

- Member ID
- Name
- Email
- Phone
- Join Date
- Status

### Membership Plans

Stores:

- Plan ID
- Plan Name
- Duration
- Fee

### Trainers

Stores:

- Trainer ID
- Trainer Name
- Specialization
- Phone

### Enrollments

Stores:

- Enrollment ID
- Member ID
- Plan ID
- Trainer ID
- Start Date
- Expiry Date

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/saifullah51/Gym-Management-System.git
```

Navigate to the project folder:

```bash
cd Gym-Management-System
```

### 2. Install Dependencies

```bash
npm install
```

The project uses:

```text
express
mysql2
cors
dotenv
```

### 3. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE gym_management;
```

Create the required tables and insert the required data using the SQL setup provided with the project.

### 4. Configure Environment Variables

Create a `.env` file in
