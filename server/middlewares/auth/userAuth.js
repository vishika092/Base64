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
        res.status(500).json({error : "Internal Server Error"})
        
    }
}

export default authMiddleware;