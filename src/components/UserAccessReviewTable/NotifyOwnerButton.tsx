"use client";

import { Application, User } from "@/types";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

// Import the notifyOwner server action
import { notifyOwner } from "./notifyOwner";

const NotifyOwnerButton = ({
  application_owner,
  user,
  application,
}: {
  application_owner: User;
  user: User;
  application: Application;
}) => {
  const handleClick = async () => {
    try {
      // Call the notifyOwner server action
      await notifyOwner(application_owner, user, application);

      toast({
        title: "Notification Sent",
        description: `The owner ${application_owner.display_name} has been notified.`,
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send notification.",
      });
    }
  };

  return <Button onClick={handleClick}>Notify Owner</Button>;
};

export default NotifyOwnerButton;
