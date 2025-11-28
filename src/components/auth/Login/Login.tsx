"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    setError(""); // Clear the error message on each new login attempt

    // Basic client-side validation
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    // Call the signIn function with credentials
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false, // Ensure we handle the redirect manually
    });

    setLoading(false);

    // Handle response from the API
    if (res?.error) {
      setError(res.error);
      console.log("Error response:", res);
      return;
    }

    router.push("/");
  };

  return (
    <div className="bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-surface shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        <div className="space-y-5">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn("google", { callbackUrl: "/" });
            }}
            className="w-full flex items-center justify-center gap-2 border text-foreground"
          >
            {loading ? (
              "Redirecting..."
            ) : (
              <>
                <FcGoogle /> Login with Google
              </>
            )}
          </Button>

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border text-foreground"
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="border text-foreground"
          />

          <p className="text-shadow">
            Forgot password?{" "}
            <Link href={"/reset"}>
              <Button variant={"link"}>Reset here</Button>
            </Link>
          </p>

          <Button
            disabled={loading}
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-secondary text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
