# 🎬 Movie Explorer App

Explore, discover, and save your favorite movies with **Movie Explorer**, a sleek web app built using **Next.js**, **TypeScript**, and powered by the [TMDb API](https://developer.themoviedb.org/). Live demo: [findcinema.vercel.app](https://findcinema.vercel.app)

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js-000?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/styled%20with-Tailwind%20CSS-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 🚀 Features

### 🏠 Home Page

- Browse trending movies with posters, titles, and ratings
- Infinite scroll or pagination
- **Live search** functionality to search movies in real-time
- **Scroll navigation buttons** to jump to top or bottom easily

### 📄 Movie Detail Page

- Full movie information (poster, rating, release date, overview)
- Cast & Crew listings
- Trailers (if available)
- **Protected routing** to prevent direct access via URL without navigation flow

### ❤️ Favorites System

- Save and remove favorites using `localStorage`
- Separate favorites page to view saved movies

### 🔍 Explore More Page

- "Load More" button to fetch additional movies
- Integrated filters and sorting options (in development)

### 🖼️ Media & Visuals

- Integrated **SwiperJS** for carousel sliders (e.g., featured movies)
- Smooth animations with **Framer Motion**

### 💡 Responsive UI

- Fully mobile-friendly design
- Consistent and clean layout with **Tailwind CSS**

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**
- **SwiperJS**
- **TMDb API**

---

## 📦 Getting Started

```bash
git clone https://github.com/muhammadibnu05/movie-explorer-app.git
cd movie-explorer-app

npm install # or bun/yarn/pnpm
npm run dev # or bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

---

## 🧠 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [SwiperJS](https://swiperjs.com/react)
- [TMDb API Documentation](https://developer.themoviedb.org/)

---

## 🚀 Deployment

Deploy on Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
