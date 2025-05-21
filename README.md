# 🎬 Movie Explorer App

An interactive platform to explore, discover, and save your favorite movies — all in one place.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://movie-explorer-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 🚀 Features

### 🏠 Home Page
- Browse trending movies with poster, title, and rating
- Live search functionality
- Infinite scroll or pagination
- Scroll-to-top and bottom navigation buttons

### 📄 Movie Detail Page
- Complete movie info (poster, rating, release date, overview)
- Cast & Crew section
- Trailer preview (if available)
- Protected route access

### ❤️ Favorites System
- Add/remove favorites using `localStorage`
- View saved movies on a dedicated favorites page

### 🔍 Explore Page
- Load more movies with a single click
- Filter and sorting (in progress)

### 🖼️ UI & Experience
- Carousel sliders with **SwiperJS**
- Smooth animations via **Framer Motion**
- Fully responsive and mobile-friendly design

---

## 🛠️ Tech Stack

- [Next.js (App Router)](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [SwiperJS](https://swiperjs.com/react)
- [Axios](https://axios-http.com/)
- [TMDb API](https://developer.themoviedb.org/)

---

## 📦 Getting Started

```bash
git clone https://github.com/muhammadibnu05/movie-explorer-app.git
cd movie-explorer-app

npm install  # or bun install
npm run dev  # or bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔐 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [SwiperJS Docs](https://swiperjs.com/react)
- [TMDb API Docs](https://developer.themoviedb.org/)

---

## 🚀 Deploy on Vercel

Click below to deploy your own:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/muhammadibnu05/movie-explorer-app)