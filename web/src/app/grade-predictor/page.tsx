"use client";

import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  ChevronsUpDown,
  AlertTriangle,
  ChevronRight,
  Info,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetcher } from "@/lib/utils";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartTooltip,
  ChartLegend,
  ChartConfig,
} from "@/components/ui/chart";

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

export default function GradePredictor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [openSubject, setOpenSubject] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  const { data: subjects, error: subjectsError } = useSWR(
    "/api/v1/subjects",
    fetcher,
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      course: "",
      year: "",
    },
  });

  const selectedSubject = form.watch("subject");
  const { data: courses, error: coursesError } = useSWR(
    selectedSubject
      ? `/api/v1/subjects/courses?subject=${selectedSubject}`
      : null,
    fetcher,
  );

  const onSubmit = async (values) => {
    setError("");
    setPrediction(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      setPrediction(data);
      setHistoricalData(data.historical_data);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (subjectsError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load subjects. Please refresh the page.
        </AlertDescription>
      </Alert>
    );
  }

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
                    <FormItem className="flex flex-col">
                      <FormLabel>Subject</FormLabel>
                      <Popover open={openSubject} onOpenChange={setOpenSubject}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openSubject}
                              className="w-full justify-between"
                            >
                              {field.value
                                ? subjects?.find(
                                    (subject) =>
                                      subject.subject_code === field.value,
                                  )?.subject_code
                                : "Select subject..."}
                              <ChevronsUpDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[--radix-popover-trigger-width] min-w-[var(--radix-popover-trigger-width)]">
                          <Command className="max-h-[300px]">
                            <CommandInput placeholder="Search subjects..." />
                            <CommandEmpty>No subject found.</CommandEmpty>
                            <CommandGroup className="overflow-auto">
                              {subjects?.map((subject) => (
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
                                      field.value === subject.subject_code
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Course</FormLabel>
                      <Popover open={openCourse} onOpenChange={setOpenCourse}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCourse}
                              className="w-full justify-between"
                              disabled={!selectedSubject || !courses}
                            >
                              {field.value
                                ? courses?.find(
                                    (course) =>
                                      course.course_number === field.value,
                                  )?.course_number
                                : !selectedSubject
                                  ? "Select a subject first"
                                  : !courses
                                    ? "Loading courses..."
                                    : "Select course..."}
                              <ChevronsUpDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[--radix-popover-trigger-width] min-w-[var(--radix-popover-trigger-width)]">
                          <Command className="max-h-[300px]">
                            <CommandInput placeholder="Search courses..." />
                            <CommandEmpty>No course found.</CommandEmpty>
                            <CommandGroup className="overflow-auto">
                              {courses?.map((course) => (
                                <CommandItem
                                  key={course.id}
                                  value={course.course_number}
                                  onSelect={(value) => {
                                    form.setValue("course", value);
                                    setOpenCourse(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === course.course_number
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {course.course_number}
                                  {course.title ? ` - ${course.title}` : ""}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the specific course
                      </FormDescription>
                      <FormMessage />
                      {coursesError && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertDescription>
                            Failed to load courses. Please try again.
                          </AlertDescription>
                        </Alert>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prediction Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year to predict" />
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
                        Select the year you want to predict
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Alert className="border-amber-600/30 bg-amber-600/40 shadow">
                  <AlertTitle className="text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                    Important
                  </AlertTitle>
                  <AlertDescription className="text-sm mt-1.5">
                    Results should be taken as rough estimates only and may not
                    accurately reflect future performance.
                  </AlertDescription>
                </Alert>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isLoading ||
                    !form.formState.isValid ||
                    !form.getValues("subject") ||
                    !form.getValues("course") ||
                    !form.getValues("year")
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
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
            <>
              <Separator className="my-8" />
              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full p-6 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">
                      Prediction Results
                    </h3>
                    <div className="px-2 py-1 bg-primary/20 rounded text-xs text-primary">
                      {prediction.request_details.session}{" "}
                      {prediction.request_details.year}
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-4xl font-bold tracking-tight">
                      {prediction.predicted_avg.toFixed(1)}%
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      for {""}
                      {prediction.request_details.subject}{" "}
                      {prediction.request_details.course} at{" "}
                      {prediction.request_details.campus}
                    </p>
                  </div>

                  <div className="my-6 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <p>
                      Generated in{" "}
                      {(prediction.timing.total_time * 1000).toFixed()}ms
                    </p>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs hover:bg-transparent hover:text-primary group"
                    asChild
                  >
                    <Link
                      href="/how-we-predict-grades"
                      className="flex items-center gap-1.5"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Learn about the prediction model
                      <ChevronRight className="group-hover:translate-x-1 transition-transform h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {historicalData.length == 0 ? (
                  <Alert variant="destructive" className="mt-2">
                    <AlertTitle>
                      Error fetching data for{" "}
                      {prediction.request_details.subject}:{" "}
                      {prediction.request_details.course}
                    </AlertTitle>
                    <AlertDescription>
                      This course does not have enough historical data to render
                      a chart.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="flex justify-center">
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[250px] w-[90vw] mr-10 mt-10"
                    >
                      <AreaChart
                        accessibilityLayer
                        data={historicalData}
                        // margin={{
                        //   left: 12,
                        //   right: 12,
                        // }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="year"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.split("-")[0]} // Display only the year part
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
                        {/* Add historical predicted area */}
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
                )}
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
