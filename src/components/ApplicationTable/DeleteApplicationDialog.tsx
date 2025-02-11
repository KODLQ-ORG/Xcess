// src/components/DeleteApplicationDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteApplication } from "@/utils/application-utils";
import { toast } from "@/hooks/use-toast";
import { Application } from "@/types";
import { Trash } from "lucide-react";

interface DeleteApplicationDialogProps {
  application: Application;
  deleteOpen: boolean;
  setDeleteOpen: (deleteOpen: boolean) => void;
}

const DeleteApplicationDialog = ({
  application,
  deleteOpen,
  setDeleteOpen,
}: DeleteApplicationDialogProps) => {
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText === application.application_name) {
      try {
        await deleteApplication(application.application_id);
        toast({
          title: "Success",
          description: "Application deleted successfully.",
        });
        setDeleteOpen(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete application.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Incorrect application name entered.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this application? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <p className="mb-2">
            To confirm, please type the application name:{" "}
            <strong>{application.application_name}</strong>
          </p>
          <Input
            placeholder="Type the application name"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleDelete}>Confirm Delete</Button>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteApplicationDialog;
