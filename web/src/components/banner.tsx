import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import React, { createContext, useContext } from "react";

const BannerContext = createContext<"info" | "warning" | "error">("info");

interface BannerProps {
  variant: "info" | "warning" | "error";
  children: React.ReactNode;
}

export function Banner({ variant, children }: BannerProps) {
  let className = "";

  switch (variant) {
    case "info":
      className = "border-blue-600/30 bg-blue-600/40 shadow";
      break;
    case "error":
      className = "border-rose-600/30 bg-rose-600/40 shadow";
      break;
    case "warning":
      className = "border-amber-600/30 bg-amber-600/40 shadow";
      break;
    default:
      break;
  }

  return (
    <BannerContext.Provider value={variant}>
      <Alert className={className}>{children}</Alert>
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
