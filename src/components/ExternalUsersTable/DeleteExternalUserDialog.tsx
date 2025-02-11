"use client";

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
import { toast } from "@/hooks/use-toast";
import { deleteExternalUser } from "@/utils/external-users-utils";
import { ExternalUser } from "@/types";
import { Trash } from "lucide-react";

interface DeleteExternalUserDialogProps {
  externalUser: ExternalUser;
  deleteOpen: boolean;
  setDeleteOpen: (deleteOpen: boolean) => void;
}

const DeleteExternalUserDialog = ({
  externalUser,
  deleteOpen,
  setDeleteOpen,
}: DeleteExternalUserDialogProps) => {
  const handleDelete = async () => {
    try {
      await deleteExternalUser(externalUser.user_id);
      toast({
        title: "Success",
        description: "External user deleted successfully.",
      });
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete external user.",
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
          <DialogTitle>Delete External User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this external user? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
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

export default DeleteExternalUserDialog;
