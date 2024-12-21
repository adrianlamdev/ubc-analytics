"use client";

import useSWR from "swr";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Info, Loader2 } from "lucide-react";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
] as const;

const COURSES = {
  Mathematics: ["Calculus I", "Calculus II", "Linear Algebra", "Statistics"],
  Physics: ["Mechanics", "Electromagnetism", "Quantum Physics"],
  Chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
  Biology: ["Cell Biology", "Genetics", "Ecology"],
  "Computer Science": ["Programming", "Data Structures", "Algorithms"],
  English: ["Literature", "Composition", "Creative Writing"],
  History: ["World History", "US History", "European History"],
} as const;

const formSchema = z.object({
  subject: z.enum(SUBJECTS, {
    required_error: "Please select a subject",
  }),
  course: z.string({
    required_error: "Please select a course",
  }),
  year: z.string({
    required_error: "Please select a year",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const GradePredictor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    predictedGrade: string;
    confidence: string;
  } | null>(null);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: undefined,
      course: undefined,
      year: undefined,
    },
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const onSubmit = async (values: FormValues) => {
    setError("");
    setPrediction(null);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockPrediction = {
        predictedGrade: (Math.random() * 4 + 1).toFixed(2),
        confidence: (Math.random() * 20 + 80).toFixed(1),
      };
      setPrediction(mockPrediction);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 mt-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Grade Predictor</CardTitle>
            <CardDescription>
              Enter your course details to get a predicted grade based on
              historical data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("course", "");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger aria-label="Select subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the main subject area
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("subject")}
                      >
                        <FormControl>
                          <SelectTrigger aria-label="Select course">
                            <SelectValue
                              placeholder={
                                form.watch("subject")
                                  ? "Select a course"
                                  : "Select a subject first"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {form.watch("subject") &&
                            COURSES[form.watch("subject")]?.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the specific course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger aria-label="Select academic year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the academic year
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <Alert variant="destructive" role="alert">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !form.formState.isValid}
                  aria-label={
                    isLoading ? "Predicting grade..." : "Predict grade"
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Predicting...</span>
                    </>
                  ) : (
                    "Predict Grade"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          {prediction && (
            <CardFooter className="flex flex-col space-y-4">
              <div
                className="w-full p-4 bg-primary/10 rounded-lg"
                role="alert"
                aria-live="polite"
              >
                <h3 className="font-semibold text-primary">
                  Prediction Results
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    Predicted GPA:{" "}
                    <span className="font-bold">
                      {prediction.predictedGrade}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {prediction.confidence}%
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                asChild
              >
                <Link href="/how-we-predict-grades">
                  <Info className="w-4 h-4" />
                  <span>Learn how we calculate this</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GradePredictor;
