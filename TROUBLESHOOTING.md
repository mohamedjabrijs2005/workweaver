TROUBLESHOOTING GUIDE

======================================================

ERROR: Server error: Invalid response format

======================================================

This error means the frontend received a response from the server that could not be parsed as JSON. The server might be returning HTML (error page) or an empty response.

ROOT CAUSES

======================================================

1. API endpoint not found (404)

   (+) Server returns HTML 404 page instead of JSON
   (+) Frontend cannot parse HTML as JSON


2. Server crash or unhandled error

   (+) Backend throws an exception
   (+) Express returns HTML error page
   (+) No JSON error response is sent


3. Empty or null response

   (+) Server returns no data (empty body)
   (+) Response headers indicate JSON but body is empty
   (+) Network issue causes response truncation


4. Wrong API URL

   (+) VITE_API_URL not set or incorrect
   (+) Frontend calls endpoint that doesn't exist
   (+) Server and frontend on different origins


5. Database not initialized

   (+) database.sqlite file doesn't exist or is corrupt
   (+) Database tables not created
   (+) All queries return errors


6. Missing environment variables

   (+) GEMINI_API_KEY not set
   (+) JWT_SECRET not configured
   (+) NODE_ENV causes different behavior


DIAGNOSTIC STEPS

======================================================

Step 1: Check Browser Console

   (+) Open Developer Tools (F12)
   (+) Look for [API] log messages with URLs being called
   (+) Check the exact error message shown
   (+) See if the response shows HTML tags (< symbol means HTML returned)


Step 2: Check Server Logs

   (+) Look for errors printed to console
   (+) Check for database errors like "SQLITE_CANTOPEN"
   (+) Look for parsing errors in routes
   (+) Verify middleware is executing


Step 3: Check Network Tab

   (+) Open Network tab in Developer Tools
   (+) Trigger the error (e.g., try to login)
   (+) Find the failed request
   (+) Check:
       - Request URL is correct
       - Response Status Code (4xx = client error, 5xx = server error)
       - Response Body (Preview tab) - should be JSON


Step 4: Test API Directly

   (+) Use curl or Postman to test endpoints:

       curl -X POST http://localhost:3000/api/auth/login \
         -H "Content-Type: application/json" \
         -d '{"email":"test@example.com","password":"password"}'

   (+) Check if response is valid JSON


Step 5: Verify Database Exists

   (+) Check if database.sqlite file exists in project root:

       Test-Path .\database.sqlite

   (+) If missing, reinitialize:

       npm run db:init


Step 6: Check Environment Variables

   (+) Verify .env file exists (not .env.example)
   (+) Check VITE_API_URL is set correctly
   (+) Verify GEMINI_API_KEY is present
   (+) Check NODE_ENV is set appropriately


SOLUTIONS BY SCENARIO

======================================================

SCENARIO 1: API endpoint returns HTML error page

Cause: Endpoint doesn't exist or server error occurred

Solution:

  1. Check the exact URL in browser console [API] logs
  2. Verify endpoint exists in server routes:
     - /api/auth/login
     - /api/auth/signup
     - /api/auth/logout
     - /api/auth/me
     - /api/knowledge/search
     - /api/knowledge/save
     - /api/knowledge/dashboard/summary
     - /api/ai/detect-context
     - /api/ai/generate-workspace
     - /api/ai/deep-work/end

  3. Restart the server
  4. Check server logs for errors


SCENARIO 2: Empty response body

Cause: Token invalid, no data found, or connection dropped

Solution:

  1. Check if you're logged in (cookie has valid token)
  2. Verify the token hasn't expired (7 days max)
  3. Try logging out and logging in again:
     - Clear browser cookies
     - Clear localStorage
     - Refresh page
     - Log in again

  4. Check network connection
  5. Ensure backend is running


SCENARIO 3: Wrong API URL

Cause: Frontend and backend on different origins

Solution:

  1. In development (localhost):
     (+) Set VITE_API_URL=http://localhost:3000

  2. In production:
     (+) Set VITE_API_URL=https://your-backend-url.com
     (+) Must be the exact URL where backend is hosted
     (+) Example: https://workweaver-api.railway.app

  3. Restart dev server after changing:
     npm run dev

  4. Check browser console for [API] logs showing correct URLs


SCENARIO 4: Database not initialized

Cause: database.sqlite not created or corrupted

Solution:

  1. Delete existing database if corrupted:
     Remove-Item .\database.sqlite -Force

  2. Reinitialize database:
     npm run db:init

  3. Verify tables created:
     npx sqlite3 database.sqlite ".tables"

  4. Restart server


SCENARIO 5: Missing environment variables

Cause: .env file not set up correctly

Solution:

  1. Copy template file:
     cp .env.example .env

  2. Edit .env and set:
     VITE_API_URL=http://localhost:3000
     GEMINI_API_KEY=your-actual-key
     NODE_ENV=development

  3. Get GEMINI_API_KEY from:
     https://ai.google.dev

  4. Restart server and dev client


SCENARIO 6: Server returns validation error

Cause: Invalid input data sent to API

Solution:

  1. Check what was sent in Network tab
  2. Verify required fields:
     - Login: email, password
     - Signup: name, email, password, role
     - Save Knowledge: title, content
     - Detect Context: input (non-empty string)

  3. Check validation errors in server logs


DEBUGGING WITH LOGS

======================================================

Enable detailed logging:

1. Browser Console:
   (+) All [API] prefixed logs show request/response
   (+) Shows full error messages with debugging info
   (+) Shows response preview for non-JSON responses


2. Server Console:
   (+) Watch for:
       - "Signup error:", "Login error:", "AI Error:"
       - Database errors
       - Route not found messages


3. When reporting issues:
   (+) Take screenshot of error message
   (+) Copy full [API] log from console
   (+) Include Network tab response body
   (+) Note the exact endpoint being called
   (+) Include error message shown to user


RECOVERY CHECKLIST

======================================================

If stuck, try in order:

(1) Clear browser cache and cookies
    Ctrl+Shift+Delete, Select "Cookies and cached images"

(2) Hard refresh page
    Ctrl+Shift+R (or Cmd+Shift+R on Mac)

(3) Restart dev server
    Kill current npm run dev
    npm run dev

(4) Reinitialize database
    npm run db:init

(5) Clear node_modules and reinstall
    Remove-Item node_modules -Recurse -Force
    npm install

(6) Check all environment variables set correctly
    cat .env  (verify values match your setup)

(7) Verify backend is running
    curl http://localhost:3000/api/health
    Should return: {"status":"ok"}

(8) Test API directly with curl
    See "Test API Directly" section above


GETTING MORE HELP

======================================================

When asking for help, provide:

(+) The exact error message shown to user
(+) The [API] log output from browser console
(+) The Network tab response body for failed request
(+) The full server console output (all errors)
(+) Steps to reproduce the error
(+) Whether it happens on localhost or deployed
(+) Which environment variables are set


COMMON SUCCESSFUL RESPONSES

======================================================

All successful API responses return JSON in this format:

Login/Signup:
  {
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "email",
      "role": "user|admin"
    },
    "token": "jwt-token-string"
  }

Get User:
  {
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "email",
      "role": "user|admin"
    }
  }

Search Knowledge:
  {
    "results": [
      {
        "id": "uuid",
        "title": "string",
        "content": "string",
        "tags": "string"
      }
    ]
  }

Detect Context:
  {
    "context": "study|coding|research|project",
    "confidenceScore": 0-100
  }

Generate Workspace:
  {
    "tasks": ["string", "string", "string"],
    "tools": ["string", "string"],
    "message": "string"
  }

All errors return:
  {
    "error": "error message describing what went wrong"
  }

If you're seeing something different, the server response format is incorrect.