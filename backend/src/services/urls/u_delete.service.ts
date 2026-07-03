import db from "@/index";

import { eq } from "drizzle-orm";

import { urlTable } from "@db/url.schema";

import { AppError } from "@utils/error.util";

export interface UrlDeleteData {
  urlId: string;
}

export interface UrlDeleteResponse {
  urlId: string;
  isActive: boolean;
  deletedAt: Date | null;
}

const urlDeleteService = async (
  data: UrlDeleteData,
): Promise<UrlDeleteResponse> => {
  const url = await db.query.urlTable.findFirst({
    where: eq(urlTable.urlId, data.urlId),
    columns: {
      urlId: true,
      isActive: true,
      deletedAt: true,
      expirationDate: true,
    },
  });

  if (!url) {
    throw new AppError("URL not found.", 404);
  }

  if (url.deletedAt) {
    throw new AppError("URL has already been deleted.", 400);
  }

  if (!url.isActive) {
    throw new AppError("URL has already been disabled.", 410);
  }

  if (
    url.expirationDate &&
    url.expirationDate.getTime() < Date.now()
  ) {
    throw new AppError("URL has expired.", 410);
  }

  const [updatedUrl] = await db
    .update(urlTable)
    .set({
      isActive: false,
      deletedAt: new Date(),
    })
    .where(eq(urlTable.urlId, data.urlId))
    .returning({
      urlId: urlTable.urlId,
      isActive: urlTable.isActive,
      deletedAt: urlTable.deletedAt,
    });

  if (!updatedUrl) {
    throw new AppError("Failed to delete URL.", 500);
  }

  return updatedUrl;
};

export default urlDeleteService;