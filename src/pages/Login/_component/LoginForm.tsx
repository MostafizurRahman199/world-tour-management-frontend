import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { FormInput } from "@/components/ui/Form/form-input";
import { PasswordInput } from "@/components/ui/Form/password-input";
import Button from "@/components/ui/CustomUI/Button";
import { GoogleIcon } from "@/utils/icons";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (data: FormData) => void;
  onGoogleLogin: () => void;
  apiError?: string; // Add this prop for API errors
}

export const LoginForm = ({ onSubmit, onGoogleLogin, apiError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Card className="w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your account to continue</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Display API error message */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-[#8F87F1] hover:text-[#7E76E0] font-medium">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" variant="animated" size="lg" fullWidth className="mt-4 cursor-pointer">
                Login
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onGoogleLogin}
              leftIcon={<GoogleIcon />}
              className="cursor-pointer"
            >
              Continue with Google
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#8F87F1] hover:text-[#7E76E0] font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};