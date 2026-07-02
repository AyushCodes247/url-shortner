export const time = (): string => new Date().toISOString();

export const otpGenerator = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
