import { LoginRegisterBanner } from "@/components/common/LoginRegister/LoginRegisterBanner";
import { LoginForm } from "./_component/LoginForm";


const Login = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Handle Google login logic here
  };

  return (
    <div className="min-h-screen w-full flex">
      <LoginForm onSubmit={handleSubmit} onGoogleLogin={handleGoogleLogin} />
      <LoginRegisterBanner />
    </div>
  );
};

export default Login;
