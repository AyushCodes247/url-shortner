import app from "@/app";
import env from "@configs/dotenv.config";
import http from "http";
import { time } from "./utils/general.util";
import redis from "./configs/redis.config";
import transporter from "@configs/mail.config";

const server = http.createServer(app);

const startServer = async () => {
  await redis.connect();

  await transporter.verify((error, success) => {
    if (error) {
      console.error(`[${time()}] MAIL SERVER ERROR: ${error}.`);
    }

    if (success) {
      console.info(`[${time()}] MAIL SERVER IS READY TO SEND EMAILS.`);
    }
  });

  server.listen(env.PORT, (): void => {
    console.info(`[${time()}] SERVER IS RUNNING ON PORT.: ${env.PORT}`);
  });
};

startServer();
