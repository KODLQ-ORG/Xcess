// src/components/UserReview.tsx
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types";

const UserReview = ({ users }: { users: User[] }) => {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>User Review</h1>
      <div className="mt-4">
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
      </div>

      {selectedUser && ( // Conditionally render user details
        <div className="mt-8">
          <h2>Selected User Details</h2>
          <p>User ID: {selectedUser}</p>
          {/* Display other user details here */}
        </div>
      )}
    </div>
  );
};

export default UserReview;
