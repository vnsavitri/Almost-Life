import { Router } from "express";
import { getRemaining } from "../middlewares/rate-limit";

const router = Router();

router.get("/generations-remaining", (req, res) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0].trim())
    ?? req.socket.remoteAddress
    ?? "unknown";

  res.json(getRemaining(ip));
});

export default router;
