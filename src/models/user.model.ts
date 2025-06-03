import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  ghostTag: string;
  ghostAvatar: string;
  verification: {
    code: string;
    codeExpiry: Date;
  };
}

const verificationSubSchema = new Schema({
  code: String,
  codeExpiry: Date,
});

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    lowercase: true,
    trim: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password length should be atleast 8 or greater"],
    maxlength: [128, "Password should not exceed 128 characters"],
    /* match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password should contain alteast one uppercase, one lowercase, one digit and one special character (e.g. Pass@123)",
      ], */
  },
  ghostTag: {
    type: String,
    required: true,
  },
  ghostAvatar: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verification: {
    type: verificationSubSchema,
  },
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);
