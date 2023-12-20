import { CompileWeeklyDigestsRequest } from "@therabot/types";
import { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import { DigestController } from "../controllers/DigestController";
import { RequestValidator } from "./utils/request_validator";

const router = PromiseRouter();

router.post("/digests/compile-weekly", async (req: Request, res: Response) => {
  const request = RequestValidator.validate<CompileWeeklyDigestsRequest>(
    req.body.request
  );
  const response = await DigestController.compileWeeklyDigests(request);
  return res.json(response).end();
});

router.post("/digests/send-weekly", async (req: Request, res: Response) => {
  const request = RequestValidator.validate<CompileWeeklyDigestsRequest>(
    req.body.request
  );
  const response = await DigestController.sendWeeklyDigests(request);
  return res.json(response).end();
});

export default router;
