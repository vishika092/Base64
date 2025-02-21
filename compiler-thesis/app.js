import express from 'express'
import codeRouter from "./routes/codeRouter.js"
import path from 'path';
const __dirname = import.meta.dirname;


const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public', 'dist')));


app.use(express.json());

app.use("/api/compiler", codeRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
  });


app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
