"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
	Brain,
	Code,
	Database,
	FlaskConical,
	Github,
	LineChart,
} from "lucide-react";
import Link from "next/link";

export default function About() {
	return (
		<main className="min-h-screen p-4 pt-8 mt-20">
			<div className="space-y-8 max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="space-y-4"
				>
					<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						About the Project
					</h1>
					<p className="text-lg text-muted-foreground">
						An experimental machine learning project exploring grade prediction
						models, full-stack development, and MLOps practices using UBC course
						data.
					</p>
				</motion.div>

				{/* Project Overview Cards */}
				<ProjectOverviewSection />

				{/* Data Source Section */}
				<DataSourceSection />

				{/* Model Performance */}
				<ModelPerformanceSection />

				{/* FAQ Section */}
				<FAQ />

				{/* Experimental Section */}
				<ExperimentalSection />
			</div>
		</main>
	);
}

function ProjectOverviewSection() {
	return (
		<div className="grid md:grid-cols-2 gap-6 pt-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
				<Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative">
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

					<CardHeader>
						<div className="flex items-center gap-2">
							<Brain className="h-5 w-5 text-primary" />
							<CardTitle>Machine Learning</CardTitle>
						</div>
						<CardDescription>
							Exploring various ML models and their effectiveness in grade
							prediction
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Key findings show that historical averages and recent course
							performance are the strongest predictors, while temporal features
							have limited impact.
						</p>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.2 }}
			>
				<Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative">
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

					<CardHeader>
						<div className="flex items-center gap-2">
							<Code className="h-5 w-5 text-primary" />
							<CardTitle>Full-Stack Development</CardTitle>
						</div>
						<CardDescription>
							End-to-end implementation from data processing to web deployment
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Complete pipeline including data processing, model training, API
							development, and frontend implementation.
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

function DataSourceSection() {
	return (
		<Card className="mt-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<Database className="h-5 w-5 text-primary" />
					<CardTitle>Data Sources</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Based on UBC PAIR grade distribution reports, courtesy of Donney F's
					<Link
						href="https://github.com/DonneyF/ubc-pair-grade-data"
						className="text-primary hover:underline ml-1"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub repository
					</Link>
					.
				</p>
			</CardContent>
		</Card>
	);
}

function ModelPerformanceSection() {
	return (
		<Card className="mt-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<LineChart className="h-5 w-5 text-primary" />
					<CardTitle>Model Performance</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Metric</TableHead>
							<TableHead>Value</TableHead>
							<TableHead>Description</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>R² Score</TableCell>
							<TableCell>~0.5194</TableCell>

							<TableCell className="text-sm text-muted-foreground">
								Explains the proportion of variance in predictions
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>MAPE</TableCell>
							<TableCell>~4.84%</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								Average percentage difference from actual values
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>RMSE</TableCell>
							<TableCell>~5.0212</TableCell>
							<TableCell className="text-sm text-muted-foreground">
								Root mean square error of predictions
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

function FAQ() {
	return (
		<Card className="mt-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<CardTitle>Frequently Asked Questions</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-left">
							How accurate are the predictions?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							The model's accuracy varies depending on the course and available
							historical data. Predictions should be taken as estimates rather
							than definitive values.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2">
						<AccordionTrigger className="text-left">
							What factors influence the predictions?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							The primary factors are historical course averages and recent
							performance trends. The analysis shows that temporal features
							(year) have less impact than expected.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-3">
						<AccordionTrigger className="text-left">
							How is the model validated?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Using time series cross-validation to ensure the model's
							performance is evaluated on future data points, similar to
							real-world usage.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}

function ExperimentalSection() {
	return (
		<Card className="mt-8">
			<CardHeader>
				<div className="flex items-center gap-2">
					<FlaskConical className="h-5 w-5 text-primary" />
					<CardTitle>Ongoing Experiments</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-sm text-muted-foreground">
					Current experiments include:
				</p>
				<ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
					<li>Testing different ML models for improved accuracy</li>
					<li>MLOps pipeline optimization</li>
					<li>Model monitoring and retraining strategies</li>
					<li>
						Assessment Analytics & Grade Scaling Prediction
						<ul className="list-disc list-inside ml-6 mt-2 text-xs">
							<li>Grade scaling pattern analysis</li>
							<li>Course-specific grading trend predictions</li>
							<li>Assessment weight impact analysis</li>
						</ul>
					</li>
					<li>
						Course Similarity Engine
						<ul className="list-disc list-inside ml-6 mt-2 text-xs">
							<li>Grade distribution pattern matching</li>
							<li>Student performance correlation analysis</li>
							<li>
								Clustering with respect to course complexity (according to
								grade) or course content
							</li>
						</ul>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
