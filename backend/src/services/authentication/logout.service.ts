import { verifyRefreshToken } from "@utils/auth.util";
import { deleteSession } from "../redis/session.redis.service";

const logoutService = async (refreshToken : string) : Promise<void> => {
    const payload = verifyRefreshToken(refreshToken);
    await deleteSession(payload.publicId);
};

export default logoutService;