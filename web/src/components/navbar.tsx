"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Book,
  ChevronRight,
  GitBranch,
  Github,
  Info,
  LineChart,
  Menu,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";

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
  {
    title: "Course Reviews",
    href: "#",
    description: "View course reviews",
    icon: Star,
    disabled: true,
    comingSoon: true,
  },
  {
    title: "Prerequisite Visualizer",
    href: "#",
    description: "View course prerequisites graph",
    icon: GitBranch,
    disabled: true,
    comingSoon: true,
  },
];

const navigationItems = [
  {
    name: "API Docs",
    href: "#",
    disabled: true,
    comingSoon: true,
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b m">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-24">
            <Link
              href="/"
              className="font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              UBC Metrics
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex md:justify-center">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-2 gap-3 p-4 min-w-[600px] w-max">
                      {toolsItems.map((tool) => (
                        <ListItem
                          key={tool.title}
                          href={tool.href}
                          icon={
                            <tool.icon className="h-5 w-5 text-muted-foreground" />
                          }
                          title={tool.title}
                          description={tool.description}
                          disabled={tool.disabled}
                          comingSoon={tool.comingSoon}
                          data-umami-event="nav_tool_select"
                          data-umami-event-tool={tool.title}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navigationItems
                  .filter((item) => item.name !== "")
                  .map((item) => (
                    <NavigationMenuItem key={item.name} className="flex">
                      {item.comingSoon ? (
                        <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground/50 cursor-default">
                          {item.name}
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        </span>
                      ) : (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink className="px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <span className="flex items-center gap-2">
                              {item.name}
                            </span>
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Button
            asChild
            size="icon"
            className="rounded-full p-1 h-8 w-8 hidden md:flex"
            variant="secondary"
          >
            <Link
              href="https://github.com/adrianlamdev/ubc-analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-umami-event="nav_github_click"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>

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
            <SheetContent className="w-full sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="text-left font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  UBC Metrics
                </SheetTitle>
              </SheetHeader>

              {/* Main Content */}
              <div className="px-4 py-6 space-y-6">
                {/* Tools Section */}
                <div className="space-y-2">
                  <div className="px-2 text-sm font-semibold text-muted-foreground/70 uppercase tracking-wider">
                    Tools
                  </div>
                  <div className="space-y-1">
                    {toolsItems.map((tool) =>
                      tool.comingSoon ? (
                        <Button
                          key={tool.title}
                          variant="ghost"
                          className="w-full justify-start gap-3 font-normal opacity-50 cursor-not-allowed h-auto py-3"
                          disabled
                        >
                          <div className="bg-secondary/50 rounded-md border border-secondary p-1.5">
                            <tool.icon className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col items-start gap-0.5 text-left">
                            <span>{tool.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {tool.description}
                            </span>
                          </div>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-auto">
                            Coming Soon
                          </span>
                        </Button>
                      ) : (
                        <Link
                          key={tool.title}
                          href={tool.href}
                          onClick={() => setOpen(false)}
                          className="block"
                          data-umami-event="mobile_nav_select"
                          data-umami-event-destination={tool.title}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 font-normal h-auto py-3 group"
                          >
                            <div className="bg-secondary/50 rounded-md border border-secondary p-1.5 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                              <tool.icon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col items-start gap-0.5 text-left">
                              <span>{tool.title}</span>
                              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                {tool.description}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </Button>
                        </Link>
                      ),
                    )}
                  </div>
                </div>

                {/* Other Section */}
                <div className="space-y-2">
                  <div className="px-2 text-sm font-semibold text-muted-foreground/70 uppercase tracking-wider">
                    Other
                  </div>
                  <div className="space-y-1">
                    {navigationItems.map((item) =>
                      item.comingSoon ? (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="w-full justify-start gap-3 font-normal opacity-50 cursor-not-allowed h-auto py-3"
                          disabled
                        >
                          <span>{item.name}</span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-auto">
                            Coming Soon
                          </span>
                        </Button>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 font-normal h-auto py-3 group"
                          >
                            <span>{item.name}</span>
                            <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </Button>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto border-t p-6">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 group"
                  asChild
                >
                  <Link
                    href="https://github.com/adrianlamdev/ubc-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    data-umami-event="nav_github_click"
                  >
                    <Github className="h-4 w-4" />
                    <span>View on GitHub</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLProps<HTMLAnchorElement> & {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    disabled?: boolean;
    comingSoon?: boolean;
  }
>(
  (
    { className, title, icon, description, disabled, comingSoon, ...props },
    ref,
  ) => {
    if (comingSoon) {
      return (
        <li>
          <div className="block select-none rounded-md p-3 leading-none opacity-50">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="bg-secondary/50 rounded-md border border-secondary flex items-center justify-center p-1.5">
                  {icon}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium leading-none">
                  {title}
                </span>
                {description && (
                  <span className="line-clamp-2 text-xs leading-snug text-muted-foreground text-nowrap">
                    {description}
                  </span>
                )}
              </div>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full ml-auto">
                Coming Soon
              </span>
            </div>
          </div>
        </li>
      );
    }

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
                <span className="text-sm font-medium leading-none">
                  {title}
                </span>
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
  },
);
