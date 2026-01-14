"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "@/app/shared/Logo";
import Card from "@/app/ui/Card";
import TextInput from "@/app/ui/TextInput";
import Button from "@/app/ui/Button";
import { RegisterFormValues, registerSchema } from "./schema/registerSchema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      console.log("Registration data:", data);
      // TODO: call registration API
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center px-6 bg-bg-app">
      <Card className="space-y-4 p-6 flex flex-col items-center justify-center w-full max-w-sm md:min-w-95">
        <Logo />
        <h1 className="text-2xl text-white font-bold">Register</h1>

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username?.message}
          />

          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
