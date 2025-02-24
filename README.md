# Jio Hotstar

This is a full-stack clone of Jio Hotstar, built using **Next.js** for both the front-end and back-end. It replicates key features like movie streaming, TV shows, anime browsing, user authentication, and real-time subscriptions with Razorpay.

## 🚀 Tech Stack

- **Next.js**: Full-stack framework for React apps
- **Tailwind CSS**: Styling the application
- **Shadcn UI**: Pre-built UI components
- **Zod**: Form validation
- **NextAuth.js**: Authentication
- **Resend**: Email sending and code verification
- **Razorpay**: Real-time payment gateway integration
- **TMDB API**: Fetching movie, TV show, and anime data
- **Render.com**: Deployment platform

## 📂 Project Structure

```
src/
├── app/
│   ├── (app)/
│   ├── (auth)/
│   ├── api/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
├── context/
├── helpers/
├── hooks/
├── lib/
├── model/
├── schema/
├── utils/
└── middleware
```

## ✨ Key Features

- **User Authentication**: Secure sign-up, login, and verification with NextAuth.js
- **Email Verification**: Robust code verification using Resend
- **Content Browsing**: Extensive movie, TV show, and anime catalog powered by TMDB API
- **Search Functionality**: Efficient search across all media types
- **Subscription System**: Seamless payments with Razorpay integration
- **Responsive Design**: Polished UI with Tailwind CSS and Shadcn UI components

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/jiohotstar-clone.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file with the following structure:
   ```
   MONGODB_URI=your_mongodb_uri
   RESEND_API_KEY=your_resend_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   NEXT_PUBLIC_TMDB_ACCESS_KEY=your_tmdb_access_key
   RAZORPAY_PUBLIC_KEY=your_razorpay_public_key
   RAZORPAY_PRIVATE_KEY=your_razorpay_private_key
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📘 API Routes

- `/api/auth`: Authentication management
- `/api/movies`: TMDB movie data retrieval
- `/api/tvShowsVideo`: TV show information fetching
- `/api/anime`: Anime data access
- `/api/checkout`: Razorpay payment initiation
- `/api/verifyPayment`: Razorpay payment verification
- `/api/verifyCode`: Email verification with Resend

## 🚀 Deployment

1. Push your code to a GitHub repository
2. Connect the repository to Render.com
3. Configure environment variables in Render's dashboard
4. Deploy and access your live application

## 🌟 Live Demo

Experience Jio Hotstar in action: [JioHotstar](https://jiohotstar.onrender.com/)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
