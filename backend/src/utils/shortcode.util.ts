import crypto from "crypto";

const generateShortcode = (length: number = 20): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortcode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    shortcode += characters[randomIndex];
  }

  return shortcode;
};

export default generateShortcode;
