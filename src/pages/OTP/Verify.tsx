import { useForm } from "react-hook-form";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSendOtpApiMutation, useVerifyOtpApiMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner"; // <-- Spinner import

type OtpForm = {
  otp: string[];
};

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.email) return <Navigate to="/login" replace />;

  const [sendOtp] = useSendOtpApiMutation();
  const [verifyOtp] = useVerifyOtpApiMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<OtpForm>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  // NEW STATES FOR SPINNER
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);

  // TIMER
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP input behavior
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    setValue(`otp.${index}`, value);

    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();

    if (!value && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  // ⭐ SEND OTP API CALL
  const handleSendOtp = async () => {
    try {
      setError("");
      setLoadingSendOtp(true);
      await sendOtp({ email: location.state.email }).unwrap();
      setOtpSent(true);
      setTimer(60);
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong!");
    } finally {
      setLoadingSendOtp(false);
    }
  };

  // ⭐ VERIFY OTP API CALL
  const onSubmit = async (data: OtpForm) => {
    const otp = data.otp.join("");

    if (otp.length !== 6) {
      setError("Please fill all 6 digits.");
      return;
    }

    try {
      setError("");
      setLoadingVerifyOtp(true);
      await verifyOtp({
        email: location.state.email,
        otp,
      }).unwrap();

      toast.success("OTP Verification Successful");
      navigate("/");
    } catch (err: any) {
      setError(err?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10 text-[#121212]">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#C68EFD]/30">
        <h2 className="text-3xl font-extrabold text-center text-[#8F87F1] mb-3">Verify Your Email</h2>

        <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
          OTP will be sent to:
          <br />
          <span className="font-semibold text-[#C68EFD] break-all">{location.state.email}</span>
        </p>

        {/* STEP-1: Send OTP */}
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            disabled={loadingSendOtp}
            className="w-full py-3 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loadingSendOtp ? <Spinner /> : "Send OTP"}
          </button>
        )}

        {/* STEP-2: OTP UI */}
        {otpSent && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 mt-5">
            {/* OTP Boxes */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  maxLength={1}
                  {...register(`otp.${i}`)}
                  onChange={(e) => handleOtpChange(e, i)}
                  className="
                    w-full h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold
                    bg-white border-2 rounded-xl border-[#C68EFD]
                    focus:border-[#8F87F1] outline-none transition
                  "
                />
              ))}
            </div>

            {/* TIMER */}
            {timer > 0 ? (
              <p className="text-center text-gray-500 text-sm">
                Resend OTP in <span className="text-[#8F87F1] font-semibold">{timer}s</span>
              </p>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="hover:cursor-pointer text-center text-[#8F87F1] font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* ERROR */}
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={loadingVerifyOtp || timer == 0}
              className={`${
                timer == 0 ? "cursor-not-allowed" : "hover:cursor-pointer"
              } w-full py-3 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2`}
            >
              {loadingVerifyOtp ? <Spinner /> : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
