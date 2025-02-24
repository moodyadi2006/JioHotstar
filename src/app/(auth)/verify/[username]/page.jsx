"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verifyCode: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verifyCode`, {
        username: params.username,
        verifyCode: data.verifyCode,
      });
      toast({
        title: "Successfuly Verified",
        description: response.data.messsage,
      });
      router.replace("/");
    } catch (error) {
      console.error("Error in verification of user", error);
      toast({
        title: "Verification failed",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div
        className="w-full h-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), 
      url("https://images.pexels.com/photos/3279307/pexels-photo-3279307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-lg p-8 space-y-6 bg-none bg-opacity-90 rounded-xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-purple-700">
              Verify Your Account
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Enter the 6-digit verification code sent to your email
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="verifyCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="124533"
                        {...field}
                        value={field.value || ""}
                        className="border-2 text-white border-purple-300 focus:border-purple-500 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <button className="text-purple-600 hover:text-purple-800 font-semibold">
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
