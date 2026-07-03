import db from "@/index";

import { eq } from "drizzle-orm";

import { urlTable } from "@db/url.schema";

import { AppError } from "@utils/error.util";

export interface UrlGetOneData {
  urlId: string;
}

export interface UrlGetOneResponse {
  urlId: string;
  title: string | null;
  isActive: boolean;
  clickCount: number;
  shareCount: number;
  shortCode: string;
}

const urlGetOneService = async (
  data: UrlGetOneData,
): Promise<UrlGetOneResponse> => {
  const url = await db.query.urlTable.findFirst({
    where: eq(urlTable.urlId, data.urlId),
    columns: {
      urlId: true,
      title: true,
      isActive: true,
      clickCount: true,
      shareCount: true,
      shortCode: true,
      deletedAt: true,
    },
  });

  if (!url) {
    throw new AppError("URL not found.", 404);
  }

  if (url.deletedAt) {
    throw new AppError("URL has been deleted.", 404);
  }

  return {
    urlId: url.urlId,
    title: url.title,
    isActive: url.isActive,
    clickCount: url.clickCount,
    shareCount: url.shareCount,
    shortCode: url.shortCode,
  };
};

export default urlGetOneService;
