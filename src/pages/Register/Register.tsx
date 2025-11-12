import { LoginRegisterBanner } from "@/components/common/LoginRegister/LoginRegisterBanner";
import { RegisterForm } from "./_component/RegisterForm";
import { useRegisterApiMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const Register = () => {
  const [registerApi] = useRegisterApiMutation();
  
  const handleSubmit = async (data: any) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log(userInfo);
      const response = await registerApi(userInfo).unwrap();
       toast.success("Registration successful! You can now login.");
      console.log("Registration success:", response);
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
