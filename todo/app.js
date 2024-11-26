import express from 'express';
import path from 'path';
import http from 'http';
import fs from 'fs';
import https from 'https';
const __dirname = import.meta.dirname;
import "./utils/dbConnect.js";
import rateLimit from 'express-rate-limit';
import todoRouter from './routers/todoRouter.js';
import authMiddleware from './middlewares/auth/userAuth.js';
import userRouter from './routers/userRouter.js';
const app = express();


const HTTP_PORT = 8080; // Port for HTTP (redirection)
const HTTPS_PORT = 4433; // Port for HTTPS

const SSLOptions = {
    key: fs.readFileSync("utils/keys/privkey.pem"),
    cert: fs.readFileSync("utils/keys/fullchain.pem")
};



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);


app.use(express.static(path.join(__dirname, 'public', 'dist')));
// app.use(express.static('public/dist'));

app.use(express.json());

app.use("/api", userRouter);


// Use Todo Routes
app.use("/api", todoRouter);

// Authentication Route
app.get("/api/auth", authMiddleware, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    console.log(err);
    res.json({ error: false });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
  // res.sendFile(path.join('public/dist/index.html'));
});


const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

// HTTPS server with SSL
const httpsServer = https.createServer(SSLOptions, app);

// Start HTTP server
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}, redirecting to HTTPS.`);
});

// Start HTTPS server
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server running on port ${HTTPS_PORT}.`);
});
















