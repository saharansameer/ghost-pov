# GhostPOV

GhostPOV is a web-based platform that lets users quickly collect anonymous feedback by sharing a simple link. Whether it’s a project, portfolio, resume, or idea — GhostPOV helps you get honest, unfiltered input from anyone, without requiring them to sign up or log in.

Try it here: [`ghostpov.xyz`](https://ghostpov.xyz)

---

## Tech Stack

- **Next.js (v15+)**
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

- Authenticated users can create an Echo (a post) and get a shareable link
- Visitors can submit feedback anonymously, without login
- Spam and toxicity detection via Perspective API
- AI-generated feedback summaries using OpenAI

---

## Architecture Notes

- Feedback is stored in MongoDB, associated with each Echo
- Perspective API is used to filter toxic or spammy input before storing
- Vercel AI SDK handles OpenAI integration for summarizing responses

---

## Connect

For any feedback or suggestions, feel free to reach out to me on [`X/twitter`](https://x.com/sameersaharanx)
