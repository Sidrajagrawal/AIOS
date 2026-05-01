import User from "../model/User.js";
import Agent from '../model/Agent.js'

export async function handleTotalUser(req, res) {
    try {
        
        const users = await User.find({})

        const totalUsers = users.length;

        return res.status(200).json({
            success: true,
            totalUsers: totalUsers,
            users: users
        });

    } catch (err) {
        console.error("Error fetching users for admin:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user data.",
            error: err.message
        });
    }
}

export async function handleAgentByRole(req, res) {
    try {
        const {
            categoryTitle,
            description,
            features,
            iconUrl,
            subtitle,
            title
        } = req.body;

        if (!categoryTitle || !description || !features || !iconUrl || !subtitle || !title) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newAgent = await Agent.create({
            categoryTitle,
            description,
            features,
            iconUrl,
            subtitle,
            title
        });

        return res.status(201).json({
            success: true,
            message: "Agent created successfully",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export async function handleShowAllAgent(req, res) {
    try {
        const agents = await Agent.find()

        return res.status(200).json({
            success: true,
            count: agents.length,
            data: agents
        });

    } catch (err) {
        console.error("Fetch Agents Error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch agents"
        });
    }
}