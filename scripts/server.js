import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { setupPlaygroundRoutes } from "./playground-api.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || "quantum-browser-secret-key"

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://quantum-browser.dev" : "http://localhost:5173",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use(express.json({ limit: "10mb" }))

// Database setup
let db

async function initDatabase() {
  db = await open({
    filename: join(__dirname, "../data/quantum-browser.db"),
    driver: sqlite3.Database,
  })

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS history (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS ai_summaries (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      summary TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS playground_sessions (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      options TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS playground_screenshots (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      format TEXT,
      quality INTEGER,
      full_page BOOLEAN,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES playground_sessions (id)
    );

    CREATE TABLE IF NOT EXISTS playground_translations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_text TEXT NOT NULL,
      translated_text TEXT NOT NULL,
      target_language TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS playground_adblock_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      level TEXT NOT NULL,
      blocked INTEGER,
      allowed INTEGER,
      effectiveness INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log("Database initialized successfully")
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Auth routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.run("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, hashedPassword])

    const token = jwt.sign({ userId: result.lastID, email }, JWT_SECRET)

    res.json({ token, user: { id: result.lastID, email } })
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      res.status(400).json({ error: "Email already exists" })
    } else {
      res.status(500).json({ error: "Registration failed" })
    }
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email])

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET)

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error) {
    res.status(500).json({ error: "Login failed" })
  }
})

// Bookmarks API
app.get("/api/bookmarks", authenticateToken, async (req, res) => {
  try {
    const bookmarks = await db.all("SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC", [
      req.user.userId,
    ])
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookmarks" })
  }
})

app.post("/api/bookmarks", authenticateToken, async (req, res) => {
  try {
    const { title, url } = req.body
    const id = crypto.randomUUID()

    await db.run("INSERT INTO bookmarks (id, user_id, title, url) VALUES (?, ?, ?, ?)", [
      id,
      req.user.userId,
      title,
      url,
    ])

    res.json({ id, title, url, created_at: new Date().toISOString() })
  } catch (error) {
    res.status(500).json({ error: "Failed to create bookmark" })
  }
})

app.delete("/api/bookmarks/:id", authenticateToken, async (req, res) => {
  try {
    await db.run("DELETE FROM bookmarks WHERE id = ? AND user_id = ?", [req.params.id, req.user.userId])
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bookmark" })
  }
})

// History API
app.get("/api/history", authenticateToken, async (req, res) => {
  try {
    const history = await db.all("SELECT * FROM history WHERE user_id = ? ORDER BY visited_at DESC LIMIT 1000", [
      req.user.userId,
    ])
    res.json(history)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" })
  }
})

app.post("/api/history", authenticateToken, async (req, res) => {
  try {
    const { title, url } = req.body
    const id = crypto.randomUUID()

    await db.run("INSERT INTO history (id, user_id, title, url) VALUES (?, ?, ?, ?)", [id, req.user.userId, title, url])

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Failed to save history" })
  }
})

app.delete("/api/history", authenticateToken, async (req, res) => {
  try {
    await db.run("DELETE FROM history WHERE user_id = ?", [req.user.userId])
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Failed to clear history" })
  }
})

// AI Features API
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { url, content } = req.body

    // Check if we already have a summary for this URL
    const existingSummary = await db.get("SELECT summary FROM ai_summaries WHERE url = ?", [url])

    if (existingSummary) {
      return res.json({ summary: existingSummary.summary })
    }

    // Simulate AI summarization (in production, integrate with actual AI service)
    const summary = await generateSummary(content)

    // Store the summary
    const id = crypto.randomUUID()
    await db.run("INSERT INTO ai_summaries (id, url, summary) VALUES (?, ?, ?)", [id, url, summary])

    res.json({ summary })
  } catch (error) {
    res.status(500).json({ error: "Failed to generate summary" })
  }
})

app.post("/api/ai/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body

    // Simulate translation (in production, integrate with actual translation service)
    const translatedText = await translateText(text, targetLanguage)

    res.json({ translatedText })
  } catch (error) {
    res.status(500).json({ error: "Failed to translate text" })
  }
})

// Ad blocking API
app.post("/api/adblock/check", async (req, res) => {
  try {
    const { url } = req.body

    // Simulate ad blocking check
    const isBlocked = await checkAdBlock(url)

    res.json({ blocked: isBlocked })
  } catch (error) {
    res.status(500).json({ error: "Failed to check ad block status" })
  }
})

// Setup playground routes
setupPlaygroundRoutes(app, db)

// Utility functions (simulate AI services)
async function generateSummary(content) {
  // In production, integrate with actual AI service like OpenAI, Anthropic, etc.
  const sentences = content.split(".").filter((s) => s.trim().length > 0)
  const keyPoints = sentences.slice(0, 3).join(". ") + "."
  return `Summary: ${keyPoints}`
}

async function translateText(text, targetLanguage) {
  // In production, integrate with actual translation service
  return `[Translated to ${targetLanguage}] ${text}`
}

async function checkAdBlock(url) {
  // In production, implement actual ad blocking logic
  const adDomains = ["doubleclick.net", "googleadservices.com", "googlesyndication.com"]
  return adDomains.some((domain) => url.includes(domain))
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Start server
async function startServer() {
  try {
    await initDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Quantum Browser API server running on port ${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
      console.log(`🎮 Playground: http://localhost:5173/playground`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
