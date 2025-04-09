Assignment

````markdown
# Linkly - Micro SaaS Link Analytics Dashboard

A full-stack URL Shortener + Analytics Dashboard built with **React**, **Node.js**, and **MongoDB**. Users can shorten URLs, generate QR codes, and view analytics on link clicks, including location, browser/device stats, and more.

---

## Features

- Email/Password Authentication (JWT)
- Shorten long URLs with optional custom alias
- Expiration date support for short links
- Asynchronous analytics tracking (clicks, devices, IPs)
- Dashboard with:
  - Total clicks
  - Expiry status
  - Creation dates
  - Analytics charts
- QR Code generator for each link (Bonus)
- Pagination + Search (Bonus)

---

## Tech Stack

### Frontend

- React.js
- Redux Toolkit
- TailwindCSS
- Chart.js (via react-chartjs-2)
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Device Detector (user-agent)

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/linkly.git
cd linkly
```
````

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Make sure the backend runs on port `5000` and frontend on `5173`.

---

## Test Credentials

```json
{
	"email": "testuser1@example.com",
	"password": "Test123"
}
```

---

## API Testing (Postman)

### Register

`POST /api/auth/register`

```json
{
	"email": "testuser1@example.com",
	"password": "Test123"
}
```

### Login

`POST /api/auth/login`  
Returns JWT token.

---

### Create Short Link

`POST /api/links`  
**Headers:**  
`Authorization: Bearer <JWT_TOKEN>`

```json
{
	"originalUrl": "https://example.com",
	"customAlias": "mytest",
	"expiresAt": "2025-12-31T00:00:00Z"
}
```

---

### Redirect (Public)

`GET /mytest`  
Redirects to original URL and logs analytics.

---

### Get All Links (User)

`GET /api/links`  
**Headers:**  
`Authorization: Bearer <JWT_TOKEN>`

---

### ➤ Get Analytics for a Short Code

`GET /api/links/stats/mytest`  
**Headers:**  
`Authorization: Bearer <JWT_TOKEN>`

---

Update `CLIENT_URL` in `.env` accordingly for CORS.

---

## Developed By

**Anjali Kashyap**  
Internship Assignment for **Dacoid Digital**  
GitHub: [anjalikashyap9608](https://github.com/kashyapanjali)

---
