import UserAgent from "../model/UserAgent.js";
import User from "../model/User.js";
import Agent from '../model/Agent.js'

export async function assignAgentsToUser(req, res) {
    try {
        const userId = req.userId;
        const { agentIds } = req.body;

        if (!userId || !agentIds || !agentIds.length) {
            return res.status(400).json({
                success: false,
                message: "userId and agentIds required"
            });
        }

        const data = agentIds.map(agentId => ({
            userId,
            agentId
        }));

        await UserAgent.insertMany(data, { ordered: false });

        return res.json({
            success: true,
            message: "Agents assigned successfully"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Error assigning agents"
        });
    }
}

export async function getUserAgents(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: [] 
            });
        }

        const userId = user._id;
        const userAgents = await UserAgent.find({ userId, isActive: true });
        const agentIds = userAgents.map(item => item.agentId);

        const agentsData = await Agent.find({ _id: { $in: agentIds } });

        return res.json({
            success: true,
            message: "Agents fetched successfully!",
            data: agentsData 
        });

    } catch (err) {
        console.error("Error fetching agents by email:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch agents"
        });
    }
}