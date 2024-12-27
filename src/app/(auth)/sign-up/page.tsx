"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { signUp } from "../actions";
import Link from "next/link";

const signUpSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    async function onSubmit(data: SignUpFormData) {
        const result = await signUp(data.name, data.email, data.password);
        if (!result.error) {
            redirect("/resumes");
        } else {
            console.error("Sign-up failed:", result.error);
        }
    }

    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Create an Account</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Input
                                {...register("name")}
                                type="text"
                                placeholder="Name"
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="Confirm Password"
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/sign-in">
                            Already have an account? Sign In
                        </Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
