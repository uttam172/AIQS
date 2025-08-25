
---

````markdown
# Next.js App with Google OAuth, MongoDB & Tailwind v4

This project integrates:

- **Google OAuth** login with [`next-auth`](https://next-auth.js.org/)  
- **MongoDB Atlas** for user storage  
- **TailwindCSS v4** with glassmorphism styling  

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

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Must match your running app URL
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_random_secret_string

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
````

---

## 📦 NextAuth + MongoDB Integration

`src/app/api/auth/[...nextauth]/route.js`

```js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/user2"
import { connectToDB } from "@/utils/database"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()
        const userExists = await User.findOne({ email: profile.email })
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
```

---

## 🗄️ Database Connection

`src/utils/database.js`

```js
import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "shared_prompt",
    })
    isConnected = true
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
  }
}
```

---

## 🎨 TailwindCSS v4 Setup

No `tailwind.config.js` is needed in Tailwind v4.
Instead extend theme in `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #1E40AF;
  --color-secondary: #9333EA;
  --color-accent: #F59E0B;

  --shadow-glass: inset 10px -50px 94px 0 rgba(199,199,199,0.2);

  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}
```

---

## ✨ Glassmorphism Class

`globals.css`

```css
.glassmorphism {
  @apply w-7 h-7 rounded-full bg-white/10 shadow-glass backdrop-blur flex justify-center items-center cursor-pointer;
}
```

Usage:

```jsx
<div className="glassmorphism">
  <svg className="w-4 h-4 text-white" />
</div>
```

---

## 🚀 Run Project

```bash
npm install
npm run dev
```

* Open [http://localhost:3001](http://localhost:3001)
* Click **Sign in with Google**
* On first login, user is stored in MongoDB.
* Session contains MongoDB `_id`.

---

## ✅ Common Issues

* `strictQuery` warning → fixed by removing deprecated Mongoose options.
* `MongoParseError: option usernewurlparser is not supported` → use only `dbName`, `useNewUrlParser`/`useUnifiedTopology` are no longer needed.
* Redirect URL mismatch → make sure **Google Console redirect URI** matches **NEXTAUTH\_URL/api/auth/callback/google**.

---
