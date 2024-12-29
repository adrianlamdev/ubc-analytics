import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const BannerContext = createContext<"info" | "warning" | "error">("info");

interface BannerProps {
  variant: "info" | "warning" | "error";
  className?: string;
  children: React.ReactNode;
}

export function Banner({ variant, className, children }: BannerProps) {
  let variantClasses = "";
  switch (variant) {
    case "info":
      variantClasses = "border-blue-600/30 bg-blue-600/40 shadow";
      break;
    case "error":
      variantClasses = "border-rose-600/30 bg-rose-600/40 shadow";
      break;
    case "warning":
      variantClasses = "border-amber-600/30 bg-amber-600/40 shadow";
      break;
    default:
      break;
  }
  return (
    <BannerContext.Provider value={variant}>
      <Alert className={cn(variantClasses, className)}>{children}</Alert>
    </BannerContext.Provider>
  );
}

interface BannerTitleProps {
  children: React.ReactNode;
}

export function BannerTitle({ children }: BannerTitleProps) {
  const variant = useContext(BannerContext);
  let className = "";
  let icon = null;

  switch (variant) {
    case "info":
      className = "text-blue-500 flex items-center gap-2";
      break;
    case "error":
      className = "text-rose-500 flex items-center gap-2";
      break;
    case "warning":
      className = "text-amber-500 flex items-center gap-2";
      icon = <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />;
      break;
    default:
      break;
  }

  return (
    <AlertTitle className={className}>
      {icon} {children}
    </AlertTitle>
  );
}

interface BannerDescriptionProps {
  children: React.ReactNode;
}

export function BannerDescription({ children }: BannerDescriptionProps) {
  return (
    <AlertDescription className="text-sm mt-1.5">{children}</AlertDescription>
  );
}
