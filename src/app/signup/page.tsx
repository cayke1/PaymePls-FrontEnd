"use client";
import { useContext, useEffect } from "react";
import { AlertContext } from "../contexts/alert/AlertContext";
import { AuthContext } from "../contexts/auth/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Events } from "../contexts/alert/Events.enum";
import { useRedirect } from "../hooks/useRedirect";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;
export default function Signup() {
  const { getEvent, alertEvent } = useContext(AlertContext);
  const auth = useContext(AuthContext);
  const { to } = useRedirect();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  useEffect(() => {
    const event = getEvent();
    if (event) {
      alertEvent(event);
    }
  })

  const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
    const isUserCreated = await auth.signup(
      data.email,
      data.password,
      data.name
    );
    if (!isUserCreated) {
      alertEvent(Events.failedToRegisterUser);
    }
    if (isUserCreated) {
      to("/dashboard");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
          <CardDescription>
            Create your account and start using our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
              </div>

              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
