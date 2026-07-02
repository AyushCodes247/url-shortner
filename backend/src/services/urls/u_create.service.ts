import db from "@/index";
import env from "@configs/dotenv.config";

import { eq } from "drizzle-orm";

import { urlTable } from "@db/url.schema";
import { userTable } from "@db/user.schema";

import { AppError } from "@utils/error.util";
import generateShortcode from "@utils/shortcode.util";

export interface UrlCreationData {
  originalUrl: string;
  publicId: string;
  customAlias?: string;
  title?: string;
}

export interface UrlCreationReturnType {
  urlId: string;
  shortUrl: string;
  titleResponse: string | null;
  isActive: boolean;
  clickCount: number;
  shareCount: number;
}

const ALIAS_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

const urlCreateService = async (
  data: UrlCreationData,
): Promise<UrlCreationReturnType> => {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.publicId, data.publicId),
    columns: {
      id: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  let shortCode: string;

  if (data.customAlias) {
    if (!ALIAS_REGEX.test(data.customAlias)) {
      throw new AppError(
        "Custom alias can only contain letters, numbers, '-' and '_', and must be 3-20 characters long.",
        400,
      );
    }

    const existingAlias = await db.query.urlTable.findFirst({
      where: eq(urlTable.shortCode, data.customAlias),
      columns: {
        id: true,
      },
    });

    if (existingAlias) {
      throw new AppError("Custom alias already exists.", 409);
    }

    shortCode = data.customAlias;
  } else {
    do {
      shortCode = generateShortcode(6);
    } while (
      await db.query.urlTable.findFirst({
        where: eq(urlTable.shortCode, shortCode),
        columns: {
          id: true,
        },
      })
    );
  }

  const [url] = await db
    .insert(urlTable)
    .values({
      originalUrl: data.originalUrl,
      shortCode,
      userId: user.id,
      title: data.title ?? null,
    })
    .returning({
      urlId: urlTable.urlId,
      shortCode: urlTable.shortCode,
      title: urlTable.title,
      isActive: urlTable.isActive,
      clickCount: urlTable.clickCount,
      shareCount: urlTable.shareCount,
    });

  if (!url) {
    throw new AppError("Failed to create short URL.", 500);
  }

  const baseUrl = env.BASE_SHORT_URL!.replace(/\/$/, "");

  return {
    urlId: url.urlId,
    shortUrl: `${baseUrl}/${url.shortCode}`,
    titleResponse: url.title,
    isActive: url.isActive,
    clickCount: url.clickCount,
    shareCount: url.shareCount,
  };
};

export default urlCreateService;
