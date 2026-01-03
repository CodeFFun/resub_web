import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../types/user.type";
const UserSchema: Schema = new Schema<UserType>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        fullName: { type: String },
        profilePictureUrl: { type: String },
        phoneNumber: { type: String },
        dateOfBirth: { type: String },
        alternateEmail: { type: String, email: true },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        role: {
            type: String,
            enum: ['customer', 'shop'],
            default: 'customer',
        }
    },
    {
        timestamps: true, // auto createdAt and updatedAt
    }
);

export interface IUser extends UserType, Document { 
    _id: mongoose.Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = mongoose.model<IUser>('User', UserSchema);
