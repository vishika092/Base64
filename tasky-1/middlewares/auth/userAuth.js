import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {
        let token = req.headers['x-auth-key'];
        if (!token) {
            return res.status(401).send('Authentication Failed');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET); // throws Error for invalid token
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).send('Authentication Failed');
    }
}

export default authMiddleware;