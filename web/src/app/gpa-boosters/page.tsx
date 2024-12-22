"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader,
  AlertTriangle,
  Info,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartTooltip,
  ChartLegend,
  ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

const chartConfig = {
  predicted: {
    label: "Predicted Average",
    color: "hsl(var(--chart-1))",
  },
  historical: {
    label: "Historical Average",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const formSchema = z.object({
  minEnrollment: z.string().transform((val) => parseInt(val, 10)),
  maxYearLevel: z.string(),
  limit: z.string(),
  includeSubjects: z.string().optional(),
  excludeSubjects: z.string().optional(),
  minHistoricalAvg: z.string().transform((val) => parseFloat(val)),
});

export default function GpaBoosters() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minEnrollment: "50",
      maxYearLevel: "2",
      limit: "10",
      includeSubjects: "",
      excludeSubjects: "",
      minHistoricalAvg: "80",
    },
  });

  const onSubmit = async (values) => {
    setError("");
    setCourses(null);
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        limit: values.limit,
        min_enrollment: values.minEnrollment,
        max_year_level: values.maxYearLevel,
        include_subjects: values.includeSubjects || "",
        exclude_subjects: values.excludeSubjects || "",
        min_historical_avg: values.minHistoricalAvg,
      });

      const response = await fetch(`/api/v1/gpa-boosters?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch GPA boosters");

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError("Failed to fetch GPA boosters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 mt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>GPA Boosters</CardTitle>
            <CardDescription>
              Find courses with historically high grades based on enrollment and
              year level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="minEnrollment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Enrollment</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            placeholder="50"
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum number of enrolled students
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxYearLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Year Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select max year level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">100 Level</SelectItem>
                            <SelectItem value="2">200 Level</SelectItem>
                            <SelectItem value="3">300 Level</SelectItem>
                            <SelectItem value="4">400 Level</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Maximum course level to include
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minHistoricalAvg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Historical Average (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            {...field}
                            placeholder="80"
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum historical grade average to include
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="limit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Results</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of results" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">5 courses</SelectItem>
                            <SelectItem value="10">10 courses</SelectItem>
                            <SelectItem value="20">20 courses</SelectItem>
                            <SelectItem value="50">50 courses</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Number of courses to display
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="includeSubjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Include Subjects (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., CPSC,MATH,STAT"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Comma-separated subject codes to include
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excludeSubjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exclude Subjects (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., BIOL,CHEM,PHYS"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Comma-separated subject codes to exclude
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Alert className="border-amber-600/30 bg-amber-600/40 shadow mt-6">
                  <AlertTitle className="text-amber-500 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                    Important
                  </AlertTitle>
                  <AlertDescription className="text-sm mt-1.5">
                    Past performance does not guarantee future results. Course
                    difficulty and grading may vary by instructor and term.
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !form.formState.isValid}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>Finding Courses...</span>
                    </>
                  ) : (
                    "Find GPA Boosters"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {courses && (
            <CardFooter className="flex flex-col space-y-6 mt-6">
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4">
                  Top {courses.courses.length} GPA Boosters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.courses.map((course, index) => (
                    <Card
                      key={`${course.subject}${course.course}`}
                      className="bg-secondary"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              {course.subject} {course.course}
                            </CardTitle>
                            <CardDescription>
                              Year Level: {course.year_level}00
                            </CardDescription>
                          </div>
                          <div className="px-2 py-1 bg-primary/20 rounded text-xs text-primary">
                            #{index + 1}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <div>
                              <div className="text-sm font-medium">
                                Predicted
                              </div>
                              <div className="text-2xl font-bold">
                                {course.predicted_avg}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm font-medium">
                                Historical
                              </div>
                              <div className="text-2xl font-bold">
                                {course.historical_avg}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="my-8" />

                {/* Chart */}
                <div className="flex justify-center">
                  {form.watch("limit") <= 10 ? (
                    <div className="">
                      <ChartContainer
                        config={chartConfig}
                        className="min-h-[225px] w-[90vw] pr-10"
                      >
                        <BarChart data={courses.courses}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey={(v) => `${v.subject} ${v.course}`}
                            angle={-45}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            textAnchor="end"
                            interval={0}
                          />
                          <YAxis domain={[60, 100]} />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="bar" />}
                          />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar
                            dataKey="predicted_avg"
                            name={chartConfig.predicted.label}
                            fill="var(--color-predicted)"
                          />
                          <Bar
                            dataKey="historical_avg"
                            name={chartConfig.historical.label}
                            fill="var(--color-historical)"
                          />
                        </BarChart>
                      </ChartContainer>

                      <div className="mt-6 text-xs text-muted-foreground text-center">
                        Generated in{" "}
                        {(courses.timing.total_time * 1000).toFixed()}ms •
                        Considered {courses.metadata.total_courses_considered}{" "}
                        courses
                      </div>
                    </div>
                  ) : (
                    <Alert className="border-amber-600/30 bg-amber-600/40 shadow mt-6">
                      <AlertTitle className="text-amber-500 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                        Chart Not Displayed
                      </AlertTitle>
                      <AlertDescription className="text-sm mt-1.5">
                        Chart is only available for 10 or fewer courses. Please
                        reduce the number of results to view the chart.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
