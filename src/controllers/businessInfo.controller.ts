import { Request, Response } from "express";
import BusinessInfo from "../models/businessInfo.model";

async function getBusinessInfo(req: Request, res: Response): Promise<void> {
  const businessInfo = await BusinessInfo.findOne();
  res.json(businessInfo);
}

async function updateBusinessInfo(req: Request, res: Response): Promise<void> {
  const updates = req.body;

  try {
    const updatedBusinessInfo = await BusinessInfo.findOneAndUpdate(
      {},
      { $set: updates, isCustomized: true },
      { new: true, runValidators: true }
    );

    if (!updatedBusinessInfo) {
      res.status(404).send("BusinessInfo not found");
      return;
    }

    res.json(updatedBusinessInfo);
  } catch (error) {
    console.error("Error updating business information:", error);
    res.status(500).send("Error updating business information");
  }
}

export { getBusinessInfo, updateBusinessInfo };
