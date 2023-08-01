"use client";
import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "must be at least 2 characters.",
    })
    .max(50, {
      message: "must not exceed 50 characters",
    }),
  password: z
    .string()
    .min(4, {
      message: "must be at least 4 characters.",
    })
    .max(50, {
      message: "must not exceed 50 characters",
    }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sign-in", values);
      console.log("signup success", response.data);
      toast.success("login successful");
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
      console.log("login fail" + error.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex-col">
        <div className="w-full flex justify-center">
          <h2 className="py-2 text-2xl text-bold">Login</h2>
        </div>
        <Form {...form}>
          <div className="w-80 border px-6 py-6 rounded-sm shadow-2xl">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-8 "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                {!loading ? <Button>Submit</Button> : <ButtonLoading />}
              </div>
              <div className="flex justify-center">
                <Link href="/sign-up" className="underline">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
}
