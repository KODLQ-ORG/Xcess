"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";
import FullScreenLoading from "../FullScreenLoading";
import { Button } from "./button";
import XensamSymbolWhite from "../../../public/Xensam-Symbol-White.svg";
import XensamSymbolBlack from "../../../public/Xensam-Symbol-Black.svg";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Users",
    href: "/users",
    description: "For viewing All Users.",
  },
  {
    title: "Internal Users",
    href: "/internal-users",
    description: "For management of Internal Users.",
  },
  {
    title: "External Users",
    href: "/external-users",
    description: "For management of External Users",
  },
  {
    title: "Disabled Users",
    href: "/disabled-users",
    description: "For mangement of users that are Disabled.",
  },
];

export function NavBar() {
  const session = useSession();
  const theme = useTheme();

  if (!theme.resolvedTheme || !session || session.status === "loading") {
    return <FullScreenLoading></FullScreenLoading>;
  }
  if (session.status === "unauthenticated") {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/home">
                {theme.resolvedTheme === "dark" && (
                  <Image
                    src={XensamSymbolWhite} // Replace with your company logo path
                    alt="Company Logo"
                    width={100} // Adjust size as needed
                    height={100}
                    className="mr-4" // Add margin to separate from menu items
                  />
                )}
                {theme.resolvedTheme === "light" && (
                  <Image
                    src={XensamSymbolBlack} // Replace with your company logo path
                    alt="Company Logo"
                    width={100} // Adjust size as needed
                    height={100}
                    className="mr-4" // Add margin to separate from menu items
                  />
                )}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  if (session.status === "authenticated") {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/home">
                {theme.resolvedTheme === "dark" && (
                  <Image
                    src={XensamSymbolWhite} // Replace with your company logo path
                    alt="Company Logo"
                    width={100} // Adjust size as needed
                    height={100}
                    className="mr-4" // Add margin to separate from menu items
                  />
                )}
                {theme.resolvedTheme === "light" && (
                  <Image
                    src={XensamSymbolBlack} // Replace with your company logo path
                    alt="Company Logo"
                    width={100} // Adjust size as needed
                    height={100}
                    className="mr-4" // Add margin to separate from menu items
                  />
                )}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Application Management
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href={"/applications"}
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Applications
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Table of Applications within the company
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/my-applications"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        My Applications
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Table of Applications where you are the owner.{" "}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>User Management</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user-review" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                User Review
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Access Management Processes
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem onClick={() => signOut()}>
            <Button>Sign Out</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
