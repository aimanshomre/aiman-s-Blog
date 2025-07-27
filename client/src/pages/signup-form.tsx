import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { minLength, z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "../components/FormFieldWrapper";
import { useAuth } from "../context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
// import  {User}
interface ICreateUser {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}
interface signUpForm {
  name: string;
  email: string;
  password: string;
}
// Zod schema for user data validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  });
const userSchema = z
  .object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// TypeScript type generated from the schema
type UserSignupFormData = z.infer<typeof userSchema>;

export function UsersignupForm() {
  const navigate = useNavigate();

  const userContext = useAuth();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: UserSignupFormData) => {
    const result = userSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    } else {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (field) newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const onSubmit = async (data: UserSignupFormData) => {
    if (validateForm(data)) {
      try {
        await mutation.mutateAsync({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        await userContext?.checkAuth(); // wait for updated user
        if (userContext?.user) {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.log("login error:", err);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: signUpForm) =>
      await axios.post<signUpForm>(
        `http://localhost:3001/api/auth/register`,
        data
      ),
    onSuccess: () => {
      form.reset();

      // userContext?.checkAuth();
      // useAuth();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        console.log("errdasfs");
        console.log(err);

        console.log(err.response?.data.message);
        setErrors({ message: err.response?.data.message });
      } else console.log("unknown error", err);
    },
  });

  const form = useForm<UserSignupFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // // console.log(mutation.data?.data);

  // useEffect(() => {
  //   if (mutation.isSuccess) {
  //     navigate("/", { replace: true });
  //   }
  // }, [mutation.isSuccess, navigate]);
  if (userContext?.user) navigate("/", { replace: true });

  return (
    <>
      <div className="bg-card p-8 rounded-xl shadow-sm border mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          create a new account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormFieldWrapper
                control={form.control}
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your Full Name"
              />
              <FormFieldWrapper
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
              />
              <FormFieldWrapper
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <FormFieldWrapper
                control={form.control}
                name="confirmPassword"
                label="confirm Password"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                //   disabled={form.formState.isSubmitting}
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending ? "registering..." : " register"}
              </Button>
            </div>
            {mutation.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">{errors.message}</p>
                <Button
                  onClick={() => {
                    form.reset();
                    mutation.reset();
                  }}
                >
                  try again
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
