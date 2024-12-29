"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Info,
  Loader2,
  Notebook,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import useSWR from "swr";
import { z } from "zod";
import { Course, Subject } from "@/types";
import { Banner, BannerDescription, BannerTitle } from "@/components/banner";
import { PredictionRequestSchema } from "@/lib/schema";
import { PredictionResponse } from "@/types/api";

// TODO: Move these to a separate file
const PREDICTION_RANGE = {
  start: new Date().getFullYear(),
  years_ahead: 2,
};

const years = Array.from({ length: PREDICTION_RANGE.years_ahead + 1 }, (_, i) =>
  (PREDICTION_RANGE.start + i).toString(),
);

const formSchema = z.object({
  subject: z
    .string({
      required_error: "Please select a subject",
    })
    .min(1, "Please select a subject"),
  course: z
    .string({
      required_error: "Please select a course",
    })
    .min(1, "Please select a course"),
  year: z
    .string({
      required_error: "Please select a year",
    })
    .min(1, "Please select a year"),
});

const chartConfig = {
  predicted: {
    label: "Predicted Average",
    color: "hsl(var(--chart-1))",
  },
  historical: {
    label: "Historical Average",
    color: "hsl(var(--chart-2))",
  },
  historical_predicted: {
    label: "Historical Predicted Average",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type FormValues = z.infer<typeof formSchema>;

export default function GradePredictor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [openSubject, setOpenSubject] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  const {
    data: subjects,
    error: subjectsError,
    isLoading: isLoadingSubjects,
  } = useSWR("/api/v1/subjects", fetcher, {
    revalidateOnFocus: false,
    retry: 3,
    dedupingInterval: 60000,
  });

  const form = useForm({
    resolver: zodResolver(PredictionRequestSchema),
    defaultValues: {
      subject: "",
      course: "",
      year: "",
    },
    mode: "onChange",
  });

  const selectedSubject = form.watch("subject");
  const { data: courses, error: coursesError } = useSWR(
    selectedSubject
      ? `/api/v1/subjects/courses?subject=${selectedSubject}`
      : null,
    fetcher,
  );

  if (coursesError) {
    return (
      <Banner variant="error">
        <BannerTitle>Error</BannerTitle>
        <BannerDescription>
          Failed to load courses. Please try again.
        </BannerDescription>
      </Banner>
    );
  }

  const onSubmit = async (values: FormValues) => {
    // TODO: add analytics tracking
    setError("");
    setPrediction(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get prediction");
      }

      const data = await response.json();
      setPrediction(data);
      setHistoricalData(data.historical_data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get prediction. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (subjectsError) {
    return (
      <Banner variant="error">
        <BannerTitle>Error</BannerTitle>
        <BannerDescription>
          Failed to load subjects. Please refresh the page.
        </BannerDescription>
      </Banner>
    );
  }

  return (
    <main className="min-h-screen p-4 mt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <CardTitle>Grade Predictor</CardTitle>
                <CardDescription>
                  Enter your course details to get a predicted grade based on
                  historical data.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        name: "subject",
                        label: "Subject",
                        type: "subject-select",
                        description: "Choose the main subject area",
                        icon: <BookOpen className="h-3.5 w-3.5" />,
                      },
                      {
                        name: "course",
                        label: "Course",
                        type: "course-select",
                        description: "Select the specific course",
                        icon: <Notebook className="h-3.5 w-3.5" />,
                      },
                      {
                        name: "year",
                        label: "Prediction Year",
                        type: "year-select",
                        description: "Select the year you want to predict",
                        icon: <Calendar className="h-3.5 w-3.5" />,
                        options: years.map((year) => ({
                          value: year,
                          label: year,
                        })),
                      },
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <FormField
                          control={form.control}
                          name={field.name as keyof FormValues}
                          render={({ field: formField }) => (
                            <FormItem className="bg-secondary/50 p-4 rounded-lg border border-secondary transition-all duration-300 hover:border-primary/20">
                              <FormLabel className="flex items-center gap-2">
                                <span className="p-1.5 bg-primary/10 rounded-full">
                                  {field.icon}
                                </span>
                                {field.label}
                              </FormLabel>
                              <FormControl>
                                {field.type === "subject-select" ? (
                                  <Popover
                                    open={openSubject}
                                    onOpenChange={setOpenSubject}
                                  >
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openSubject}
                                        className="w-full justify-between bg-background/50 backdrop-blur-sm"
                                      >
                                        {formField.value
                                          ? subjects?.find(
                                              (subject: Subject) =>
                                                subject.subject_code ===
                                                formField.value,
                                            )?.subject_code
                                          : "Select subject..."}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                      <Command className="max-h-[300px]">
                                        <CommandInput placeholder="Search subjects..." />
                                        <CommandEmpty>
                                          No subject found.
                                        </CommandEmpty>
                                        <CommandGroup className="overflow-auto">
                                          {subjects?.map((subject: Subject) => (
                                            <CommandItem
                                              key={subject.id}
                                              value={subject.subject_code}
                                              onSelect={(value) => {
                                                form.setValue("subject", value);
                                                form.setValue("course", "");
                                                setOpenSubject(false);
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  formField.value ===
                                                    subject.subject_code
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                              {subject.subject_code}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                ) : field.type === "course-select" ? (
                                  <Popover
                                    open={openCourse}
                                    onOpenChange={setOpenCourse}
                                  >
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCourse}
                                        className="w-full justify-between bg-background/50 backdrop-blur-sm"
                                        disabled={!selectedSubject || !courses}
                                      >
                                        {formField.value
                                          ? courses?.find(
                                              (course: Course) =>
                                                course.course_number ===
                                                formField.value,
                                            )?.course_number + // Course number
                                            " - " + // Separator
                                            courses?.find(
                                              (course: Course) =>
                                                course.course_number ===
                                                formField.value,
                                            )?.title // Course title
                                          : !selectedSubject
                                            ? "Select a subject first"
                                            : !courses
                                              ? "Loading courses..."
                                              : "Select course..."}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                      <Command className="max-h-[300px]">
                                        <CommandInput placeholder="Search courses..." />
                                        <CommandEmpty>
                                          No course found.
                                        </CommandEmpty>
                                        <CommandGroup className="overflow-auto">
                                          {courses?.map((course: Course) => (
                                            <CommandItem
                                              key={`${course.subject}${course.course_number}`}
                                              value={course.course_number}
                                              onSelect={(value) => {
                                                form.setValue("course", value);
                                                setOpenCourse(false);
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  formField.value ===
                                                    course.course_number
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                              {course.course_number}
                                              {course.title
                                                ? ` - ${course.title}`
                                                : ""}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <Select
                                    onValueChange={formField.onChange}
                                    value={formField.value}
                                  >
                                    <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                                      <SelectValue
                                        placeholder={`Select ${field.label.toLowerCase()}`}
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {field.options?.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              </FormControl>
                              <FormDescription className="text-xs">
                                {field.description}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Banner variant="warning">
                      <BannerTitle>Important</BannerTitle>
                      <BannerDescription>
                        Results should be taken as rough estimates only and may
                        not accurately reflect future performance.
                      </BannerDescription>
                    </Banner>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      disabled={isLoading || !form.formState.isValid}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                          <span>Predicting...</span>
                        </>
                      ) : (
                        "Predict Grade"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>

            {error && (
              <Alert variant="destructive" className="mt-4 mx-6">
                <AlertDescription>{error}</AlertDescription>
                <Button onClick={() => form.handleSubmit(onSubmit)()}>
                  Try Again
                </Button>
              </Alert>
            )}

            {prediction && (
              <>
                <Separator className="my-8" />
                <CardFooter className="flex flex-col space-y-4">
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

                    <CardHeader className="pb-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl font-bold tracking-tight">
                            Prediction Results
                          </CardTitle>
                          <div className="px-3 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/20 shadow-sm text-nowrap">
                            {prediction.request_details.session}
                            {prediction.request_details.year}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        {/* Predicted Average */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                            Predicted Average
                          </div>
                          <div className="relative">
                            <div className="text-3xl font-bold text-emerald-400 text-center">
                              {prediction.predicted_avg.toFixed(1)}%
                            </div>
                            <div className="absolute -top-1 -right-1 h-8 w-8 bg-emerald-500/10 rounded-full blur-lg" />
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            Course Details
                          </div>
                          <div className="text-sm text-muted-foreground text-center">
                            {prediction.request_details.subject}{" "}
                            {prediction.request_details.course}
                            <br />
                            at {prediction.request_details.campus}
                          </div>
                        </div>
                      </div>

                      {/* Additional Stats */}
                      <div className="mt-6 pt-4 border-t border-border/50">
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            Generated in{" "}
                            {(prediction.timing.total_time * 1000).toFixed()}
                            ms
                          </div>

                          <Link
                            href="/how-we-predict-grades"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors relative z-10"
                          >
                            <Info className="h-3.5 w-3.5" />
                            Learn about the model
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Card>

                  {/* Grade Chart */}
                  {historicalData.length === 0 ? (
                    <Banner variant="error">
                      <BannerTitle>No Historical Data</BannerTitle>
                      <BannerDescription>
                        This course does not have enough historical data to
                        render a chart.
                      </BannerDescription>
                    </Banner>
                  ) : (
                    <GradeChart data={historicalData} />
                  )}
                </CardFooter>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}

function GradeChart({ data }: { data: any }) {
  return (
    <div className="flex justify-center">
      <ChartContainer
        config={chartConfig}
        className="min-h-[250px] w-full max-w-[90vw] mr-10 mt-10"
        aria-label="Historical grade data chart"
      >
        <AreaChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.split("-")[0]}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="average"
            type="natural"
            fill="var(--color-historical)"
            stroke="var(--color-historical)"
            name={chartConfig.historical.label}
          />
          <Area
            dataKey="predicted_avg"
            type="natural"
            fill="var(--color-predicted)"
            stroke="var(--color-predicted)"
            name={chartConfig.predicted.label}
          />
          <Area
            dataKey="historical_predicted"
            type="natural"
            fill="var(--color-historical-predicted)"
            stroke="var(--color-historical-predicted)"
            name={chartConfig.historical_predicted.label}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
