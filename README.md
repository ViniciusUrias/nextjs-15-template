# Better-Auth Template Project

A ready-to-use authentication template powered by Better-Auth with SQLite integration.

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in your project root with:

```bash
BETTER_AUTH_SECRET='your-secret-generated-from-better-auth-site'
```

> **Note:** Replace `your-secret-generated-from-better-auth-site` with your actual secret from [Better-Auth](https://better-auth.dev) settings.

### 3. Initialize Database

Generate the SQLite schema:

```bash
npm run db
```

### 4. Start Development Server

Start the development server:

```bash
npm run dev
```

### 5. Navigate to the Sign-Up Page

Open your browser and go to:

```
http://localhost:3000/sign-up
```

### 6. Create a User

Fill out the sign-up form with a new email and password to create your user account.

### 7. Authenticate with Your User

After signing up, you can log in using the same credentials at:

```
http://localhost:3000/sign-in
```

Once signed in, you’ll receive an authentication token (via cookies or headers depending on configuration), which can be used to access protected routes or APIs.

---

## 📝 Notes

- This project uses **SQLite** for demonstration purposes.
- For production, refer to the [Better-Auth documentation](https://better-auth.dev/docs) to integrate with PostgreSQL, MySQL, or any other supported database and customize your authentication flow.
- You can also extend the setup with OAuth providers, magic links, 2FA, and more using Better-Auth’s modular approach.

