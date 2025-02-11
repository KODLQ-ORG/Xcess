// src/utils/external-user-utils.ts

import { ExternalUser, NewExternalUser } from "@/types";

export const createExternalUser = async (externalUser: NewExternalUser) => {
  try {
    const response = await fetch("/api/external-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(externalUser),
    });

    if (!response.ok) {
      const message = `Error creating external user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in createExternalUser:", error);
    throw error;
  }
};

export const editExternalUser = async (
  userId: string,
  updatedData: Partial<ExternalUser>
) => {
  try {
    console.log(updatedData);
    const response = await fetch(`/api/external-users/${userId}`, {
      // Updated path
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const message = `Error updating external user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in editExternalUser:", error);
    throw error;
  }
};

export const deleteExternalUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/external-users/${userId}`, {
      // Updated path
      method: "DELETE",
    });

    if (!response.ok) {
      const message = `Error deleting external user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }
  } catch (error) {
    console.error("Error in deleteExternalUser:", error);
    throw error;
  }
};
