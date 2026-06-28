import app from "@/app";
import env from "@configs/dotenv.config";
import http from "http";

const server = http.createServer(app);

server.listen(env.PORT, () : void => {
    console.info(`SERVER IS RUNNING ON PORT.: ${env.PORT}`);
});