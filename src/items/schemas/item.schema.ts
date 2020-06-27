import * as mongoose from 'mongoose'

export const ItemSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
})
