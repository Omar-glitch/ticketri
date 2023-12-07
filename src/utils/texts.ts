export const encodeWithSign = (pathname: string) => {
  return String(pathname).replace(/\W+/g, "-").toLowerCase();
};

export const decodeWithSign = (pathname: string) => {
  return String(pathname).replace(/-+/g, " ").toLowerCase();
};

export const objectIdToDateFormat = (objectId: string) => {
  const timestamp = parseInt(objectId.substring(0, 8), 16);
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substring(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

export const timezoneToInputDateFormat = (timezone: Date) => {
  if (!timezone) return "";
  const date = new Date(timezone);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const timestampToDateFormat = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substring(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

export const sanitizeString = (inputString: string) => {
  let sanitizedString = inputString.replace(
    /[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚÜü]+/g,
    "-"
  );
  sanitizedString = sanitizedString.replace(/^-+|-+$/g, "");
  sanitizedString = sanitizedString.replace(/-+/g, "-");
  return sanitizedString;
};

export const sanitizeConstant = (inputString: string) => {
  let sanitizedString = inputString.replace(
    /[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚÜü]+/g,
    " "
  );
  sanitizedString = sanitizedString.trim();
  sanitizedString = sanitizedString.replace(/ {2,}/g, " ");
  sanitizedString = sanitizedString.toLowerCase();
  return sanitizedString;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const normalizeString = (string: string) => {
  return string.replace(/-/g, " ");
};

export const replaceSpaceWithDash = (string: string) => {
  return string.replace(/ /g, "-");
};
