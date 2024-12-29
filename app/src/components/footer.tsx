import { AlertCircle, BookOpen, Github, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="border-t mt-14">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="space-y-4 max-w-xl">
          <Link
            href="/"
            className="font-semibold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            UBC Metrics
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An experimental project exploring course data analytics and machine
            learning. All predictions should be considered as estimates only.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/grade-predictor"
                className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-0.5 transform duration-200"
                data-umami-event="footer_navigation"
                data-umami-event-destination="grade-predictor"
              >
                Grade Predictor
              </Link>
              <Link
                href="/gpa-boosters"
                className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-0.5 transform duration-200"
                data-umami-event="footer_navigation"
                data-umami-event-destination="gpa-boosters"
              >
                GPA Boosters
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-0.5 transform duration-200"
                data-umami-event="footer_navigation"
                data-umami-event-destination="about"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Resources & Connect</h4>
            <div className="flex flex-col space-y-3">
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start group"
                asChild
                data-umami-event="footer_navigation"
                data-umami-event-destination="github"
              >
                <Link
                  href="https://github.com/adrianlamdev/ubc-analytics"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 group-hover:translate-x-0.5 transform duration-200" />
                  Source Code
                </Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start group"
                asChild
                data-umami-event="footer_navigation"
                data-umami-event-destination="ubc_pair"
              >
                <Link
                  href="https://pair.ubc.ca/"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4 group-hover:translate-x-0.5 transform duration-200" />
                  UBC PAIR
                </Link>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-primary justify-start group"
                asChild
                data-umami-event="footer_navigation"
                data-umami-event-destination="contact"
              >
                <Link
                  href="mailto:adrian@lams.cc"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 group-hover:translate-x-0.5 transform duration-200" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer and Copyright */}
        <div className="mt-12 pt-6 border-t space-y-6">
          <div className="flex items-start gap-3 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground/70" />
            <p className="leading-relaxed">
              This educational tool is designed to assist with course planning
              and to be an overall analysis of UBC activity. It should not be
              the sole factor in your decisions. We are not officially
              affiliated with UBC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
