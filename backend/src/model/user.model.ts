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
        role: {
            type: String,
            enum: ['customer', 'shop', 'admin'],
            default: 'customer',
        }
    },
    {
        timestamps: true,
    }
);

export interface IUser extends UserType, Document { 
    _id: mongoose.Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = mongoose.model<IUser>('User', UserSchema);
