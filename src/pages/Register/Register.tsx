import { LoginRegisterBanner } from "@/components/common/LoginRegister/LoginRegisterBanner";
import { RegisterForm } from "./_component/RegisterForm";
import { useRegisterApiMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerApi] = useRegisterApiMutation();
  const navigate = useNavigate();
  
  const handleSubmit = async (data: any) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await registerApi(userInfo).unwrap();
      toast.success("Registration successful! You can now login.");
      navigate("/verify")
      // console.log(userInfo);
      // console.log("Registration success:", response);
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google register clicked");
    // Handle Google register logic here
  };

  return (
    <div className="min-h-screen w-full flex flex-row-reverse">
      {" "}
      {/* Changed to flex-row-reverse */}
      <RegisterForm onSubmit={handleSubmit} onGoogleLogin={handleGoogleLogin} />
      <LoginRegisterBanner />
    </div>
  );
};

export default Register;
