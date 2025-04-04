# 👵👴 Elder Bliss – Adult Care and Service Management System

A full-stack MERN application designed to manage adult care services including user and employee management, health records, reservations, packages, inventory, and real-time notifications. This system is tailored to support seamless interaction between guardians, adults, caregivers, and administrators.

---

## 📌 Project Overview

Elder Bliss is a role-based adult care system offering:

- Guardian-managed adult registrations
- Employee assignment (doctors, nurses, caregivers, drivers)
- Admin dashboard with full control
- Health records management (notes, prescriptions, reports)
- Package management and booking services
- Inventory tracking for medical supplies
- Notification system via Email/SMS
- Secure login, profile management, and access control

---

## 🧩 Modules & Responsibilities

| Module                             | Team Member   | Description                                                                                            |
|----------------------------------- |---------------|--------------------------------------------------------------------------------------------------------|
| 👤 **User Management**             | Kavindu      | Handles registration, login, role-based access, profile linking, user CRUD, and security middleware     |
| 📦 **Packages**                    | Savindi      | Manages care packages, including pricing, services, and custom package requests                         |
| 🏥 **Reservations & Payments**     | Leena        | Manages booking for care sessions (inpatient, therapy, consultations), cancellation logic, waitlisting  |
| 🧪 **Inventory Management**        | Samadhi      | Tracks medical supply stock, supplier links, and staff usage logs                                       |
| 🩺 **Health Records**              | Methmi       | Stores caregiver/doctor/nurse notes, prescriptions, and lab reports linked to adults                    |



⚙️ Technologies Used

- **Frontend:** React.js + MUI (Material UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **SMS Gateway:** (e.g., Twilio / placeholder)
- **Image Uploads:** Multer (to be integrated with cloud/local storage)
- **Security:** Role-based middleware, token validation



🚀 Key Features

- 🔐 Secure user authentication (Admin, Adult, Guardian, Employee)
- 👨‍⚕️ Employee management (doctor, nurse, caregiver, driver)
- 👥 Guardian-adult linking system with NIC verification
- 📣 Notification system (send to all/selected users by role)
- 🗂️ Admin dashboard to manage users, employees, notifications, logs
- 📅 Reservation & scheduling for care services
- 🧾 Health record entry (notes, prescriptions, lab reports)
- 📦 Package listing, creation, and user-side request forms
- 📊 Inventory with supplier-stock linking
- 🧠 Advanced access control per user type
- 📝 Security logs (planned) and audit trail


📁 Project Structure

