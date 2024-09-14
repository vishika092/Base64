import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {
        let token = req.cookies['access_token'];
        if (!token) {
            return res.status(401).render('401.ejs');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET); // throws Error for invalid token
        req.user = payload;
       next()
       
    } catch (error) {
        //  This command tells the server to remove the cookie named access_token from the client.
        return res.clearCookie("access_token", {
            sameSite : "none"  , // The cookie will be deleted regardless of where it's accessed (across different sites)
            secure : true 
        }).status(302).redirect('/user/login');
    }
}

function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
        res.clearCookie("access_token", {
            sameSite: "strict"
        });
        return res.status(403).render("401.ejs");
    }
    next()
}

function isUser(req, res, next){
    if(req.user.role !== "user"){
        res.clearCookie("access_token", {
            sameSite: "strict"
        });
        return res.status(403).render("401.ejs");
    }
    next()
}

export  {authMiddleware, isAdmin, isUser};