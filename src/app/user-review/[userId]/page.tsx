"use client";

import { useParams } from "next/navigation";
import UserAccessReviewTable from "@/components/UserAccessReviewTable/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import { useApplicationData } from "@/app/providers";
import FullScreenLoading from "@/components/FullScreenLoading";
import { TypographyH1 } from "@/components/ui/typography";

const UserReviewPage = () => {
  const params = useParams();
  const userId = params?.userId as string;

  const { users, isLoading } = useApplicationData();
  const [selectedUser, setSelectedUser] = useState<string>(userId);

  const user = users.find((user) => user.user_id === selectedUser);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      <TypographyH1>User Review for {user?.display_name}</TypographyH1>
      <Select onValueChange={handleUserChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.user_id} value={user.user_id}>
              {user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedUser && <UserAccessReviewTable userId={selectedUser} />}
    </div>
  );
};

export default UserReviewPage;
