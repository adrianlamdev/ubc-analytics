"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Banner, BannerDescription, BannerTitle } from "./banner";
import Navbar from "./navbar";

interface Props {
	children: React.ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<main className="flex min-h-screen items-center justify-center p-4">
					<Banner className="max-w-md" variant="error">
						<BannerTitle>
							<AlertTriangle />
							Something went wrong
						</BannerTitle>
						<BannerDescription>
							<p className="mb-4">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
							<div className="space-x-2">
								<Button
									onClick={() => {
										this.setState({ hasError: false });
										window.location.reload();
									}}
								>
									Try again
								</Button>
								<Button asChild variant="outline">
									<Link href="mailto:adrian@lams.cc">Report an issue</Link>
								</Button>
							</div>
						</BannerDescription>
					</Banner>
				</main>
			);
		}

		return this.props.children;
	}
}
