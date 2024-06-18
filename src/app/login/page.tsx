"use client";
import { use, useContext, useEffect } from "react";
// import { AuthContext } from "../contexts/Auth/AuthContext";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRedirect } from "../hooks/useRedirect";
// import { Events } from "../contexts/Alert/Events.enum"
// import { AlertContext } from "../contexts/Alert/AlertContext";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;
export default function Login() {
  //const { to } = useRedirect();
  //   const auth = useContext(AuthContext);
  //   const alert = useContext(AlertContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    // const event = alert.getEvent();
    // if (event) {
    //   alert.alertEvent(event);
    // }
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    console.log(data);
    // const isUserLogged = await auth.signin(data.email, data.password);
    // if (!isUserLogged) {
    //   alert.alertEvent(Events.invalidCredentials);
    // }
    // if (isUserLogged) {
    //   to("/dashboard/pdv");
    // }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
