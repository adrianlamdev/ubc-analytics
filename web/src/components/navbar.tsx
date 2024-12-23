"use client";

import { useState } from "react";
import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Menu,
  LineChart,
  Book,
  TrendingUp,
  ChevronRight,
  Info,
  Github,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const toolsItems = [
  {
    title: "Grade Predictor",
    href: "/grade-predictor",
    description: "Predict final grades",
    icon: LineChart,
  },
  {
    title: "GPA Boosters",
    href: "/gpa-boosters",
    description: "Discover GPA boosters",
    icon: TrendingUp,
  },
];

const navigationItems = [
  {
    name: "API Docs",
    href: "#",
    icon: Book,
    disabled: true,
    comingSoon: true,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "GitHub",
    href: "https://github.com/adrianlamdev/ubc-analytics",
    icon: Github,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b m">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            UBC Analytics
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {toolsItems.map((tool) => (
                      <ListItem
                        key={tool.title}
                        href={tool.href}
                        icon={
                          <tool.icon className="h-6 w-6 text-muted-foreground" />
                        }
                        title={tool.title}
                        description={tool.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name} className="flex gap-2">
                  {item.comingSoon ? (
                    <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground/50 cursor-default">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </span>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <span className="flex items-center">{item.name}</span>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  UBC Analytics
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-1">
                {/* Tools Section in Mobile Menu */}
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Tools
                </div>
                {toolsItems.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 font-normal"
                    >
                      <tool.icon className="h-4 w-4" />
                      {tool.title}
                    </Button>
                  </Link>
                ))}

                <div className="mt-4 px-3 py-2 text-sm font-medium text-muted-foreground">
                  Other
                </div>
                {navigationItems.map((item) =>
                  item.comingSoon ? (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start gap-2 font-normal opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-auto">
                        Coming Soon
                      </span>
                    </Button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 font-normal"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                className="w-full justify-start gap-2 mt-4"
                asChild
              >
                <Link
                  href="https://github.com/adrianlamdev/ubc-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementProps<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode;
    title: string;
    description?: string;
  }
>(({ className, title, icon, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors relative"
          {...props}
        >
          <div className="flex items-center gap-3 group">
            {icon && (
              <div className="bg-secondary/50 rounded-md border border-secondary flex items-center justify-center p-1.5 transition-colors group-hover:bg-accent group-hover:border-accent-foreground/20">
                {icon}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium leading-none">{title}</span>
              {description && (
                <span className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-accent-foreground transition-colors text-nowrap">
                  {description}
                </span>
              )}
            </div>
            <ChevronRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 text-accent-foreground ml-auto" />
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
