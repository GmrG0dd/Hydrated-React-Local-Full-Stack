import mongoose, { Schema } from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017');

declare global {
    namespace Express {
        interface User extends UserType { }
    }
}

export interface UserType {
    passportid: string,
    username: string,
    hash: string,
    salt: string,
    admin: boolean
}

interface UserTypeDocument extends UserType, mongoose.Document {
    createdAt: Date;
    updateAt: Date;
}

export const User = mongoose.model<UserTypeDocument>('User', new Schema<UserType>({
    passportid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
}));