import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';



const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authToken.split(' ')[1];

    try {
        const decoded = jwt.verify(token, authConfig.secret);
        req.userId = decoded.id;
        req.userName = decoded.name;
        req.userIsAdmin = decoded.admin;
    } catch (_error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
    return next();
};

export default authMiddleware;
