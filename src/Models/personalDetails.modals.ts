import mongoose, { Schema } from "mongoose";
import { IPersonalDetails } from "../types/PersonalDetails.types.js";
import { JOB_TYPES, DOMICILE_TYPES } from "../utils/contstants.js";

const personalDetailsSchema = new Schema<IPersonalDetails>(
  {
    jobType: {
      type: String,
      required: true,
      enum: JOB_TYPES,
    },
    cnicNumber: {
      type: String,
      required: true,
      unique: true,
    },
    feeDepositDate: {
      type: Date,
      required: true,
    },
    domicile: {
      type: String,
      required: true,
      enum: DOMICILE_TYPES,
    },
    transcriptIssueDate: {
      type: Date,
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    postalAddress: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    hasDisability: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model<IPersonalDetails>(
  "PersonalDetails",
  personalDetailsSchema
);
