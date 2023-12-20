import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import { errorHandler } from "./middleware/error_handler";
import { digestRouter, feedbackRouter, notionRouter } from "./routes";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("index"));
app.get("/notion/registration", (req, res) => {
  const code = req.query.code;
  res.render("notion_registration", { code });
});
app.get("/terms-of-use", (req, res) => res.render("terms_of_use"));
app.get("/privacy-policy", (req, res) => res.render("privacy_policy"));
app.get("/notion/setup", (req, res) => res.render("notion_setup"));
app.get("/notion/thank-you", (req, res) =>
  res.render("notion_registration_thank_you")
);
app.get("/feedback", (req, res) => {
  const digestId = req.query.digest_id;
  res.render("feedback", { digestId });
});
app.get("/feedback/thank-you", (req, res) => res.render("feedback_thank_you"));

// Register routers
app.use("/api/v1", notionRouter, digestRouter, feedbackRouter);

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Not found" });
  logger.error(`Not found ${_req.originalUrl}`);
});

app.use((err: Error, _req: Request, res: Response) => {
  logger.error(err.message, err);
  res.status(500).send("Something went wrong.");
});

export default app;
