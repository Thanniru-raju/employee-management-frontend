# Employee Management System — Frontend (React + Vite)

Enterprise-grade, responsive user interface for managing employee records, built with **React 18**, **Vite**, and **Vanilla Modern CSS**.

---

## 🚀 Features

- **Dashboard Header**: Displays connection health to Spring Boot backend (`Connected` / `Disconnected`).
- **Live Workforce Metrics**: Real-time cards calculating Total Employees, Departments, Monthly Payroll, and Average Salary.
- **Search & Filtering**: Live debounced search across employee names, emails, departments, and job titles.
- **Data Table**: Clean tabular view with initials avatars, department-colored pill badges, and formatted compensation.
- **Add / Edit Modal**: Form with live field validation, regex email format checks, and positive salary constraints.
- **Duplicate Email Alert**: Inline alert banner when backend detects email collision.
- **View Details Modal**: Comprehensive employee profile breakdown with monthly compensation.
- **Delete Confirmation Modal**: Safe deletion with warning dialog.
- **Toast Notifications**: Auto-dismissing success/error feedback alerts.

---

## 🛠️ Tech Stack

- **React 18.3**
- **Vite 5.4**
- **Lucide React** (icons)
- **Vanilla CSS** (CSS variables, glassmorphism, responsive grid)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```properties
# Local development:
VITE_API_BASE_URL=http://localhost:8080/api/employees

# Production deployment (e.g., Vercel / Netlify):
# VITE_API_BASE_URL=https://your-backend-service.onrender.com/api/employees
```

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build
```
Frontend will be live at `http://localhost:5173`.
