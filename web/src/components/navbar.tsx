"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, LineChart, Book, TrendingUp, Info, Github } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
  {
    name: "Grade Predictor",
    href: "/grade-predictor",
    icon: LineChart,
  },
  {
    name: "GPA Boosters",
    href: "/gpa-boosters",
    icon: TrendingUp,
  },
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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            UBC Analytics
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <div key={item.name}>
                item.comingSoon ? (
                <TooltipProvider>
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground/50 cursor-not-allowed">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
                ),
              </div>
            ))}
          </div>

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
                  href="https://github.com/adrianlamdev/ubc-grades-analysis"
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
