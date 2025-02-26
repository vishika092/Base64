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








/*

1) About the project Compiler ( 120-150 words)
2) Tech stack used in the project.
3) Need a system design document explaining the workflow of the compiler project
4) Screenshots of UI and explain the workflow of how to use compiler app with steps. (Not more than 5 steps)
5) Explain how system calls and nodejsmidlewares are used to compile the programming language code snippets; 

Note : Explain timeout, buffer , test cases like infinte loops, recursions etc.,   --> compiled and interpreted

6) Security threats (Explain) ex : RCE attack and how do we mitigate
7) The editor (IDE) (100 words)
8) Deployment : CI- CD and everything on Github actions; Inlcuidne Dockerfile confirmation, reverse proxy to the domain, how nginx is playing the role
9) Annexures

1) What are system calls and how are we using Node’s Child, Exec, to execute/compile the programming languages code snippets (300-400 words) 

2) Explain in detail whats Process Time and Memory ? Ex user, real, sys, heap used, heap total , rss (500 words)
*/