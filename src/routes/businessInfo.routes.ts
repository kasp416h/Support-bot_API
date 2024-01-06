import { Router } from "express";
const router = Router();

import {
  getBusinessInfo,
  updateBusinessInfo,
} from "../controllers/businessInfo.controller";

router.route("/").get(getBusinessInfo).patch(updateBusinessInfo);

export default router;
