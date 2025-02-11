// src/components/ExternalUserTable/EditExternalUserDialog.tsx
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
import { editExternalUser } from "@/utils/external-users-utils";
import { ExternalUser } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Edit } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(4, {
    message: "Write the Email",
  }),
  company: z.string().min(2, {
    message: "Write company name",
  }),
});

interface EditExternalUserDialogProps {
  externalUser: ExternalUser;
  editOpen: boolean;
  setEditOpen: (editOpen: boolean) => void;
}

const EditExternalUserDialog = ({
  externalUser,
  editOpen,
  setEditOpen,
}: EditExternalUserDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: externalUser.full_name || "",
      email: externalUser.email || "",
      company: externalUser.company || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editExternalUser(externalUser.user_id, values);
      toast({
        title: "Success",
        description: "External user updated successfully.",
      });
      setEditOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update external user.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {externalUser.full_name}</DialogTitle>
          <DialogDescription>
            Make changes to {externalUser.full_name} here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>

        <DialogFooter>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditExternalUserDialog;
