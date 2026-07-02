import db from "@/index";
import { eq, sql } from "drizzle-orm";

import { urlTable } from "@/db/url.schema";
import { AppError } from "@utils/error.util";

export interface DataProp {
  shortCode: string;
}

export interface ReturnType {
  originalUrl: string;
}

const urlRedirectService = async (data: DataProp): Promise<ReturnType> => {
  const url = await db.query.urlTable.findFirst({
    where: eq(urlTable.shortCode, data.shortCode),
    columns: {
      originalUrl: true,
      isActive: true,
      expirationDate: true,
    },
  });

  if (!url) {
    throw new AppError("URL not found.", 404);
  }

  if (!url.isActive) {
    throw new AppError("This URL has been disabled.", 410);
  }

  if (url.expirationDate && url.expirationDate.getTime() < Date.now()) {
    throw new AppError("This URL has expired.", 410);
  }

  await db
    .update(urlTable)
    .set({
      clickCount: sql`${urlTable.clickCount} + 1`,
    })
    .where(eq(urlTable.shortCode, data.shortCode));

  return {
    originalUrl: url.originalUrl,
  };
};

export default urlRedirectService;
