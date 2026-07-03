import db from "@/index";

import { eq } from "drizzle-orm";

import { urlTable } from "@db/url.schema";
import { userTable } from "@db/user.schema";

import { AppError } from "@utils/error.util";

export interface DataType {
  userId: string;
}

export interface ReturnType {
  urlId: string;
  title: string | null;
  shareCount: number;
  clickCount: number;
  shortCode: string;
  isActive: boolean;
}

const urlGetAllService = async (data: DataType): Promise<ReturnType[]> => {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.publicId, data.userId),
    columns: {
      id: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const urls = await db.query.urlTable.findMany({
    where: eq(urlTable.userId, user.id),
    columns: {
      urlId: true,
      title: true,
      shareCount: true,
      clickCount: true,
      shortCode: true,
      isActive: true,
    },
  });

  return urls.map((url) => ({
    urlId: url.urlId,
    title: url.title,
    shareCount: url.shareCount,
    clickCount: url.clickCount,
    shortCode: url.shortCode,
    isActive: url.isActive,
  }));
};

export default urlGetAllService;
