import { Router, type IRouter } from "express";
import healthRouter from "./health";
import extractBranchesRouter from "./extract-branches";
import generateLifeRouter from "./generate-life";

const router: IRouter = Router();

router.use(healthRouter);
router.use(extractBranchesRouter);
router.use(generateLifeRouter);

export default router;
