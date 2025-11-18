// src/pages/Login/Login.tsx
import { LoginRegisterBanner } from "@/components/common/LoginRegister/LoginRegisterBanner";
import { LoginForm } from "./_component/LoginForm";
import { useLoginApiMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from "@/config";

const Login = () => {
  const navigate = useNavigate();
  const [loginApi] = useLoginApiMutation();
  const [apiError, setApiError] = useState<string>("");

  const handleSubmit = async (data: any) => {
    try {
      setApiError(""); // Clear previous errors
      // console.log("Form Data:", data);
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      const response = await loginApi(userInfo).unwrap();
      // console.log(response);
      navigate("/");
      toast.success("Login Successful");
    } catch (error: any) {
      console.error("Login Failed:", error);

      if (error.status === 401 && error.data.status === "fail") {
        if (error.data.message === "User not verified") {
          navigate("/verify", { state: { email: data.email } });
        } else if (error.data.message === "Incorrect email or password.") {
          setApiError("Incorrect email or password."); // Set the API error
          toast.error("Incorrect email or password.");
        }
      } else {
        // Handle other errors
        setApiError("An error occurred during login. Please try again.");
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  // In your Login.tsx
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Store current path for redirect back
    const currentPath = window.location.pathname;
    // Redirect to Google OAuth with state parameter
    window.location.href = `${config.baseUrl}/auth/google?state=${encodeURIComponent(currentPath)}`;
  };

  return (
    <div className="min-h-screen w-full flex">
      <LoginForm
        onSubmit={handleSubmit}
        onGoogleLogin={handleGoogleLogin}
        apiError={apiError} // Pass the API error to the form
      />
      <LoginRegisterBanner />
    </div>
  );
};

export default Login;