import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="rounded-lg bg-slate-900 p-2">
            <Scale className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Error */}
        <h1 className="text-8xl font-bold text-slate-200 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-slate-900 hover:bg-slate-800">
              Submit a Case
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Staff Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
