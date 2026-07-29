import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    originalUrl: {
        type: String,
        required: true,
        trim: true
    },
    customAlias: {
        type: Boolean,
        default: false,
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date,
        required: false
    }
}, {timestamps: true})

export const LinkModel = mongoose.model('Link', linkSchema)