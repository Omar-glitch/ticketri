import crypto from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || "secret";

const key = crypto
  .createHash("sha512")
  .update(SECRET)
  .digest("hex")
  .substring(0, 32);
const encryptionIV = crypto
  .createHash("sha512")
  .update(SECRET)
  .digest("hex")
  .substring(0, 16);

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encryptedText: string) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
