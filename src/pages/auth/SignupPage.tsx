import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

export function SignupPage() {
  useSeo({ title: "Start free", description: "Create your TABLEFLOW account.", path: "/signup" });
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      showToast("Account created — showing the demo dashboard");
      navigate("/dashboard");
    }, 700);
  }

  return (
    <AuthLayout title="Start free" subtitle="No card required. Set up your restaurant in minutes.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Restaurant name" required placeholder="e.g. Ember" />
        <Input label="Email" type="email" required placeholder="you@restaurant.com" />
        <Input label="Password" type="password" required placeholder="••••••••" helperText="At least 8 characters" />
        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brass-600 hover:text-brass-700">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
