import express from 'express';
import { handleGoogleOAuth } from '../controllers/authHandler.js';

const authRoute = express.Router();

authRoute.post('/google', handleGoogleOAuth);

export default authRoute;
