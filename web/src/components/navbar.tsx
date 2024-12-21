import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="px-4 py-3 border-b border-dashed flex items-center justify-between">
      <Link href="/" className="font-semibold text-xl tracking-tight">
        UBC Grade Predictor
      </Link>
      <Button size="icon" variant="ghost">
        <Menu />
      </Button>
    </nav>
  );
}
