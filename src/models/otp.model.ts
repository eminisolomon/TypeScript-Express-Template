import { OtpType } from "@/enums/otp-enum";
import { Otp } from "@/interfaces/otp.interface";
import mongoose, { Schema, model, Document } from "mongoose";

const OtpSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(OtpType),
    },
    expiration: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

export const OtpModel = model<Otp & Document>("Otp", OtpSchema)