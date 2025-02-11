// src/utils/user-utils.ts

import { User } from "@/types";

export const createUser = async (user: User) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const message = `Error creating user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

export const editUser = async (userId: string, updatedData: Partial<User>) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const message = `Error updating user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in editUser:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const message = `Error deleting user: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};
