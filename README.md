# AI Resume Analyzer

An intelligent application that helps users optimize their resumes by analyzing them against job descriptions using advanced AI models. The system compares resume content with job requirements to provide scoring, keyword gap analysis, and actionable improvement suggestions.

## Features

- **Resume Parsing**: Text extraction from PDF resumes.
- **AI-Powered Analysis**: Uses Large Language Models (LLMs) via Groq SDK and Xenova Transformers for deep content analysis.
- **Match Scoring**: Calculates a definitive match score based on skills, experience, and education.
- **Keyword Analysis**: Identifies missing critical keywords and skills found in the job description.
- **Detailed Feedback**: Provides actionable insights to improve the resume.
- **Modern UI**: Responsive and professional interface built with React and TailwindCSS.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **AI/ML**:
  - [Groq SDK](https://console.groq.com/docs/libraries/js) for LLM integration.
  - [@xenova/transformers](https://huggingface.co/docs/transformers.js) for local embedding/ML tasks.
  - [ml-distance](https://github.com/mljs/distance) for similarity metrics.
- **Authentication**: JWT (JSON Web Tokens).

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB installed and running locally, or a MongoDB Atlas URI.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   ```

### Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-resume # Or your Atlas URI

# Security
ACCESS_TOKEN_SECRET=your_super_secret_access_key
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS & Cookies
CLIENT_URL=http://localhost:5173
COOKIE_SECURE=false

# AI Service
GROQ_API_KEY=your_groq_api_key_here
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:5000`.

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will be accessible at `http://localhost:5173` (or the port shown in terminal).
