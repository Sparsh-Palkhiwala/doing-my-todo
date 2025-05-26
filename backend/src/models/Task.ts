import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  time: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    completed: { type: Boolean, default: false },
    time: { type: String, default: "12:00 PM" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", TaskSchema);
