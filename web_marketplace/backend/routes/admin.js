import express from 'express';
import { handleTotalUser, handleAgentByRole, handleShowAllAgent } from '../controllers/adminHandler.js';
import { requireAuth } from '../middlewares/authmiddleware.js';
const adminRoute = express.Router();

adminRoute.get('/totalUser', requireAuth, handleTotalUser)
adminRoute.post('/addAgentByRole', requireAuth, handleAgentByRole)
adminRoute.get('/showAllAgents', requireAuth, handleShowAllAgent)

export default adminRoute;