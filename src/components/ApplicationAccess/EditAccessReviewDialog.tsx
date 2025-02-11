// src/components/AccessReviewDialogs/EditAccessReviewDialog.tsx
"use client";

import { useForm } from "react-hook-form";
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
import { toast } from "@/hooks/use-toast";
import { editAccessReview } from "@/utils/access-review-utils";
import { AccessReview, NewAccessReview } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useApplicationData } from "@/app/providers";
import { Edit } from "lucide-react";

const formSchema = z.object({
  access_level: z.string().min(2, {
    message: "Access Level must be at least 2 characters.",
  }),
  access_justification: z.string().min(1, {
    message: "Access Justification is required",
  }),
  access_approver: z.string().min(2, {
    message: "Access Approver is required",
  }),
});

interface EditAccessReviewDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  accessReview: AccessReview;
}

const EditAccessReviewDialog = ({
  open,
  setOpen,
  accessReview,
}: EditAccessReviewDialogProps) => {
  const { data: session } = useSession();
  const { users } = useApplicationData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access_level: accessReview.access_level || "",
      access_justification: accessReview.access_justification || "",
      access_approver: accessReview.access_approver || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedAccessReview: NewAccessReview = {
      ...accessReview,
      ...values,
      access_approver: users.find((user) => session?.user.email === user.email)
        ?.user_id as string,
    };
    try {
      await editAccessReview(accessReview, updatedAccessReview);
      toast({
        title: "Success",
        description: "Access review updated successfully.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update access review.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {accessReview.user_id}</DialogTitle>
          <DialogDescription>
            Make changes to {accessReview.user_id} here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="access_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Level</FormLabel>
                  <FormControl>
                    <Input placeholder="Access Level" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="access_justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Justification</FormLabel>
                  <FormControl>
                    <Input placeholder="Access Justification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="access_approver"
              render={() => (
                <FormItem>
                  <FormLabel>Access Approver</FormLabel>
                  <FormControl>
                    <Input value={session?.user.email as string} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccessReviewDialog;
