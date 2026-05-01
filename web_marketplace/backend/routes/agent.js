import express from 'express';
import { assignAgentsToUser, getUserAgents } from '../controllers/agentHandler.js';
import { requireAuth } from '../middlewares/authmiddleware.js';

const agentRoute = express.Router();

agentRoute.post('/assignAgent', requireAuth, assignAgentsToUser)
agentRoute.post('/getAssignAgents', getUserAgents)

export default agentRoute;
