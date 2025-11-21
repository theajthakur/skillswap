"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    skillsInput: "",
    interestsInput: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const parseList = (value: string) =>
    value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "")
      .slice(0, 5);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const skills = parseList(form.skillsInput);
    const interests = parseList(form.interestsInput);

    try {
      const res = await fetch(`${process.env.SERVER_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          gender: form.gender,
          skills,
          interests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Registration failed");
        setLoading(false);
        return;
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-surface shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Register
        </h1>

        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 gap-5">
          <Input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border text-foreground"
          />

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border text-foreground"
          />

          <Input
            type="number"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="border text-foreground"
          />

          <div className="flex flex-col gap-2 text-foreground border-2 border-black/5 p-2 rounded-sm">
            <label className="font-medium text-foreground">Gender</label>

            <div className="flex items-center gap-3 text-foreground/60">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                Female
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={form.gender === "Other"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
                Other
              </label>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Skills (comma separated)"
            value={form.skillsInput}
            onChange={(e) => handleChange("skillsInput", e.target.value)}
            className="border text-foreground"
          />

          <Input
            type="text"
            placeholder="Interests (comma separated)"
            value={form.interestsInput}
            onChange={(e) => handleChange("interestsInput", e.target.value)}
            className="border text-foreground"
          />

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-secondary text-white"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
