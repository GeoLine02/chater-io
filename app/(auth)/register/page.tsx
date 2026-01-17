"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";

import Logo from "@/app/shared/components/Logo";
import Card from "@/app/ui/Card";
import TextInput from "@/app/ui/TextInput";
import Button from "@/app/ui/Button";

import { RegisterFormValues, registerSchema } from "./schema/registerSchema";
import { useRouter } from "next/navigation";
import { userRegisterService } from "./services/registerService";
import { UserRegisterCredsType } from "./types";

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const router = useRouter();
  const onSubmit = async (data: UserRegisterCredsType) => {
    try {
      const res = await userRegisterService(data);
      console.log("res", res);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.type === "existingEmail") {
        setError("email", { message: error.message });
      }

      if (error.type === "existingUsername") {
        setError("username", { message: error.message });
      }
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
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username?.message}
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

          {/* 🔴 Backend error */}
          {errors.root?.message && (
            <p className="text-sm text-status-error text-center">
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="md"
          >
            {isSubmitting ? <ClipLoader size={22} color="white" /> : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
