import mongoose from "mongoose";

const userAgentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

userAgentSchema.index({ userId: 1, agentId: 1 }, { unique: true });

export default mongoose.model("UserAgent", userAgentSchema);