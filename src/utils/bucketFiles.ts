"use server";

import { storage } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import getErrorMessage from "./errorResponses";

const TICKET_FILES = "ticket_files";

export const uploadFileToBucket = async (file: File | null) => {
  try {
    if (!file) return { error: "file is empty" };
    const fileId = v4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${fileId}.${fileExtension}`;
    const storageRef = ref(storage, `${TICKET_FILES}/${newFileName}`);
    const { metadata } = await uploadBytes(storageRef, file);
    const { fullPath } = metadata;
    if (!fullPath) return { error: "could not uploadFile" };
    const fileUrl = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`;
    console.log(fileUrl);
    return { message: newFileName };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const deleteFileFromBucket = async (fileId: string) => {
  if (!fileId) return { error: "fileId empty" };

  try {
    const fileRef = ref(storage, `${TICKET_FILES}/${fileId}`);
    await deleteObject(fileRef);
    return { message: "file deleted" };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getDownloadURLFileBucket = async (fileId: string) => {
  if (!fileId) return { error: "fileId empty" };

  try {
    const fileRef = ref(storage, `${TICKET_FILES}/${fileId}`);
    const filePublicURL = await getDownloadURL(fileRef);
    return { message: filePublicURL };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const saveFiles = async (files: File[] | null) => {
  const nameFilesAdded = [];
  if (files) {
    for (const file of files) {
      const data = await uploadFileToBucket(file);
      if (!data.error) {
        nameFilesAdded.push(data.message);
      }
    }
  }
  return nameFilesAdded;
};
