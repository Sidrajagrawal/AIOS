import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from '../model/User.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function handleGoogleOAuth(req, res) {
    try {
        const { token } = req.body;
        console.log(process.env.JWT_SECRET);


        if (!token) return res.status(400).json({ message: "Token missing" });

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub, email, name, picture, email_verified } = payload;

        if (!email_verified) return res.status(403).json({ message: "Google email not verified." });

        const user = await User.findOneAndUpdate(
            { googleId: sub },
            {
                $setOnInsert: {
                    googleId: sub,
                    email: email,
                    name: name,
                    picture: picture,
                    authProvider: 'google'
                }
            },
            { new: true, upsert: true }
        );

        const authToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return res.status(200).json({
            message: "Google Successfully Authenticated",
            token: authToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Authentication failed",
        });
    }
}