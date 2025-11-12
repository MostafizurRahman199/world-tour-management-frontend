import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Lock } from "lucide-react";
import { FormInput } from "@/components/ui/Form/form-input";
import { PasswordInput } from "@/components/ui/Form/password-input";
import Button from "@/components/ui/CustomUI/Button";
import { GoogleIcon } from "@/utils/icons";
import { Link } from "react-router-dom";


const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSubmit: (data: FormData) => void;
  onGoogleLogin: () => void;
}

export const RegisterForm = ({ onSubmit, onGoogleLogin }: RegisterFormProps) => {
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
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-gray-600">Sign up to get started with your account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                icon={<User className="h-4 w-4" />}
                error={errors.name?.message}
                {...register("name")}
              />

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

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <div className="flex items-center space-x-2 text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 focus:ring-[#8F87F1]" required />
                  <span className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#8F87F1] hover:text-[#7E76E0] font-medium">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
              </div>

              <Button type="submit" variant="animated" size="lg" fullWidth className="mt-4 cursor-pointer">
                Create Account
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
              Already have an account?{" "}
              <Link to="/login" className="text-[#8F87F1] hover:text-[#7E76E0] font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
