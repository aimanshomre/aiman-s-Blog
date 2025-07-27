import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "../context/auth-context";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { useNavigate } from "react-router";

interface signInForm {
  email: string;
  password: string;
}
// Zod schema for user data validation
const userSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// TypeScript type generated from the schema
type UserLoginFormData = z.infer<typeof userSchema>;
axios.defaults.withCredentials = true;

export function UserLoginForm() {
  const navigate = useNavigate();

  const userContext = useAuth();

  const validateForm = (data: UserLoginFormData) => {
    const result = userSchema.safeParse(data);
    if (result.success) {
      return true;
    } else {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (field) newErrors[field] = err.message;
      });
      return false;
    }
  };

  const onSubmit = async (data: UserLoginFormData) => {
    if (validateForm(data)) {
      try {
        await mutation.mutateAsync(data);
        await userContext?.checkAuth();
        navigate("/", { replace: true });
      } catch (error) {
        console.log("login error:", error);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: signInForm) =>
      await axios.post<signInForm>(
        `http://localhost:3001/api/auth/login`,
        data
      ),
  });

  const form = useForm<UserLoginFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (userContext?.user) navigate("/", { replace: true });

  return (
    <div className="bg-card p-8 rounded-xl shadow-sm border mb-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        login
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormFieldWrapper
              control={form.control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              description="We'll use this to send you important updates."
            />
            <FormFieldWrapper
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              description="Password must be at least 8 characters long."
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1"
            >
              {mutation.isPending ? "Logging in..." : " Login"}
            </Button>
          </div>
          {mutation.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                Wrong Email Or Password!
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
