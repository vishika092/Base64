import jwt from 'jsonwebtoken';


async function authMiddleware(req, res, next){
    const token = req.header('auth');
   
    if (!token) {
      return res.status(401).json({ error: "Access denied, no token provided" });
    }
    try{
    const payload = jwt.verify(token, 'vishika'); 
    req.user = payload;
    next();
    }
    catch(err){
        console.log(err);
        return res.status(401).send("Token expired. Please log in again.");
        
    }
}

export default authMiddleware;