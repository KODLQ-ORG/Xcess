// src/components/FetchEntraIDUsersButton.tsx
"use client";

import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const FetchEntraIDUsersButton = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/users/fetch-from-entra-id", {
        method: "POST",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description:
            "Users fetched from Entra ID and updated in the database.",
        });
      } else {
        const message = `Error fetching users from Entra ID: ${response.status} ${response.statusText}`;
        console.error(message);
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching users from Entra ID:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users from Entra ID.",
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleClick}>Fetch Users from Entra ID</Button>;
};

export default FetchEntraIDUsersButton;
