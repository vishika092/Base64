import fs from 'fs';
import https from 'https';
import ejs from 'ejs'
import http from "http"
import { HTTPServer } from "./controllers/index.js";

const port = 8080;

const SSLOptions = {
    key: fs.readFileSync("utils/ssl-keys/privatekey.pem"),
    cert: fs.readFileSync("utils/ssl-keys/fullchain.pem")
}

const httpServer = http.createServer(HTTPServer)


// const server = https.createServer(SSLOptions,HTTPServer);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




/*
HTTP Programming :

HTTP Protocol : 
    -> Hypertext Transfer Protocol is an application protocol that allows web-based applications to communicate and exchange data.
    -> HTTP works as a request-response protocol between a client and a server.
    -> A client (browser/postman) sends an HTTP request to the server; then the server returns a response to the client. 
        The response contains status information about the request and may also contain the requested content.

HTTP Properties :
    -> Http is 'connectionless' :
    After making the request, if the client disconnects from the server when the response is ready then the server re-establish the connection again and delivers the response.

    ->The Http can deliver any type of content as long as two computers are able to read it.

    -> HTTP is stateless : 
    The client and server know about each other just during the current request. 
    If it closes and if the two computers want to connect again, they need to provide the information to each other anew and the connection is handled as the very first one.

    HTTP Request-Response Message Format

        URI,URL,URN => URI = URL + URN
        URL Fragment => starts with #
Server : hostname:port
    Router : Directory of Routes 
        Route : API Endpoint (url path)
        Controller : Middleware Function that triggers of a route


Middleware : Its a function that have access to req-res object , can handle the req-res cycle
Application Level Middleware

Request Object
    -> Query Params (params) :  
        -> A property of the request object that holds an object containing the route parameters parsed from the URL.
        -> Query parameters are usually included at the end of the URL and are separated from the rest of the URL by a question mark (?), 
            followed by a list of key-value pairs separated by ampersands (&).

URL Fragment: 
A fragment is an internal page reference, sometimes called a 'named anchor'. It usually appears at the end of a URL and begins with a hash (#) character followed by an identifier.
 It refers to a section within a web page. 
Example: http://www.example.com/foo.html#bar
#bar is a fragment.

URL Query String/Params: 
A query string is a part of a uniform resource locator (URL) that assigns values to specified parameters. 
A query string commonly includes fields added to a base URL by a Web browser or other client application, for example as part of an HTML form when you click the form to submit.


MVC Architecture:

The Model-View-Controller (MVC) is an architectural pattern that separates an application into three main logical components: 
    1) the model, 
    2) the view, 
    3) and the controller. 
    Each of these components is built to handle specific development aspects of an application. 
    
    MVC is one of the most frequently used industry-standard web development frameworks to create scalable and extensible projects.

1) Model
The Model component corresponds to all the data-related logic that the user works with. 
This can represent either the data that is being transferred between the View and Controller components or any other business logic-related data. For example, a Customer object will retrieve the customer information from the database, manipulate it and update its data back to the database or use it to render data.


2) View
The View component is used for all the UI logic of the application. For example, the Customer view will include all the UI components such as text boxes, dropdowns, etc. that the final user interacts with.

3) Controller
Controllers act as an interface between Model and View components to process all the business logic and incoming requests, manipulate data using the Model component and interact with the Views to render the final output. For example, the Customer controller will handle all the interactions and inputs from the Customer View and update the database using the Customer Model. The same controller will be used to view the Customer data.


HTTPS Server :
    Diff between HTTP vs HTTPS Protocol 
    What is the port number for HTTPS : 443
    What is SSL/TLS Certificate ? 
    What is DNS Server ? What is a TXT DNS Record ?

 / (App Main Directory)

        



            */



 /*
API Specification or Signature

Root Router :
    /   GET
        Response : { message : "Welcome to / router" }
    

// User Router

    /user GET
        Response : { message : "Welcome to /user router" }
    /user?id=12345 GET
        Response : { message : "Welcome to /user router with id" }

    /user POST
        Body : { name : "John Doe", email : "anyemail@gmail.com", password : "password" }
        Response : { message : "User Created" }

    /user PUT
        Body : { name : "John Doe", email : "anyemail@gmail.com", password : "password" }
        Response : { message : "User Updated" }

    /user?id=12345 DELETE
        Response : { message : "User Deleted" }

    /user/about GET
        Response : { message : "Welcome to /user/about router" }

//Admin Router
    
        /admin GET
            Response : { message : "Welcome to /admin router" }
       
        /admin/users GET
            Response : { message : "Welcome to /admin/users router" }

//Not Found Router
    Response : { message : "Not Found" }
 */
