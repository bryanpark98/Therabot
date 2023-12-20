import { createServer } from "http";
import { connect } from "mongoose";
import app from "./app";
import config from "./utils/config";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      test: string; // Edit this to add a new property to the Request object
    }
  }
}

async function main() {
  await connect(
    "mongodb+srv://server:RT6fMs3LPy8GnpHV@cluster0.3arqoxz.mongodb.net/test?retryWrites=true&w=majority"
  );

  const httpServer = createServer(app);

  httpServer.listen(config.port, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${config.port}`
    );
  });
}

main();
