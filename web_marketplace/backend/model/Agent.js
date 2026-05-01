import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    categoryTitle: {
        type: String,
        required: true,
        enum: ["Developer", "Creator", "Gamer", "Student"]
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        default: [],
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);