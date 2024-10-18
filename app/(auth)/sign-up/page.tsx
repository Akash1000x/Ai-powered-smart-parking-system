"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { SignUpformSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      phoneNumber: "",
      placeName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpformSchema>) {
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/register`, values);

      if (response.status === 200) {
        toast.success("registered successfully");
        router.push("/sign-in");
        const result = await response.data;
        console.log(result);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("User already exists");
        return;
      }
      toast.error("An error occurred");
    }
  }

  return (
    <div className="min-w-96 px-6 border rounded-lg">
      <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Sign up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Place name" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
      <div className="pt-4 pb-2 text-sm flex justify-center">
        <div>Already have an account?</div>
        <Link className="pointer underline pl-1 cursor-pointer" href={"/sign-in"}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
