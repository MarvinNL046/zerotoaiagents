import Link from "next/link";
import { FileQuestion, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter">
            4<span className="text-primary">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you are looking for does not exist or may have been moved.
            Try searching or go back to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Homepage
          </Link>
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse AI Agents
          </Link>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
