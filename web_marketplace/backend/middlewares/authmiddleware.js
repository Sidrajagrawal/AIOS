import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authentication required. Missing or malformed token." });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedPayload.userId;

        next();

    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired. Please log in again." });
        }

        return res.status(403).json({ message: "Invalid token." });
    }
};