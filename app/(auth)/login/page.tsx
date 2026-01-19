"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "@/app/shared/components/Logo";
import Card from "@/app/ui/Card";
import TextInput from "@/app/ui/TextInput";
import Button from "@/app/ui/Button";

import { LoginFormValues, loginSchema } from "./schema/loginSchema";
import { userLoginService } from "./services/loginService";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const router = useRouter();

  const { fetchUser } = useUser();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await userLoginService(data);
      if (res.user) {
        await fetchUser();

        router.push("/me");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.type === "incorrectCreds") {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center px-6 bg-bg-app">
      <Card className="space-y-4 p-6 flex flex-col items-center justify-center w-full max-w-sm md:min-w-95">
        <Logo />
        <h1 className="text-2xl text-white font-bold">Login</h1>

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
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

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
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
