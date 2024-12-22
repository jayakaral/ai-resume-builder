"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../actions";
import Link from "next/link";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    async function onSubmit(data: SignInFormData) {
        const result = await signIn(data.email, data.password);
        if (!result.error) {
            redirect("/");
        } else {
            console.error("Sign-in failed:", result.error);
        }
    }

    return (
        <Card className="w-full max-w-md">
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
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/sign-up">Create an account</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
