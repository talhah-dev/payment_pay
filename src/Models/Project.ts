import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPost extends Document {
    title: string;
    description: string;
    deadline: string;
    time: string;
    amount: string;
    status: string;
    paymentStatus: string;
    user: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    paymentStatus: { type: String, required: true, default: "unpaid" },
    amount: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const postModel = mongoose.models.Project || mongoose.model<IPost>("Project", postSchema);
export default postModel;