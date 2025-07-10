import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    profileImage: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationCode: string;
    role: "user" | "admin"
}

const userSchema = new Schema<IUser>({
    profileImage: {
        type: String,
        default: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1752111133/man_cv8qdh.jpg",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
}, { timestamps: true });

const signUpModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default signUpModel