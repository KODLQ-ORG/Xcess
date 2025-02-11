// src/components/CreateApplicationDialog.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "@/hooks/use-toast";

import { createApplication } from "@/utils/application-utils";

import { useApplicationData } from "@/app/providers";
import { useState } from "react";
import { NewApplication } from "@/types";

const authMethodOptions = [
  "SSO",
  "VPN + Email + Password",
  "MFA + Email + Password",
  "MFA + Email",
  "Email + Password",
  "PNR + BankID",
];

const applicationStatusOptions = [
  "Active",
  "Under Review",
  "Flagged",
  "On Hold",
  "Approved",
  "Rejected",
  "Offboarded",
  "Archived",
];

const formSchema = z.object({
  application_name: z.string().min(2, {
    message: "Application name must be at least 2 characters.",
  }),
  application_owner: z.string().min(1, {
    message: "Choose an owner for the application",
  }),
  auth_method: z.string().min(2, {
    message: "Choose one option",
  }),
  application_status: z.string().min(2, {
    message: "Choose one option",
  }),
  application_purpose: z.string().min(2, {
    message: "Application purpose must be at least 2 characters.",
  }),
  pii: z.boolean(),
  financial_data: z.boolean(),
  intellectual_property: z.boolean(),
});

const CreateApplicationDialog = () => {
  const { users } = useApplicationData();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application_name: "",
      application_owner: "",
      auth_method: "",
      pii: false,
      financial_data: false,
      intellectual_property: false,
      application_status: "",
      application_purpose: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newApplication: NewApplication = values;
      await createApplication(newApplication);
      setOpen(false);
      toast({
        title: "Success",
        description: "Application created successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create application.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>Add a new application here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="application_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Application Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="application_owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Owner</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.user_id} value={user.user_id}>
                          {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="auth_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authMethodOptions.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="application_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {applicationStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="application_purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the purpose" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pii"
                  checked={form.watch("pii")}
                  onCheckedChange={(checked: boolean) =>
                    form.setValue("pii", checked)
                  }
                />
                <label htmlFor="pii">PII</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="financial_data"
                  checked={form.watch("financial_data")}
                  onCheckedChange={(checked: boolean) =>
                    form.setValue("financial_data", checked)
                  }
                />
                <label htmlFor="financial_data">Financial Data</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="intellectual_property"
                  checked={form.watch("intellectual_property")}
                  onCheckedChange={(checked: boolean) =>
                    form.setValue("intellectual_property", checked)
                  }
                />
                <label htmlFor="intellectual_property">
                  Intellectual Property
                </label>
              </div>
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateApplicationDialog;
