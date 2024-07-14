"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifyLogin } from "@/lib/db/login";
import { storeCookie } from "@/lib/db/storecookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth";

const Main = () => {
  const { login } = useAuth();
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const res = await verifyLogin(username as string, password as string);
    if (res !== "admin" && res) {
      storeCookie(res);
      login();
      router.replace("/home");
    } else if (res === "admin") {
      login();
      router.replace("/adminPage");
    } else {
      router.replace("/signup");
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 shadow-sm">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Student Login
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>
        <Card>
          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2 mt-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  type="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium underline underline-offset-4"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
