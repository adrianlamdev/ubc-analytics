"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calculator, LineChart, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen p-4 mt-32">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Get insights on grades and trends at UBC.
          </h1>
          <p className="text-muted-foreground my-12 text-lg">
            Make informed decisions about your course selection using machine
            learning predictions based on historical grade data.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              asChild
            >
              <Link href="/grade-predictor">Try it Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Grade Predictions</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                {" "}
                {/* Added z-10 */}
                <p className="text-sm text-muted-foreground mb-6 text-left">
                  Our model analyzes historical grade distributions and patterns
                  to provide accurate predictions for course outcomes.
                </p>
                <Link href="/grade-predictor" className="block w-full">
                  <Button className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <span>Try Grade Predictor</span>
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>GPA Boosters</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                {" "}
                {/* Added z-10 */}
                <p className="text-sm text-muted-foreground mb-6 text-left">
                  Find courses that are known to have high average grades and
                  can help boost your GPA. We use a combination of historical
                  grades and predicted grades to identify these courses.
                </p>
                <Link href="/gpa-boosters" className="block w-full">
                  <Button className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <span>View GPA Boosters</span>
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none" />
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-20"
        >
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How accurate are the predictions?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-left">
                    Our predictions are based on historical grade data and
                    various factors like course difficulty, instructor history,
                    and enrollment patterns. While no prediction is perfect, our
                    model provides a data-driven estimate to help inform your
                    decisions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    What data is used for predictions?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-left">
                    We analyze anonymized historical grade data from UBC
                    courses, including factors like average grades, enrollment
                    numbers, and course levels. All predictions are made using
                    publicly available data.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    How often is the data updated?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-left">
                    Our database is updated regularly with new grade data as it
                    becomes available. The model is retrained periodically to
                    maintain accuracy and incorporate the latest trends.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
