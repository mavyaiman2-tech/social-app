import { Schema } from "mongoose";
import { SYS_Role, GENDER, USER_AGENT } from "../../../utils/common/enum";
import { IUser } from "../../../utils/common/interface";
import { sendMail } from "../../../utils/email/index";
import bcrypt from "bcrypt";

export const userSchema = new Schema<IUser>({
    firstName: { type: String, minlength: 3, maxlength: 20, required: true, trim: true },
    lastName: { type: String, minlength: 3, maxlength: 20, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
        type: String,
        required: function () {
            return this.userAgent !== USER_AGENT.google;
        },
    },
    credentialUpdateAt: { type: Date },
    phoneNumber: { type: String },
   role: { type: Number, enum: Object.values(SYS_Role).filter(v => typeof v === "number"), default: SYS_Role.admin },
   gender: { type: Number, enum: Object.values(GENDER).filter(v => typeof v === "number"), default: GENDER.MALE },
   userAgent: { type: Number, enum: Object.values(USER_AGENT).filter(v => typeof v === "number"), default: USER_AGENT.google },
   


    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual("fullName")
    .get(function () {
        return this.firstName + " " + this.lastName;
    })
    .set(function (value: string) {
        const [firstName, lastName] = value.split(" ");
        this.firstName = firstName as string;
        this.lastName = lastName as string;
    });

// 🔑 Hash password قبل save + إرسال OTP
userSchema.pre("save", async function (next) {
    if (this.userAgent !== USER_AGENT.google && this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.credentialUpdateAt = new Date();
    }

    if (this.userAgent !== USER_AGENT.google && this.isNew) {
        await sendMail({
            to: this.email,
            subject: "Email Confirm",
            html: `<h1>Your OTP is ${this.otp}</h1>`,
        });
    }

    
});
