# GhostPOV

GhostPOV is a web-based platform that lets users quickly collect anonymous feedback by sharing a simple link. Whether it’s a project, portfolio, resume, or idea — GhostPOV helps you get honest, unfiltered input from anyone, and provides AI-powered summaries and insights.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **MongoDB**
- **Better Auth** – Authentication and session management
- **OpenAI API** – Used for generating summaries and insignts of collected feedback
- **AI-SDK** – Integrated with OpenAI for streaming and efficient AI response handling
- **Perspective API** – Used for automatic spam detection and filtering

---

## Features

- **Echo Creation:** Authenticated users can create Echos (posts) and get unique shareable links.
- **Anonymous Feedback:** Anyone can submit feedback without logging in.
- **Feedback Moderation:** Users can choose to allow or disable feedback on their Echos.
- **AI Summaries** – Users can generate AI-powered summaries and insights.
  **Usage Credits** – Generating summaries requires credits, which users can purchase via Razorpay.
- **Account Settings:** Change email, reset password, or delete account.
- **Access Control:** Feedback is only visible to Echo owners.
- **Email Notifications:** Email-based verification, password resets, and change confirmations.
- **Responsive UI:** Built with Tailwind CSS and shadcn/ui for a clean and accessible experience.
- **Usage based :** Users can purchase usage credits securely via Razorpay.

---

## Architecture Notes

- **Database:** MongoDB is used to store all core application data.
- **AI Integration:** Vercel's AI-SDK is used to interact with OpenAI for generating summaries and AI-driven content.
- **Content Filtering:** Perspective API is integrated to detect and filter spam or toxic feedback before storing it.
- **Authentication**: Handled via BetterAuth with support for email and OAuth providers.
- **Rate Limiting & Caching:** Powered by Upstash Redis for both API rate limiting and server-side caching.
- **UI & Styling:** Built using Tailwind CSS, shadcn/ui, and Framer Motion for smooth transitions
- **Payment Gateway:** Razorpay is integrated server-side with API routes and a webhook to handle and verify credit purchases.
- **Deployment:** Hosted on Vercel with edge-optimized middleware and smart caching strategies.

---

## Deployment

Fully deployed and live at [`ghostpov.xyz`](https://ghostpov.xyz)  
Built by [Sameer Saharan](https://sameersaharan.com)
