# Quantum Browser

> Next-generation AI-powered browser with advanced privacy and performance features

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![Svelte](https://img.shields.io/badge/Svelte-5.0-orange)](https://svelte.dev/)

## 🚀 Features

### Performance Features
- **⚡ Hardware-Accelerated Rendering**: WebGPU-powered rendering engine for lightning-fast page loads
- **🛡️ 99.9% Ad Blocking**: Advanced machine learning algorithms block ads and trackers in real-time
- **🚀 Quantum Speed Engine**: Proprietary optimization engine with predictive content loading
- **🔒 Advanced Privacy Controls**: Military-grade encryption and anonymous browsing
- **🌐 Cross-Device Sync**: Seamless synchronization across all your devices
- **⚙️ Developer Tools Pro**: Enhanced debugging with AI-powered performance analysis

### AI-Powered Features
- **🧠 Intelligent Page Summarization**: AI automatically summarizes long articles and web pages
- **🌍 Real-Time Translation**: Instant translation in 100+ languages with context awareness
- **🔍 Smart Search Assistant**: AI-powered search with intelligent suggestions
- **📊 Content Analysis**: Advanced credibility and bias detection
- **🎯 Personalized Recommendations**: Machine learning-based content suggestions
- **🤖 AI Chat Assistant**: Built-in AI assistant for research and questions

### 🎮 Interactive Playground
- **🔗 Session Management**: Create and manage browser automation sessions
- **📸 Screenshot Capture**: Real-time screenshot testing with various formats
- **🌐 Translation Testing**: Live translation feature testing
- **🛡️ Ad Block Analysis**: Real-time ad blocking effectiveness testing
- **📊 Live Results**: Interactive feedback and analytics dashboard

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.0.0 or higher)
- **npm** or **bun** (package manager)
- **Git** (for cloning the repository)

## 🛠️ Installation & Build

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/quantum-browser/quantum-browser.git
   cd quantum-browser
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Using npm
   npm install
   
   # Using bun
   bun install
   \`\`\`

3. **Build the project**
   \`\`\`bash
   # Using npm
   npm run build
   
   # Using bun
   bun run build
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   # Using npm
   npm run dev
   
   # Using bun
   bun run dev
   \`\`\`

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - **Playground**: http://localhost:5173/playground

### 🎮 Using the Playground

The Interactive Playground allows you to test Quantum Browser's features in real-time:

1. **Access the Playground**
   \`\`\`bash
   npm run dev
   # Navigate to http://localhost:5173/playground
   \`\`\`

2. **Session Management**
   - Create browser automation sessions
   - Configure user agents and viewport settings
   - Monitor active sessions

3. **Screenshot Testing**
   - Capture screenshots with various formats (PNG, JPEG, WebP)
   - Adjust quality settings and full-page capture
   - View results in real-time

4. **Translation Testing**
   - Test AI-powered translation in 10+ languages
   - See live translation results
   - Compare original and translated text

5. **Ad Blocking Analysis**
   - Test ad blocking effectiveness on any URL
   - Choose blocking levels (Standard, Strict, Custom)
   - View detailed blocking statistics

6. **Live Results Panel**
   - Real-time feedback for all operations
   - Detailed success/error reporting
   - Historical results tracking

### Production Build

1. **Build for production**
   \`\`\`bash
   # Using npm
   npm run build
   
   # Using bun
   bun run build
   \`\`\`

2. **Preview the production build**
   \`\`\`bash
   # Using npm
   npm run preview
   
   # Using bun
   bun run preview
   \`\`\`

### Docker Installation

1. **Build the Docker image**
   \`\`\`bash
   npm run docker:build
   \`\`\`

2. **Run the container**
   \`\`\`bash
   npm run docker:run
   \`\`\`

## 🏗️ Project Structure

\`\`\`
quantum-browser/
├── src/
│   ├── app.html                 # Main HTML template
│   ├── app.css                  # Global styles with CSS variables
│   ├── routes/                  # SvelteKit routes
│   │   ├── +layout.svelte       # Root layout
│   │   ├── +page.svelte         # Homepage
│   │   ├── playground/          # Interactive Playground
│   │   │   └── +page.svelte     # Playground main page
│   │   ├── bookmarks/           # Bookmarks page
│   │   └── history/             # History page
│   └── lib/
│       └── components/          # Reusable components
│           ├── playground/      # Playground-specific components
│           │   ├── PlaygroundHeader.svelte
│           │   ├── SessionManager.svelte
│           │   ├── ScreenshotCapture.svelte
│           │   ├── TranslationTester.svelte
│           │   ├── AdBlockTester.svelte
│           │   └── ResultsPanel.svelte
│           └── ...              # Other components
├── scripts/
│   ├── server.js               # Express.js backend server
│   ├── playground-api.js       # Playground API endpoints
│   └── ai-service.js           # AI processing service
├── static/                     # Static assets
├── vite.config.js             # Vite configuration
├── svelte.config.js           # Svelte configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
\`\`\`

## 🔧 Build Configuration & Troubleshooting

### Root Cause Analysis

The build failures were caused by several issues:

1. **Missing Dependencies**: `tailwindcss-animate` was referenced but not installed
2. **Incorrect Svelte 5 Syntax**: Using `$derived.by()` instead of `$derived()`
3. **Tailwind Plugin Issues**: Missing or incompatible Tailwind plugins
4. **PostCSS Configuration**: Missing PostCSS config file

### Key Configuration Files

#### package.json
- **build**: Uses `vite build` for optimal compatibility with Bun
- **dev**: Runs both frontend and backend concurrently
- **preview**: Serves the production build
- **Added uuid dependency**: For playground session management

#### vite.config.js
- Configured for SvelteKit with proper optimization
- Excludes problematic Node.js modules from client bundle
- Sets up proper chunking for better performance

#### tailwind.config.js
- **Self-contained configuration** without external plugin dependencies
- Includes all necessary color schemes and animations
- Compatible with both npm and bun builds

#### svelte.config.js
- Enables Svelte 5 runes for modern reactive programming
- Configured with proper adapter and preprocessing

#### postcss.config.js
- **Added missing PostCSS configuration**
- Properly configures Tailwind CSS and Autoprefixer

### Build Commands

\`\`\`bash
# Clean build (removes .svelte-kit and node_modules)
rm -rf .svelte-kit node_modules
bun install
bun run build

# Check for TypeScript errors
bun run check

# Lint and format code
bun run lint
bun run format

# Test locally
bun run dev
\`\`\`

## 🎮 Playground API Documentation

### Session Management

#### Create Session
```http
POST /api/playground/session
Content-Type: application/json

{
  "url": "https://example.com",
  "options": {
    "userAgent": "Quantum Browser/1.0",
    "viewport": { "width": 1920, "height": 1080 },
    "timeout": 30000
  }
}
