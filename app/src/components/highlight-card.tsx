import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Link from "next/link";
import { ComponentType } from "react";

interface HighlightCardProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	href: string;
	buttonText: string;
}

export function HighlightCard({
	icon: Icon,
	title,
	description,
	href,
	buttonText,
}: HighlightCardProps) {
	return (
		<Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary border-none overflow-hidden relative h-[30vh]">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
			<CardHeader>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-primary/10 rounded-full">
						<Icon className="w-5 h-5 text-primary" />
					</div>
					<div>
						<CardTitle>{title}</CardTitle>
					</div>
				</div>
			</CardHeader>
			<CardContent className="relative z-10">
				<p className="text-sm text-muted-foreground mb-6 text-left">
					{description}
				</p>
				<Link href={href} className="block w-full">
					<Button className="w-full group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
						<span>{buttonText}</span>
						<ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
