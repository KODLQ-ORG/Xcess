// src/utils/application-utils.ts

import { NewApplication } from "@/types";

export const createApplication = async (newApplication: NewApplication) => {
  try {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApplication),
    });

    if (!response.ok) {
      const message = `Error creating application: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in createApplication:", error);
    throw error;
  }
};

export const editApplication = async (
  applicationId: number,
  updatedData: NewApplication
) => {
  try {
    const response = await fetch(`/api/applications/${applicationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const message = `Error updating application: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in editApplication:", error);
    throw error;
  }
};

export const deleteApplication = async (applicationId: number) => {
  try {
    const response = await fetch(`/api/applications/${applicationId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const message = `Error deleting application: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }
  } catch (error) {
    console.error("Error in deleteApplication:", error);
    throw error;
  }
};
