import { Separator } from "./ui/separator";
import Link from "next/link";
import { Github, Mail, AlertCircle, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            UBC Analytics
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An experimental project exploring course data analytics and machine
            learning. All predictions should be considered as estimates only.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/grade-predictor"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Grade Predictor
              </Link>
              <Link
                href="/gpa-boosters"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GPA Boosters
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Resources & Connect</h4>
            <div className="flex flex-col space-y-2">
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start"
                asChild
              >
                <Link
                  href="https://github.com/adrianlamdev/ubc-grades-analysis"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start"
                asChild
              >
                <Link
                  href="https://pair.ubc.ca/"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4" />
                  UBC PAIR
                </Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start"
                asChild
              >
                <Link
                  href="mailto:adrian@lams.cc"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-8 pt-4 border-t space-y-4">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed text-muted-foreground">
              This educational tool is designed to assist with course planning
              and to be an overall analysis of UBC activity. It should not be
              the sole factor in your decisions. We are not officially
              affiliated with UBC.
            </p>
          </div>
          <Separator />

          <p className="text-muted-foreground text-center text-xs">
            Built with ♥️ by Adrian Lam
          </p>
        </div>
      </div>
    </footer>
  );
}
