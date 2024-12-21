import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calculator, LineChart, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen px-4">
      {/* Hero Section */}
      <div className="pt-14 pb-40 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Get insights on grades and trends at UBC.
        </h1>
        <p className="text-muted-foreground my-12">
          Make informed decisions about your course selection using machine
          learning predictions based on historical grade data.
        </p>
        <div className="space-x-3">
          <Button size="lg" asChild>
            <Link href="/grade-predictor">Try it Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-12">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <CardTitle>Grade Predictions</CardTitle>
              </div>
              <CardDescription>
                Get grade predictions for specific courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our model analyzes historical grade distributions and patterns
                to provide accurate predictions for course outcomes.
              </p>
              <Button className="w-full group gap-4">
                Try Grade Predictor{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                <CardTitle>GPA Boosters</CardTitle>
              </div>
              <CardDescription>
                Discover courses with high average grades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find courses that are known to have high average grades and can
                help boost your GPA. We use a combination of historical grades
                and predicted grades to identify these courses.
              </p>
              <Button className="w-full group gap-4">
                View GPA Boosters{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* <Card> */}
          {/*   <CardHeader> */}
          {/*     <div className="flex items-center gap-2"> */}
          {/*       <LineChart className="h-5 w-5 text-blue-600" /> */}
          {/*       <CardTitle>Historical Analysis</CardTitle> */}
          {/*     </div> */}
          {/*     <CardDescription> */}
          {/*       Explore grade trends and patterns over time */}
          {/*     </CardDescription> */}
          {/*   </CardHeader> */}
          {/*   <CardContent> */}
          {/*     <p className="text-sm text-muted-foreground mb-4"> */}
          {/*       Visualize how course grades have changed over the years and */}
          {/*       identify patterns in different subjects. */}
          {/*     </p> */}
          {/*     <Button className="w-full">View Grade Trends</Button> */}
          {/*   </CardContent> */}
          {/* </Card> */}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 rounded-lg p-6 border">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">
                How accurate are the predictions?
              </h3>
              <p className="text-muted-foreground">
                Our predictions are based on historical grade data and various
                factors like course difficulty, instructor history, and
                enrollment patterns. While no prediction is perfect, our model
                provides a data-driven estimate to help inform your decisions.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">
                What data is used for predictions?
              </h3>
              <p className="text-muted-foreground">
                We analyze anonymized historical grade data from UBC courses,
                including factors like average grades, enrollment numbers, and
                course levels. All predictions are made using publicly available
                data.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">
                How often is the data updated?
              </h3>
              <p className="text-muted-foreground">
                Our database is updated regularly with new grade data as it
                becomes available. The model is retrained periodically to
                maintain accuracy and incorporate the latest trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
