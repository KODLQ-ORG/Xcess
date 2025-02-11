// src/components/UserTable/DeleteUserDialog.tsx
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
import { deleteUser } from "@/utils/users";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types";

import { Trash } from "lucide-react";

interface DeleteUserDialogProps {
  user: User;
  open: boolean;
  setOpen: (deleteOpen: boolean) => void;
}

const DeleteUserDialog = ({ user, open, setOpen }: DeleteUserDialogProps) => {
  const handleDelete = async () => {
    try {
      await deleteUser(user.user_id);
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete}>Confirm Delete</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
