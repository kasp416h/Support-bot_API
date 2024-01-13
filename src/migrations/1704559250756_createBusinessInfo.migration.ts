import BusinessInfo, { IBusinessInfo } from "../models/businessInfo.model";

module.exports = async function createBusinessInfo() {
  try {
    const existingBusinessInfo = await BusinessInfo.findOne();

    if (!existingBusinessInfo) {
      const defaultBusinessInfo = {
        companyName: "My business",
        contactInfo: {
          phone: "123-456-7890",
          email: "contact@mybusiness.com",
        },
        isCustomized: false,
      };

      const newBusinessInfo = new BusinessInfo(defaultBusinessInfo);
      await newBusinessInfo.save();

      console.log("BusinessInfo document created successfully.");
    }
  } catch (error) {
    console.error("Error in createBusinessInfo migration:", error);
  }
};
