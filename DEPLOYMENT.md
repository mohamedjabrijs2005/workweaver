DEPLOYMENT GUIDE

======================================================

PREREQUISITES

======================================================

(+) Node.js 16+ and npm
(+) SQLite 3
(+) A Gemini API key from https://ai.google.dev
(+) A deployment platform (Vercel, Railway, Netlify, or similar)


ENVIRONMENT VARIABLES

======================================================

Copy .env.example to .env and set the following variables:

For Local Development:

  VITE_API_URL=http://localhost:3000
  GEMINI_API_KEY=your-api-key-here
  NODE_ENV=development


For Deployed Application:

  VITE_API_URL=https://your-deployed-url.com
  GEMINI_API_KEY=your-api-key-here
  NODE_ENV=production


DATABASE SETUP

======================================================

The application uses SQLite3 with better-sqlite3 for synchronous operations.

Database is initialized via ./server/db.ts which creates:

(+) users table - for authentication and user profiles
(+) knowledge table - for storing user notes and knowledge items
(+) sessions table - for tracking deep work sessions


On first deployment, ensure the database file (database.sqlite) is created:

  npm run db:init


CLONING & INSTALLATION

======================================================

1. Clone the repository:

   git clone https://github.com/mohamedjabrijs2005/workweaver.git
   cd workweaver

2. Install dependencies:

   npm install

3. Set up environment variables:

   cp .env.example .env
   Edit .env with your actual values

4. Initialize the database:

   npm run db:init


RUNNING LOCALLY

======================================================

1. Start the development server:

   npm run dev

2. The application will be available at:

   Frontend: http://localhost:5173
   Backend API: http://localhost:3000


BUILDING FOR DEPLOYMENT

======================================================

1. Build the frontend and backend:

   npm run build

2. This creates a dist/ folder with:

   (+) Built frontend assets (HTML, CSS, JS)
   (+) Server files (TypeScript compiled to JavaScript)


DEPLOYING TO VERCEL

======================================================

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. In Vercel Dashboard:

   (+) Set Framework: "Other"
   (+) Build Command: npm run build
   (+) Output Directory: dist
   (+) Root Directory: ./

4. Add Environment Variables in Vercel Settings:

   (+) VITE_API_URL = Your Vercel deployment URL
   (+) GEMINI_API_KEY = Your API key
   (+) NODE_ENV = production

5. Deploy by pushing to GitHub or clicking Deploy


DEPLOYING TO RAILWAY

======================================================

1. Install Railway CLI:

   npm i -g @railway/cli

2. Connect to Railway:

   railway login

3. Create a new project:

   railway init

4. Set environment variables:

   railway variables set VITE_API_URL=https://your-railway-url.com
   railway variables set GEMINI_API_KEY=your-api-key
   railway variables set NODE_ENV=production

5. Deploy:

   railway up


DEPLOYING TO NETLIFY (Frontend) + EXTERNAL API (Backend)

======================================================

If deploying frontend and backend separately:

Frontend (Netlify):

  (+) Build Command: npm run build:frontend
  (+) Publish Directory: dist
  (+) Environment: VITE_API_URL=https://your-api-url.com

Backend (Railway/Heroku/etc):

  (+) Deploy the server with your API key
  (+) Set VITE_API_URL in frontend to point to your backend URL


COMMON ISSUES

======================================================

1. Failed to execute 'json' on 'Response': Unexpected end of JSON input

   Cause: Backend returning non-JSON response (error page, empty response)

   Solution:
   (+) Check if VITE_API_URL is set correctly
   (+) Verify database is initialized
   (+) Check logs for backend errors: console.error() outputs


2. CORS Errors (in browser console)

   Cause: Frontend and backend on different origins

   Solution:
   (+) Set VITE_API_URL to your backend URL
   (+) Server has CORS middleware configured


3. Database Not Found

   Cause: database.sqlite not created or initialized

   Solution:
   (+) Run: npm run db:init
   (+) Check permissions on database file


4. Gemini API Key Not Valid

   Cause: Incorrect or expired API key

   Solution:
   (+) Get a new key from https://ai.google.dev
   (+) Update GEMINI_API_KEY in environment variables


PRODUCTION CHECKLIST

======================================================

(✓) Set NODE_ENV=production
(✓) Set VITE_API_URL to your deployed URL
(✓) Database is initialized and persistent
(✓) GEMINI_API_KEY is configured
(✓) SSL/HTTPS is enabled
(✓) Error logging is configured for debugging
(✓) CORS is properly configured
(✓) All API endpoints return valid JSON


MONITORING

======================================================

Monitor your application logs for:

(+) Failed authentication attempts
(+) AI API errors
(+) Database connection issues
(+) Unhandled promise rejections


All API errors should return JSON with structure: { error: "message" }

Check server console logs for detailed debugging information.


SUPPORT

======================================================

For issues or questions, refer to:

(+) GitHub Issues: https://github.com/mohamedjabrijs2005/workweaver/issues
(+) Server Logs: Check platform-specific logs (Vercel, Railway, etc.)
(+) API Health Check: GET /api/health should return { status: "ok" }

