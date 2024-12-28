"use client";

import { HighlightCard } from "@/components/highlight-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calculator, LineChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-4 mt-32 md:mt-48">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Hero Section */}
        <Hero />

        {/* Feature Cards */}
        <FeatureCardSection />

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <h1
        className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent max-w-3xl"
        aria-label="Get Data-Driven Insights with UBC Analytics"
      >
        Get Data-Driven Insights around UBC Campus
      </h1>
      <p className="text-muted-foreground my-12 text-lg lg:max-w-2xl text-center">
        Understand course patterns, campus activity, and make informed decisions
        based on real-time and historical UBC data.
      </p>

      <div className="space-x-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          asChild
          aria-label="Try it Now"
        >
          <Link href="/grade-predictor">Try it Now</Link>
        </Button>
        <Button size="lg" variant="outline" asChild aria-label="Learn More">
          <Link href="/about">Learn More</Link>
        </Button>
      </div>
    </motion.div>
  );
}

function FeatureCardSection() {
  // TODO: consider movign this to a separate file
  const FEATURES = [
    {
      icon: Calculator,
      title: "Grade Predictions",
      description:
        "Our model analyzes historical grade distributions and patterns to provide accurate predictions for course outcomes.",
      href: "/grade-predictor",
      buttonText: "Try Grade Predictor",
    },
    {
      icon: LineChart,
      title: "GPA Boosters",
      description:
        "Find courses that are known to have high average grades and can help boost your GPA. We use a combination of historical grades and predicted grades to identify these courses.",
      href: "/gpa-boosters",
      buttonText: "View GPA Boosters",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 pt-32">
      {FEATURES.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <HighlightCard {...feature} />
        </motion.div>
      ))}
    </div>
  );
}

function FAQ() {
  const FAQ = [
    {
      question: "What kind of insights does the platform provide?",
      answer:
        "Our platform offers two main types of insights: academic predictions (including course grades and patterns) and campus analytics (such as location activity levels and optimal study times, also coming soon). All insights are data-driven and powered by machine learning.",
    },
    {
      question: "What data sources do you use?",
      answer:
        "We use UBC PAIR data for historical course information (grades, enrollment numbers, etc.) and integrate with Google Maps/Places API for real-time campus activity levels. All of our data comes from these public sources to ensure reliability and transparency.",
    },
    {
      question: "How accurate are the predictions?",
      answer:
        "Accuracy varies by prediction type. For grade predictions, our model explains about 52% of grade variance (R² score), with a root mean square error of 5.02 and mean absolute percentage error of 4.84%. Campus activity predictions are sourced directly from Google Maps data. We're transparent about our model's performance and continuously work to improve it.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "Grade data is updated each term as new information becomes available. Campus activity data is updated more frequently, typically in real-time or near-real-time, to provide current insights.",
    },
  ];

  return (
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
            {FAQ.map((faq, index) => (
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
