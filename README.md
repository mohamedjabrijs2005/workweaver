# WorkWeaver AI 🧠

> Deep work, woven together by AI.

WorkWeaver AI is an intelligent productivity platform designed to maximize focus and deep work capabilities. It combines AI-powered context detection with smart workspace generation to help students, researchers, and professionals achieve flow state faster and maintain higher productivity levels.

**Status**: Active Development | **Version**: 1.0.0 | **License**: MIT

---

## 🎯 Project Vision

WorkWeaver AI addresses the challenge of context-switching and loss of productivity in modern work environments. By automatically detecting what you're working on and intelligently adapting the workspace, it creates an optimal environment for sustained deep work sessions.

### Core Problem Solved
- Frequent context switches disrupt focus and productivity
- Users waste time setting up workspaces for different tasks
- Lack of tracking and motivation during work sessions
- Fragmented knowledge management across multiple tools

### Our Solution
An AI-powered platform that:
1. Analyzes your current activity to determine context
2. Auto-generates tailored workspaces with relevant tools
3. Provides motivation and tracking through gamification
4. Centralizes all knowledge in one searchable hub

---

## ✨ Features (Detailed)

### 🧠 Context Detection
- **Automatic Activity Recognition**: Analyzes your current work to determine if you're studying, coding, writing, or researching
- **Context Switching**: Seamlessly transitions between different work modes
- **Learning Algorithm**: Improves accuracy over time based on your usage patterns
- **Real-time Adaptation**: Workspace adjusts instantly as your context changes

### 🎨 Smart Workspace Generation
- **Tailored Task Lists**: AI generates relevant tasks based on your context
- **Tool Recommendations**: Suggests optimal tools and resources for your current work
- **Motivational Content**: Provides encouraging messages and productivity tips
- **Custom Shortcuts**: Quick access to frequently used resources
- **Visual Organization**: Clean, distraction-free interface for each work mode

### ⏱️ Deep Work Mode
- **Pomodoro Timer**: Configurable work/break intervals (default: 25 min work / 5 min break)
- **Focus Scoring**: Tracks your focus quality and consistency
- **Distraction Detection**: Alerts you if activity suggests loss of focus
- **Session Analytics**: Detailed breakdown of your work sessions
- **Streak Tracking**: Gamified streak system to maintain consistency
- **Performance Metrics**: Visual charts showing productivity trends

### 📚 Knowledge Hub
- **Smart Storage**: Organize notes, summaries, and project reflections
- **Advanced Search**: Full-text search with filters and tags
- **Knowledge Graph**: Visual connections between related notes
- **Export Options**: Save your knowledge in multiple formats (PDF, Markdown, etc.)
- **Collaboration**: Share specific notes or projects with peers
- **Version Control**: Track changes and restore previous versions

### 🔐 Authentication & Security
- **User Accounts**: Secure registration and login system
- **Session Management**: OAuth-style token-based sessions
- **Password Security**: Hashed passwords with bcrypt
- **Protected Routes**: Authorization checks on all sensitive endpoints
- **CORS Protection**: Cross-origin request validation
- **Data Privacy**: All data encrypted at rest

### 🤖 AI Integration
- **Gemini API Integration**: Leverages Google's powerful AI models
- **Natural Language Processing**: Understands your work context
- **Smart Suggestions**: Provides intelligent recommendations
- **Content Generation**: Auto-generates task lists and summaries
- **Real-time Analysis**: Processes your activity in real-time

---

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     Client Layer (Browser)                 │
│              ┌──────────────────────────────┐               │
│              │   React + TypeScript App     │               │
│              │  - Components, Pages, State  │               │
│              └──────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓ (HTTP/WS)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  Application Layer (Server)                │
│              ┌──────────────────────────────┐               │
│              │    Express.js Server         │               │
│              │  - API Routes & Middleware   │               │
│              └──────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    Data & Integration Layer                │
│    ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│    │  SQLite DB  │  │ Google AI    │  │  Auth Service  │  │
│    │  - Users    │  │  - Gemini    │  │  - JWT Tokens  │  │
│    │  - Sessions │  │  - Context   │  │  - Sessions    │  │
│    │  - Knowledge│  │    Analysis  │  │                │  │
│    └─────────────┘  └──────────────┘  └────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Architecture
- **Components**: Modular React components with props-based composition
- **Context API**: Global state management for authentication
- **Routing**: React Router for navigation between pages
- **Styling**: Tailwind CSS with responsive design
- **State Management**: React hooks for local component state

### Backend Architecture
- **Express Server**: RESTful API endpoints
- **Middleware**: Authentication, error handling, validation
- **Route Handlers**: Organized by feature (auth, AI, knowledge)
- **Database Layer**: SQLite with structured queries
- **Service Layer**: Business logic separation

### Data Flow
1. User interacts with React frontend
2. Event triggers API request to Express server
3. Server authenticates request
4. Route handler processes request
5. Database operations or AI processing executed
6. Response returned to client
7. UI updates with new data

---

## 🛠️ Tech Stack (Detailed)

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework and component library | 18+ |
| **TypeScript** | Static typing for JavaScript | 5+ |
| **Tailwind CSS** | Utility-first CSS framework | 3.3+ |
| **React Router** | Client-side routing | 6+ |
| **Lucide React** | Icon library | Latest |
| **Vite** | Build tool and dev server | 4+ |

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | 16+ |
| **TypeScript** | Type-safe backend code | 5+ |
| **Express.js** | Web framework | 4.18+ |
| **SQLite3** | Database | 3.45+ |
| **Bcrypt** | Password hashing | 5.1+ |
| **CORS** | Cross-origin requests | Latest |

### AI & External Services
| Service | Purpose |
|---------|---------|
| **Google Gemini API** | Context detection & AI features |
| **JWT** | Authentication tokens |
| **OAuth** | Third-party authentication (future) |

---

## 📑 Project Structure (Detailed)

```
workweaver/
│
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # Reusable React components
│   │   ├── Layout.tsx              # Main layout wrapper
│   │   └── ProtectedRoute.tsx       # Route authorization wrapper
│   │
│   ├── 📁 context/                  # React Context for state
│   │   └── AuthContext.tsx          # Authentication context & hooks
│   │
│   ├── 📁 pages/                    # Full-page components
│   │   ├── Landing.tsx              # Marketing landing page
│   │   ├── Login.tsx                # User login page
│   │   ├── SignUp.tsx               # User registration page
│   │   ├── Dashboard.tsx            # Main app dashboard
│   │   ├── DeepWork.tsx             # Deep work mode with timer
│   │   ├── KnowledgeHub.tsx         # Note management
│   │   └── Admin.tsx                # Admin panel (restricted)
│   │
│   ├── App.tsx                      # Main app component & routing
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles
│
├── 📁 server/                       # Backend source code
│   ├── 📁 routes/                   # API route handlers
│   │   ├── ai.ts                   # AI feature endpoints
│   │   ├── auth.ts                 # Authentication endpoints
│   │   └── knowledge.ts            # Knowledge hub endpoints
│   │
│   ├── auth.ts                      # Authentication utility
│   ├── db.ts                        # Database initialization & queries
│   └── middleware/                  # Express middleware (future)
│
├── 📄 index.html                    # HTML template
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 vite.config.ts                # Vite configuration
├── 📄 server.ts                     # Server entry point
├── 📄 README.md                     # This file
└── 📄 metadata.json                 # App metadata
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16.0.0 or higher ([download](https://nodejs.org))
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **API Keys**: Google Gemini API key (free tier available)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/workweaver.git
cd workweaver
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- Frontend dependencies (React, Tailwind, etc.)
- Backend dependencies (Express, SQLite, etc.)
- Development tools (TypeScript, Vite, etc.)

### Step 3: Environment Configuration
Create a `.env.local` file in the project root:
```env
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DB_PATH=./workweaver.db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_TIMEOUT=3600000

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Run Development Server
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Hot reload**: Changes reflect instantly

### Step 5: Access Application
Open `http://localhost:5173` in your browser

---

## 📖 Usage Guide

### First-Time User Flow

#### 1. Landing Page
- Overview of WorkWeaver features
- Call-to-action buttons for signup/login
- Video introduction to deep work concept
- Feature highlights with icons

#### 2. Sign Up
```
Email → Password → Account Created → Login
```
- Email validation
- Password strength requirements
- Terms & conditions acceptance
- Automatic login after signup

#### 3. Dashboard
- Welcome message
- Quick stats (sessions, focus time, knowledge entries)
- Quick-access buttons to main features
- Recent activity log

#### 4. Deep Work Session
1. Click "Start Deep Work"
2. Select your work type (Study / Code / Research / Write)
3. Set session duration (default: 25 min)
4. Begin session with timer
5. Workspace adjusts based on context
6. Break reminders at intervals
7. Session summary with scoring

#### 5. Knowledge Hub
1. Click "Knowledge Hub"
2. View all notes/summaries
3. Create new entry
4. Search across knowledge base
5. Tag and categorize
6. Export or share

#### 6. Admin Panel (Admin Users Only)
- User management
- System statistics
- Configuration settings
- API key management
- Logs and debugging

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Open command palette |
| `Ctrl+/` | Toggle sidebar |
| `Ctrl+N` | New note |
| `Ctrl+S` | Save |
| `Esc` | Cancel/Close |

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }'
```
**Response**: `{ token, user: { id, email, name } }`

#### POST /api/auth/login
Authenticate user and get session token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```
**Response**: `{ token, user: { id, email, name, role } }`

#### GET /api/auth/me
Get current user information
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Response**: `{ user: { id, email, name, role, createdAt } }`

#### POST /api/auth/logout
End current session
```bash
curl -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Response**: `{ success: true }`

### AI Endpoints

#### POST /api/ai/detect-context
Analyze activity and detect work context
```bash
curl -X POST http://localhost:3001/api/ai/detect-context \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentActivity": "Writing code in Python",
    "recentApps": ["VSCode", "Terminal"]
  }'
```
**Response**: `{ context: "coding", confidence: 0.95 }`

#### POST /api/ai/generate-workspace
Generate workspace for detected context
```bash
curl -X POST http://localhost:3001/api/ai/generate-workspace \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "context": "coding",
    "subject": "React components"
  }'
```
**Response**: `{ workspace: { tasks, tools, motivation } }`

### Knowledge Hub Endpoints

#### GET /api/knowledge
List all user's knowledge entries
```bash
curl -X GET http://localhost:3001/api/knowledge?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### POST /api/knowledge
Create new knowledge entry
```bash
curl -X POST http://localhost:3001/api/knowledge \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Hooks Guide",
    "content": "...",
    "tags": ["react", "javascript"]
  }'
```

#### GET /api/knowledge/:id
Get specific knowledge entry

#### PUT /api/knowledge/:id
Update knowledge entry

#### DELETE /api/knowledge/:id
Delete knowledge entry

#### GET /api/knowledge/search?q=term
Search knowledge entries

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user', -- 'user' | 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Knowledge Entries Table
```sql
CREATE TABLE knowledge_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  tags VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Work Sessions Table
```sql
CREATE TABLE work_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  context VARCHAR(50),
  duration_minutes INTEGER,
  focus_score DECIMAL(3,2),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 💻 Development Guide

### Running in Development Mode
```bash
npm run dev
```
- Starts both frontend and backend
- Enables hot module reloading
- Shows verbose logs

### Building for Production
```bash
npm run build
```
- Optimizes React code
- Bundles TypeScript
- Minifies CSS and JavaScript
- Creates `dist/` folder

### Running Production Build Locally
```bash
npm run build
npm run preview
```

### Testing
```bash
npm test
```
(When testing framework is added)

### Code Quality
```bash
npm run lint
```
(When linter is configured)

### TypeScript Type Checking
```bash
npm run type-check
```

---

## 🐛 Debugging Tips

### Frontend Debugging
- **React DevTools**: Install React DevTools browser extension
- **Console Logs**: Check browser console for errors
- **Network Tab**: Monitor API requests/responses
- **Performance Tab**: Check render performance

### Backend Debugging
- **Server Logs**: Check terminal output for errors
- **Request/Response**: Log API interactions
- **Database Queries**: Enable query logging in db.ts
- **VS Code Debugger**: Set breakpoints in TypeScript

### Common Issues

**Issue**: Port 3001 already in use
```bash
# Kill process on port 3001
lsof -i :3001
kill -9 <PID>
```

**Issue**: Database locked
```bash
# Remove database file and restart
rm workweaver.db
npm run dev
```

**Issue**: CORS errors
- Check CORS_ORIGIN in .env.local
- Verify request headers
- Check browser console for details

---

## 📦 Deployment

### Deploying to Vercel
```bash
npm i -g vercel
vercel
```

### Deploying to Netlify
```bash
npm run build
# Connect to Netlify via web interface
```

### Docker Deployment
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001 5173
CMD ["npm", "start"]
```

---

## 🤝 Contributing

### Getting Started with Development
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint rules
- Use descriptive variable/function names
- Add comments for complex logic
- Format code with Prettier

### Pull Request Process
1. Update README.md with new features
2. Add/update tests
3. Update CHANGELOG
4. Request review from maintainers
5. Make requested changes
6. Merge once approved

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 💬 Support & Community

### Getting Help
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Share ideas in GitHub Discussions
- **Email**: contact@workweaver.ai

### Contributing Guidelines
See [CONTRIBUTING.md](CONTRIBUTING.md)

### Code of Conduct
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## 🗺️ Roadmap

### v1.0 (Current)
- ✅ User authentication
- ✅ Deep work mode with timer
- ✅ Knowledge hub
- ✅ Basic AI context detection

### v1.1 (Planned)
- [ ] Advanced analytics dashboard
- [ ] Team/group collaboration
- [ ] Mobile app (React Native)
- [ ] Offline support

### v2.0 (Future)
- [ ] Browser extension
- [ ] AI assistant integration
- [ ] Voice commands
- [ ] Advanced personalization

---

## 📊 Performance Metrics

### Target Performance
- **Page Load**: < 2 seconds
- **API Response**: < 500ms
- **Session Start**: < 1 second
- **Search**: < 200ms

### Optimization Strategies
- Code splitting with Vite
- Image lazy loading
- Database query optimization
- Caching strategies
- CDN for static assets

---

## 🔒 Security Considerations

### Best Practices Implemented
- ✅ Password hashing (bcrypt)
- ✅ JWT token validation
- ✅ CORS protection
- ✅ SQL injection prevention
- ✅ XSS protection via React
- ✅ HTTPS ready

### Security Checklist
- [ ] Update dependencies regularly
- [ ] Review security advisories
- [ ] Penetration testing
- [ ] OWASP compliance
- [ ] Data encryption

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev)

---

**Built with ❤️ for deep work and focus**

Last updated: February 28, 2026
#   w o r k w e a v e r  
 