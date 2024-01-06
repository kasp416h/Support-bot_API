import { Router } from "express";
const router = Router();

import { getChatGptResponse } from "../controllers/chat.controller";

router.route("/").get(getChatGptResponse);

export default router;