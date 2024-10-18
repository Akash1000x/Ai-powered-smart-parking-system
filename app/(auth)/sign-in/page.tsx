"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SignInformSchema } from "@/lib/schema";

export default function ProfileForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInformSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.ok) {
        router.push("/");
      } else if (!res?.error) {
        // router.push(props.callbackUrl ?? "http://localhost:3000");
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-w-96 px-6 border rounded-lg">
      <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Sign in</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
      <div className="pt-4 pb-2 text-sm flex justify-center">
        <div>Don&apos;t have an account?</div>
        <Link className="pointer underline pl-1 cursor-pointer" href={"/sign-up"}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
