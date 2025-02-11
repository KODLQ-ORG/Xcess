// src/components/AccessReviewDialogs/DeleteAccessReviewDialog.tsx
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
import { deleteAccessReview } from "@/utils/access-review-utils";
import { AccessReview } from "@/types";
import { Trash } from "lucide-react";

interface DeleteAccessReviewDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  accessReview: AccessReview;
}

const DeleteAccessReviewDialog = ({
  open,
  setOpen,
  accessReview,
}: DeleteAccessReviewDialogProps) => {
  const handleDelete = async () => {
    try {
      await deleteAccessReview(accessReview);
      toast({
        title: "Success",
        description: "Access review deleted successfully.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete access review.",
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
          <DialogTitle>Delete Access Review</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this access review? This action
            cannot be undone.
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

export default DeleteAccessReviewDialog;
