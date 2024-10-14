import url from 'url';
import router from '../routes/index.js';
import fs from 'fs/promises';
import NodeCache from "node-cache";
import path from "path"
import ejs from "ejs"

const myCache = new NodeCache();

/*
    API : /
    Method : GET
    Desc : Home Route
*/
async function homeGETController(req, res) {
    const filePath = path.join('views', 'home.ejs');
    try {
        const template = await fs.readFile(filePath, 'utf8');
            
        // Render the EJS template with dynamic data
        const renderedHtml = ejs.render(template, { 
            message: 'Welcome to Home Router'
        });

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderedHtml);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading page');
    }
}

/*
    API : /user/data
    Method : GET
    Desc : Access users.json file from models folder and send the data as response that matches the x-auth-key in headers
*/

async function userDataController(req, res) {
    try {
        if (!req.data.headers['x-auth-key']) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Unauthorized Access" }));
        }
        let email = myCache.get(req.data.headers['x-auth-key']);
        if (!email) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Unauthorized Access" }));
        }
        // let keys = JSON.parse(await fs.readFile('./models/keys.json', 'utf-8'));
        // if (!keys[req.data.headers['x-auth-key']]) {
        //     res.writeHead(401, { "Content-Type": "application/json" });
        //     return res.end(JSON.stringify({ message: "Unauthorized Access" }));
        // }
        // let email = keys[req.data.headers['x-auth-key']];
    
        let data = JSON.parse(await fs.readFile('./models/users.json', 'utf-8'));
        data = data.find(user => user.email === email);
        delete data.password;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}
function getRandomStr(size) {
    var chars = 'a8bc0def1gh9ij2klmn34opqr56stuvw7xyz';
    var result = '';
    while (result.length != size) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
/*
    API : /user/login
    Method : POST
    Desc : User Login Route
*/
async function userLoginController(req, res) {
    try {
        let { body } = req.data;
        body = JSON.parse(body);
        let userData = await fs.readFile('./models/users.json', 'utf-8');
        userData = JSON.parse(userData);
        let user = userData.find(user => user.email === body.email && user.password === body.password);
        if (!user) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Invalid Credentials" }));
        }
        let token = `${getRandomStr(5)}-${getRandomStr(5)}-${getRandomStr(5)}`;
        res.writeHead(200, { "Content-Type": "application/json" });
        // let tokenData = JSON.parse(await fs.readFile('./models/keys.json', 'utf-8'));
        // await fs.writeFile('./models/keys.json', JSON.stringify({ ...tokenData, [token]: user.email }));
        myCache.set(token, user.email, 1 * 60 * 60);
        res.end(JSON.stringify({
            message: "Login Success",
            token
        }));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}



/*
    API : /user/register
    Method : POST
    Body : { name : "John Doe", email : "", password : "" }
    Desc : 
        -> Access users.json file from models folder
        -> Add the data to the users.json file
        -> by default todos value should be empty array
        -> id is random number
        -> Send the response as "User Created" in JSON format
*/

async function userRegisterController(req, res) {
    try {
        let { body } = req.data;
        body = JSON.parse(body);
        // Check if the email already exists
        let userData = JSON.parse(await fs.readFile('./models/users.json', 'utf-8'));
        let user = userData.find(user => user.email === body.email);
        if (user) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "User Already Exists" }));
        }
        userData.push({ id: getRandomStr(7), ...body, todos: [] });
        await fs.writeFile('./models/users.json', JSON.stringify(userData));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User Created" }));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}




/*
    API : NotFoundController
    Description : 
        -> The function that handles the 404 Not Found error
        -> It sends a JSON response with a message "Router Not Found"
        -> The response status code is 404

*/
async function NotFoundController(req, res) {
    try {
        const filePath = path.join('views', '404.ejs');
        const template = await fs.readFile(filePath, 'utf8');
            
        const renderedHtml =  ejs.render(template, {
            message: "Router Not Found"
        });

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(renderedHtml);
    } catch (error) {
        console.error("Error loading 404 page: ", error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
/*
    HTTPServer : 
        -> The function that handles the HTTP request and response
        -> It parses the URL and gets the route name, query, method, headers, and body of the request
        -> It calls the router handler function if the route is found in the router object
        -> If the route is not found, it calls the NotFoundController function
*/

async function HTTPServer(req, res) {
    try {
        //Get the URL and parse it
        const parsedURL = url.parse(req.url, true);
        // Get the query string as an object
        const query = parsedURL.query;
        // Get the HTTP Method
        const method = req.method;
        // Get the route name (API endpoint)
        const routeName = parsedURL.pathname;
        // Get the headers from the request
        const headers = req.headers;
        //Get the body of the request
        let buffer = '';
        req.on('data', (chunk) => {
            buffer += chunk;
        });
        req.on('end', () => {
            req.data = {
                parsedURL,
                query,
                method,
                routeName,
                headers,
                body: buffer
            }
            //Router Handler
            let route = `/${routeName.split("/")[1]}`;
            if (router[route]?.[method]?.[routeName]) {
                router[route][method][routeName](req, res);
            } else {
                NotFoundController(req, res);
            }

        });
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}


export {
    HTTPServer, homeGETController, userDataController, userLoginController, userRegisterController
}