# Kunal Patil — Interactive Personal Portfolio & Admin Dashboard

World-class, modern, and highly interactive personal portfolio website for **Kunal Patil** — Computer Engineering Student at Dr. D. Y. Patil College of Engineering & Innovation, Pune (CGPA: 9.93, 1st Rank Shirpur Taluka, C++ Intern at Thiranex).

Designed with a high-end Vercel, Linear, and Apple-inspired aesthetic featuring glassmorphism, animated gradients, real-time Firebase Firestore synchronization, a secure Admin Portal, and an integrated Gemini AI Assistant.

---

## 🚀 Key Features

- **Dynamic Hero & Typing Animations**: Interactive status indicator, metric badges (9.93 CGPA, 1st Rank Taluka), and social links.
- **Certificate Vault**: Searchable, filterable vault with PDF/Image modal inspector, credential IDs, and skill verifications.
- **Interactive Project Showcase**: Unlimited project support with tech stack tags, live demo, source code links, and feature breakdown modals.
- **Academic & Experience Timelines**: Timeline displays for C++ Internship at Thiranex, university honors, and college degrees.
- **Ask Kunal's AI Assistant**: Embedded Gemini AI Chat Assistant trained on Kunal's background, projects, and achievements.
- **Secure Admin Management Portal**: Real-time CRUD dashboard protected by security PIN (`1730`). Edit profile info, projects, certificates, education, skills, achievements, gallery photos, and view contact form messages.
- **Permanent Firestore Storage**: Real-time cloud persistence for all portfolio edits and contact form submissions.
- **Command Palette (`Cmd + K` / `Ctrl + K`)**: Quick command menu for jumping across sections, searching projects, or triggering dark/light themes.
- **Dark/Light Mode**: Sleek dark luxury aesthetic with seamless theme toggling.
- **Interactive Contact Form**: Direct message dispatch with validation and canvas confetti celebrations!

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion
- **Icons**: Lucide Icons
- **Backend & APIs**: Express, Node.js, `@google/genai` (Gemini API)
- **Database & Storage**: Firebase Firestore
- **Build System**: Vite, esbuild, tsx

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kunalpatil1730/kunal-patil-portfolio.git
   cd kunal-patil-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel or Netlify

### Option 1: Vercel Deployment

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository.
4. Set the Build and Output settings:
   - **Framework Preset**: Vite / Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables in Vercel settings:
   - `GEMINI_API_KEY`: Your Gemini API Key
6. Click **Deploy**.

### Option 2: Netlify Deployment

1. Push your code to GitHub.
2. Sign in to [Netlify](https://netlify.com) and select **"Add new site"** > **"Import an existing project"**.
3. Connect your repository.
4. Set Build parameters:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Under **Site Configuration** > **Environment variables**, add `GEMINI_API_KEY`.
6. Click **Deploy Site**.

---

## 🔐 Admin Portal Access

- Access the Admin Portal by clicking the **Lock icon** in the top navigation bar or pressing `Cmd + K` > "Admin Dashboard".
- **Default Security PIN**: `1730`
- Once logged in, you can add, edit, or delete any project, skill, certificate, education entry, or photo, and permanently save changes to Firebase Firestore!

---

## 📜 License

Apache 2.0 License. Built for Kunal Patil's Personal Portfolio.
