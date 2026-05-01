import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    picture: {
        type: String
    },
    authProvider: {
        type: String,
        default: 'google'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);