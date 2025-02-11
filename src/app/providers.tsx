// app/providers.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Application, ApplicationReviewer, ExternalUser, User } from "@/types";
import { ThemeProvider } from "@/components/ui/theme-provider";

const ApplicationDataContext = createContext<{
  users: User[];
  applications: Application[];
  externalUsers: ExternalUser[];
  reviewers: ApplicationReviewer[];
  isLoading: boolean;
  disabledUsers: User[];
}>({
  users: [],
  applications: [],
  externalUsers: [],
  reviewers: [],
  isLoading: true,
  disabledUsers: [],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AuthProvider>
          <ApplicationDataProvider>{children}</ApplicationDataProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

// Provider component to make the data available to the application
export const ApplicationDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [externalUsers, setExternalUsers] = useState<ExternalUser[]>([]); // Add state for external users
  const [reviewers, setReviewers] = useState<ApplicationReviewer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabledUsers, setDisabledUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        data.sort((a: User, b: User) =>
          a.display_name.localeCompare(b.display_name)
        );
        const inactiveUsers = data.filter((user: User) => !user.is_active);
        setDisabledUsers(inactiveUsers);
        const activeUsers = data.filter((user: User) => user.is_active);
        setUsers(activeUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchExternalUsers = async () => {
      // Add function to fetch external users
      try {
        const response = await fetch("/api/external-users");
        const data = await response.json();
        setExternalUsers(data);
      } catch (error) {
        console.error("Error fetching external users:", error);
      }
    };
    const fetchReviewers = async () => {
      // Add function to fetch reviewers
      try {
        const response = await fetch("/api/application-reviewers"); // Update with your API endpoint
        const data = await response.json();
        setReviewers(data);
      } catch (error) {
        console.error("Error fetching reviewers:", error);
      }
    };

    fetchUsers();
    fetchApplications();
    fetchExternalUsers();
    fetchReviewers();
  }, []);

  return (
    <ApplicationDataContext.Provider
      value={{
        users,
        applications,
        externalUsers,
        reviewers,
        isLoading,
        disabledUsers,
      }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
};

// Custom hook to access the application data
export const useApplicationData = () => {
  return useContext(ApplicationDataContext);
};

// Client Component for authentication check
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Access the pathname

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/auth") {
      router.replace("/auth");
    }
  }, [session, status, router, pathname]);

  return <>{children}</>;
};
