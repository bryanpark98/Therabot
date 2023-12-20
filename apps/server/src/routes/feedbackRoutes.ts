import { CreateFeedbackRequest } from "@therabot/types";
import { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import { FeedbackController } from "../controllers/FeedbackController";
import { RequestValidator } from "./utils/request_validator";

const router = PromiseRouter();

router.post("/feedback", async (req: Request, res: Response) => {
  const request = RequestValidator.validate<CreateFeedbackRequest>(
    req.body.request
  );
  const response = await FeedbackController.createFeedback(request);
  return res.json(response).end();
});

export default router;
