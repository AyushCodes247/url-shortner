import db from "@/index";

import { eq } from "drizzle-orm";

import { urlTable } from "@db/url.schema";

import { AppError } from "@utils/error.util";

export interface UpdateDataType {
  urlId: string;
  title?: string | null;
  expirationDate?: Date | null;
  isActive?: boolean;
}

export interface UpdatedReturnDataType {
  urlId: string;
  title: string | null;
  shortCode: string;
  originalUrl: string;
  expirationDate: Date | null;
  isActive: boolean;
  clickCount: number;
  shareCount: number;
}

const urlUpdateService = async (
  data: UpdateDataType,
): Promise<UpdatedReturnDataType> => {
  const url = await db.query.urlTable.findFirst({
    where: eq(urlTable.urlId, data.urlId),
  });

  if (!url) {
    throw new AppError("URL not found.", 404);
  }

  if (url.deletedAt) {
    throw new AppError("This URL has been deleted.", 410);
  }

  const [updatedUrl] = await db
    .update(urlTable)
    .set({
      title: data.title ?? url.title,
      expirationDate:
        data.expirationDate !== undefined
          ? data.expirationDate
          : url.expirationDate,
      isActive:
        data.isActive !== undefined
          ? data.isActive
          : url.isActive,
    })
    .where(eq(urlTable.urlId, data.urlId))
    .returning({
      urlId: urlTable.urlId,
      title: urlTable.title,
      shortCode: urlTable.shortCode,
      originalUrl: urlTable.originalUrl,
      expirationDate: urlTable.expirationDate,
      isActive: urlTable.isActive,
      clickCount: urlTable.clickCount,
      shareCount: urlTable.shareCount,
    });

  if (!updatedUrl) {
    throw new AppError("Failed to update URL.", 500);
  }

  return updatedUrl;
};

export default urlUpdateService;