"use client";

import {
  ChevronUp,
  Home,
  User2,
  BookUser,
  BookOpenText,
  UserRoundSearch,
  Users,
  UserRoundX,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import SignOutButton from "../SignOutButton";
import { useSession } from "next-auth/react";
import SignInButton from "../SignInButton";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: BookOpenText,
  },
  {
    title: "My Applications",
    url: "/my-applications",
    icon: BookUser,
  },
  {
    title: "User Review",
    url: "/user-review",
    icon: UserRoundSearch,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "External Users",
    url: "/external-users",
    icon: Users,
  },
  {
    title: "Disabled Users",
    url: "/disabled-users",
    icon: UserRoundX,
  },
];

export function AppSidebar() {
  const session = useSession();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <SidebarGroupLabel>Xensam</SidebarGroupLabel>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {session.data ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {session.data?.user.name || "Username"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <ModeToggle />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Account
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <SignInButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
