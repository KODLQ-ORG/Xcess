"use client";

import { useState } from "react";
import { useApplicationData } from "@/app/providers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FullScreenLoading from "@/components/FullScreenLoading";
import UserAccessReviewTable from "@/components/UserAccessReviewTable/page";
import { TypographyH1 } from "@/components/ui/typography";

const UserReviewPage = () => {
  const { users, isLoading } = useApplicationData();
  const [selectedUser, setSelectedUser] = useState<string>("");

  const user = users.find((user) => user.user_id === selectedUser);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      {user ? (
        <TypographyH1>User Review for {user?.display_name}</TypographyH1>
      ) : (
        <TypographyH1>User Review </TypographyH1>
      )}

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
