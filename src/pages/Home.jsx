/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import akasaImg from "../assets/akasa.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  carPlate: z
    .string()
    .min(2, { message: "Car Plate Number must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Must be a valid phone number." }),
});

const inputClasses =
  "text-center bg-white border-primary focus-visible:ring-primary";
const labelClasses = "text-white";

const Home = ({ supabase }) => {
  const { toast } = useToast();
  useEffect(() => {
    async function apiCall() {
      // const { data } = await supabase.from("guest").select();
    }

    apiCall();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      carPlate: "",
      phone: "",
    },
  });

  const onSubmit = async (values) => {
    const { name, carPlate, phone } = values;
    try {
      const { error } = await supabase
        .from("guest")
        .insert({ name, car: carPlate, phone });

      if (error) {
        console.error("error", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request.`,
        });
      } else {
        form.reset();
        toast({
          title: "Your request has been sent.",
          description: `${name}, ${carPlate}, ${phone}`,
        });
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="p-6 sm:py-12 m-auto min-h-[100dvh] sm:min-h-0 sm:gap-12 w-full max-w-sm flex flex-col justify-between">
        <img src={akasaImg} className="w-[70%] m-auto" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-auto w-full flex flex-col justify-around text-center"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className={labelClasses}>Visitor Name</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputClasses} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carPlate"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className={labelClasses}>
                    Car Plate Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className={inputClasses} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className={labelClasses}>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputClasses}
                      inputMode="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-8 py-8 focus-visible:ring-primary bg-primary text-secondary hover:bg-primary"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
