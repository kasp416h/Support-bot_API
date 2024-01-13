import { Router, Request, Response } from "express";
const router = Router();

router.all("*", (req: Request, res: Response): void => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ message: "404 Not Found " });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

export default router;
