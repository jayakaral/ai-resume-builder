"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../actions";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react"; // Assuming you have lucide-react icons

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const [error, setError] = useState("");

  async function onSubmit(data: SignInFormData) {
    setError("");

    try {
      const result = await signIn(data.email, data.password);
      if (!result.error) {
        redirect("/resumes");
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError("Something went wrong. Please try again.");
    } finally {
    }
  }

  return (
    <Card className={`w-full max-w-md relative ${isSubmitting ? "pointer-events-none" : ""}`}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                aria-invalid={!!errors.password}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <Button variant="outline" className="w-full" asChild disabled={isSubmitting}>
            <Link href="/sign-up">Create an account</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
