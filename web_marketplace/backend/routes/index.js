import express from "express";
import authRoute from "./auth.js";
import adminRoute from './admin.js'
import agentRoute from "./Agent.js";

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/agent', agentRoute);

export default router;