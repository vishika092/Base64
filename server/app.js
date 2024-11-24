import express from 'express';
import path from 'path';
const __dirname = import.meta.dirname;
import "./utils/dbConnect.js";
import todoRouter from './routers/todoRouter.js';
import authMiddleware from './middlewares/auth/userAuth.js';
import userRouter from './routers/userRouter.js';
const app = express();
const PORT = 3000;



app.use(express.static(path.join(__dirname, 'public', 'dist')));
// app.use(express.static('public/dist'));

app.use(express.json());

app.use("/", userRouter);


// Use Todo Routes
app.use("/", todoRouter);

// Authentication Route
app.get("/auth", authMiddleware, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
