import { Schema, model } from "mongoose";

export type IBusinessInfo = {
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
};

const businessInfoSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IBusinessInfo>("BusinessInfo", businessInfoSchema);
