import { useEffect, useState } from "react";
import api from "../api/api";

export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("Invalid verification link");
      return;
    }

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("✅ Email verified successfully! You can login now.");
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      })
      .catch(() => {
        setStatus("❌ Verification failed or link expired");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Email Verification
        </h2>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
}
