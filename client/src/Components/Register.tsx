import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "../utils/Schema";

//form
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center rounded-md p-4 w-96">
      <h1 className="text-5xl font-bold text-heading my-2">Welcome</h1>
      <p className="text-2xl font-semibold text-heading mx-2 mb-8">Join us today!!</p>

      <div className="oauth flex items-center justify-around gap-2 mb-4">
        <button className="btn btn-primary  bg-slate-400 p-2 rounded-sm text-primary px-4">G</button>
        <button className="btn btn-primary bg-slate-400 p-2 rounded-sm"><Facebook className="text-primary" /></button>
        <button className="btn btn-primary  bg-slate-400 p-2 rounded-sm"><Linkedin className="text-primary" /></button>
      </div>

      <Separator className="my-4" />

      {/* <p className="text-md font-bold my-2 ">Signup via email</p> */}

      <div className="w-full px-5 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs relative top-2">Full Name</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-200" placeholder="Jose Murinho" {...field} />
                  </FormControl>
                  <FormDescription className="hidden">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs relative top-2">Email</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-200" placeholder="example@gamil.com" {...field} />
                  </FormControl>
                  <FormDescription className="hidden">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs relative top-2">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-slate-200" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription className="hidden">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs relative top-2">Confirm Password</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-200" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormDescription className="hidden">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
            <Button className="bg-accent w-full mt-5" type="submit">Submit</Button>
        </Form>
        <p className="text-sm">Already have an account? <Link to="/auth/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
