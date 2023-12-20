import {
  RegisterNotionUserRequest,
  RegisterNotionUserResponse,
} from "@therabot/types";
import { Request, Response } from "express";
import PromiseRouter from "express-promise-router";
import { NotionController } from "../controllers";
import { RequestValidator } from "./utils/request_validator";

const router = PromiseRouter();

router.post("/notion/register-user", async (req: Request, res: Response) => {
  const request = RequestValidator.validate<RegisterNotionUserRequest>(
    req.body.request
  );
  await NotionController.registerUser(request);
  return res.json({} as RegisterNotionUserResponse).end();
});

export default router;
