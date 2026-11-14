# EduTech Impact - Social Development Events Platform

**Live Website Link:** [ https://edutech-server-1ad7.vercel.app/ ]

## 🌟 Project Overview

EduTech Impact is a community-driven event management platform designed to connect volunteers, students, and organizers. Users can create, discover, and join local social service initiatives in their neighborhood.

## ✨ Key Features

- **Secure Authentication:** Robust user authentication using BetterAuth with Email/Password and Social Login (Google), including strong password validation.
- **Protected Authentication:** Better Auth sessions protect dashboard routes, and its signed JWTs are verified by the Express API using the frontend JWKS endpoint.
- **Interactive Event Management:** Empower users to create future-dated events, update details, or delete their own created campaigns directly from the dashboard.
- **Real-time Volunteer Tracking:** A dedicated chronological schedule page for users to seamlessly track all the social development events they have joined.
- **Modern UI & Theme Customization:** A fully responsive, glassmorphism-inspired interface featuring a seamless Dark/Light theme toggle for an enhanced user experience.

## Local Development

The Next.js app and Express API share the MongoDB connection string. Keep all
credentials in local, untracked environment files.

The homepage displays six upcoming events from MongoDB. A new database shows a
helpful empty state until the first event is published; no fake events are
inserted into your database.

Configure `edu-tech-impact/.env.local` with:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
BETTER_AUTH_SECRET=use-a-long-random-secret
MONGODB_URI=your-mongodb-connection-string
```

Google and GitHub sign-in also require `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET`.

Configure `edu-tech-server/.env` with:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
```

Use the same MongoDB connection string in both files. From the repository
folder, start both the API and Next.js app together:

```bash
npm run dev --prefix edu-tech-impact
```

The client dev command waits for the API and MongoDB connection before starting
Next.js. To run only the API, use `npm start --prefix edu-tech-server`. To run
only the web app against an already-running API, use
`npm run dev:web --prefix edu-tech-impact`.

For production, set `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` to the frontend
origin, `NEXT_PUBLIC_API_URL` to the deployed API's `/api` URL, and `CLIENT_URL`
to that same frontend origin. Never commit `.env` or `.env.local` files.
