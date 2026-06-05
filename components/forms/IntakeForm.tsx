"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";

// ── Validation schema ──────────────────────────────────────

const intakeSchema = z.object({
  clientName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val),
      "Please enter a valid phone number",
    ),
  description: z
    .string()
    .min(50, "Please provide more detail (minimum 50 characters)")
    .max(5000, "Description cannot exceed 5000 characters"),
});

type IntakeFormData = z.infer<typeof intakeSchema>;

// ── Component ──────────────────────────────────────────────

export function IntakeForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
  });

  const descriptionLength = watch("description")?.length ?? 0;

  const onSubmit = async (data: IntakeFormData) => {
    setSubmitError(null);

    try {
      await api.post("/cases", data);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  };

  // ── Success state ──────────────────────────────────────────

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Submission Received
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our team will review your case and
              reach out to you within 1–2 business days.
            </p>
            <div className="rounded-lg bg-slate-50 p-4 text-left">
              <p className="text-sm font-medium text-slate-700 mb-1">
                What happens next?
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Our AI system has reviewed your submission</li>
                <li>• An intake specialist will contact you</li>
                <li>• Please gather any relevant documents</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-2">
          <div className="rounded-lg bg-slate-900 p-1.5">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">LegalFlow AI</span>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Free Case Evaluation
          </h1>
          <p className="text-gray-600">
            Tell us about your legal situation. Our team will review your case
            and contact you within 1–2 business days.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              All information is kept strictly confidential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="clientName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="clientName"
                  placeholder="John Smith"
                  {...register("clientName")}
                  className={errors.clientName ? "border-red-300" : ""}
                />
                {errors.clientName && (
                  <p className="text-xs text-red-600">
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              {/* Email and Phone row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">
                    Phone Number{" "}
                    <span className="text-gray-400 text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("phone")}
                    className={errors.phone ? "border-red-300" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Case Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">
                  Describe Your Legal Situation{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe what happened, when it occurred, and what outcome you are looking for. The more detail you provide, the better we can evaluate your case."
                  rows={6}
                  {...register("description")}
                  className={errors.description ? "border-red-300" : ""}
                />
                <div className="flex justify-between items-center">
                  {errors.description ? (
                    <p className="text-xs text-red-600">
                      {errors.description.message}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">
                      Minimum 50 characters required
                    </p>
                  )}
                  <p
                    className={`text-xs ${
                      descriptionLength < 50
                        ? "text-gray-400"
                        : "text-green-600"
                    }`}
                  >
                    {descriptionLength}/5000
                  </p>
                </div>
              </div>

              {/* Error alert */}
              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting your case...
                  </>
                ) : (
                  "Submit Case for Review"
                )}
              </Button>

              <p className="text-xs text-center text-gray-400">
                By submitting this form you agree that the information provided
                will be reviewed by our legal team.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
