---

# 🤖 AIQS – Share & Discover AI Prompts

A full-stack web application built using **Next.js, MongoDB, Zustand, TailwindCSS, and Google OAuth** that allows users to **create, share, and explore AI prompts**.

Think of it like Instagram — but instead of photos, people post their **best AI prompts** to help others unlock creativity.

> "Prompts are the new code. Share yours, learn from others."

---

## 🚀 Features

* 🔑 Google OAuth Login & Profile Creation
* ✍️ Create and share AI prompts
* 👀 Explore prompts shared by others
* 🧑‍🤝‍🧑 View user profiles and their shared prompts
* ✏️ Update your prompts anytime
* 🗑️ Delete prompts you no longer want to share
* ⚡ Zustand-powered instant state updates (no reload needed)

---

## 🧱 Tech Stack

### 💻 Frontend – Next.js (v13+)

* Next.js App Router
* TailwindCSS for styling
* Zustand for global state management
* React Hooks & Components

### 🧠 Backend – Next.js API Routes

* Built-in API routes (no separate server)
* MongoDB with Mongoose ODM
* Google OAuth for authentication
* Secure session handling

### ☁️ Others

* MongoDB Atlas (Cloud DB)
* NextAuth.js (Google OAuth integration)
* Vercel (Deployment-ready)

---

## 🏗️ Folder Structure

### Project Root

```
AIQS/
├── src/
|   ├── app/                 # Next.js app directory (pages, API routes, etc.)
|   ├── assets/              # Static assets
|   ├── components/          # Reusable UI components
|   ├── store/               # Zustand stores
|   ├── models/              # Mongoose models
|   └── utils/               # DB connection & auth helpers
|
├── public/                  # Static SEO assets
```

---

---

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a **OAuth Client ID**.
   - Application type: **Web Application**  
   - Authorized redirect URI:  
     ```
     http://localhost:3001/api/auth/callback/google
     ```
     (Replace port if needed)
3. Copy your `Client ID` and `Client Secret`.

---

## 🧪 Running the App Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/AIQS.git
cd AIQS
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env.local` file in the root:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Must match your running app URL
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_random_secret_string

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
````

### 4️⃣ Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📸 Screenshots

> *(Add some UI shots of the feed, profile page, and prompt creation modal here)*

---

## 🧠 Future Enhancements

* ✅ Like & comment on prompts
* ✅ Save favorite prompts
* ✅ Dark mode toggle
* ✅ AI-powered prompt recommendations

---

## 🧑‍💻 Author

**Uttam** – *Full-Stack Developer | Dreamer | Imaginator*
📫 Connect on [LinkedIn](https://www.linkedin.com/in/uttam172)
🐙 GitHub: [uttam172](https://github.com/uttam172)

---

## 🏁 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🌍 Show Your Support!

If you like this project:

* ⭐ Star it on GitHub
* 🐛 Submit an issue if you find a bug
* 🔥 Fork it and build your own

> *“Prompts are the new superpower. Let’s share and grow together.”* 🙌

---
