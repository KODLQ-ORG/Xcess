// src/components/ApplicationTable/page.tsx
"use client";

import { Application } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./applications-columns";

interface ApplicationTableProps {
  applications: Application[];
}

const ApplicationTable = ({ applications }: ApplicationTableProps) => {
  return (
    <div>
      <DataTable columns={columns} data={applications} />
    </div>
  );
};

export default ApplicationTable;
