import { Router, type IRouter } from "express";
import healthRouter from "./health";
import extractBranchesRouter from "./extract-branches";

const router: IRouter = Router();

router.use(healthRouter);
router.use(extractBranchesRouter);

export default router;
