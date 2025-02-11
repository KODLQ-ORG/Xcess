// src/components/AccessReviewDialogs/AddAccessReviewDialog.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createAccessReview } from "@/utils/access-review-utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  access_level: z.string().min(2, {
    message: "Access Level must be at least 2 characters.",
  }),
  access_justification: z.string().min(1, {
    message: "Access Justification is required",
  }),
  user_id: z.string().min(2, {
    message: "User is required",
  }),
  access_approver: z.string(),
});

interface AddAccessReviewDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  applicationId: number;
  setRefreshTrigger: (value: boolean) => void;
}

const AddAccessReviewDialog = ({
  open,
  setOpen,
  applicationId,
  setRefreshTrigger,
}: AddAccessReviewDialogProps) => {
  const { data: session } = useSession();
  const { users } = useApplicationData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      access_level: "",
      access_justification: "",
      user_id: "",
      access_approver: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newAccessReview: NewAccessReview = {
        application_id: applicationId,
        ...values,
        access_approver: users.find(
          (user) => session?.user.email === user.email
        )?.user_id as string,
      };
      await createAccessReview(newAccessReview);

      toast({
        title: "Success",
        description: "Access review created successfully.",
      });

      form.reset();
      setOpen(false);
      setRefreshTrigger(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create access review.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Access Review</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Access Review</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.user_id} value={user.user_id}>
                            {user.display_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default AddAccessReviewDialog;
