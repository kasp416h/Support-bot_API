import { Schema, model } from "mongoose";

export type IBusinessInfo = {
  companyName: string;
  openingHours?: string;
  contactInfo: {
    phone: string;
    email: string;
    address?: string;
  };
  productDetails?: string;
  pricingInfo?: string;
  returnPolicy?: string;
  shippingInfo?: string;
  faqs?: Array<{ question: string; answer: string }>;
  companyHistory?: string;
  promotions?: string;
  loyaltyPrograms?: string;
  safetyCompliance?: string;
  accessibilityInfo?: string;
  emergencyProcedures?: string;
  communityInvolvement?: string;
  environmentalImpact?: string;
  technicalSupportInfo?: string;
  appointmentBookingInfo?: string;
  isCustomized: boolean;
};

const businessInfoSchema = new Schema(
  {
    companyName: { type: String, required: true },
    openingHours: String,
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: String,
    },
    productDetails: String,
    pricingInfo: String,
    returnPolicy: String,
    shippingInfo: String,
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    companyHistory: String,
    promotions: String,
    loyaltyPrograms: String,
    safetyCompliance: String,
    accessibilityInfo: String,
    emergencyProcedures: String,
    communityInvolvement: String,
    environmentalImpact: String,
    technicalSupportInfo: String,
    appointmentBookingInfo: String,
    isCustomized: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IBusinessInfo>("BusinessInfo", businessInfoSchema);
