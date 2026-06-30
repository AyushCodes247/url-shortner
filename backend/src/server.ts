import app from "@/app";
import env from "@configs/dotenv.config";
import http from "http";
import { time } from "./utils/general.util";
import redis from "./configs/redis.config";

const server = http.createServer(app);

const startServer = async () => {
  await redis.connect();

  server.listen(env.PORT, (): void => {
    console.info(`[${time()}] SERVER IS RUNNING ON PORT.: ${env.PORT}`);
  });
};

startServer();
