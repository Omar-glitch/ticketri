"use client";

import { IconButton } from "@/styles/ButtonStyles";
import React from "react";
import DownloadSVG from "../svg/DownloadSVG";
import toast from "react-hot-toast";
import getErrorMessage from "@/utils/errorResponses";
import axios from "axios";

type DownloadFileButton = {
  fileId: string;
};

async function downloadFile(url: string, fileName: string): Promise<void> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to download file. Status: ${response.status} - ${response.statusText}`
      );
    }

    const blob = await response.blob();

    // Create a link element
    const link = document.createElement("a");

    // Create a Blob URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Set the link's href to the Blob URL
    link.href = blobUrl;

    // Set the download attribute with the desired file name
    link.download = fileName;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    // Release the Blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

function redirectToUrlInNewTab(url: string): void {
  // Create a link element
  const link = document.createElement("a");

  // Set the link's href to the desired URL
  link.href = url;

  // Set the target attribute to '_blank' to open the link in a new tab
  link.target = "_blank";

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link to open the URL in a new tab
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

export default function DownloadFileButton({ fileId }: DownloadFileButton) {
  const getDownloadUrl = async () => {
    try {
      const downloadUrl = await axios.get(`/api/files/${fileId}`);
      console.log(downloadUrl.data.message);
      redirectToUrlInNewTab(downloadUrl.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <IconButton
      type="button"
      $m="0 0.25rem 0 auto"
      $size="1.375rem"
      $color="primary"
      $p="0.1875rem"
      title="Descargar archivo"
      onClick={getDownloadUrl}
    >
      <DownloadSVG />
    </IconButton>
  );
}
