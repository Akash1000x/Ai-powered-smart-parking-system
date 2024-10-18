"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { checkIn } from "@/app/action/check-in";
import { toast } from "sonner";
import { calculatePayment, Payment } from "@/app/action/payment";

const chekOutCarDchema = z.string().min(5, {
  message: "Invalid Car number.",
});

export const SignInformSchema = z.object({
  carNumber: z.string().min(5, {
    message: "Invalid Car number.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

const ParkingForm = ({ placeId }: { placeId: string }) => {
  const [checkOut, setCheckOut] = React.useState(false);
  const [chekOutCarNumber, setCheckOutCarNumber] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState<number | null>(null);

  const handleCalulatePayment = async () => {
    try {
      const result = chekOutCarDchema.safeParse(chekOutCarNumber);

      if (!result.success) {
        // If validation fails, set the error message
        setError(result.error.errors[0].message);
        return;
      }

      // Clear any previous errors if validation passes
      setError(null);
      const res = await calculatePayment(chekOutCarNumber);
      if (res.success) {
        setAmount(res.amount);
        toast(`Amount to be paid: ${res.amount}`);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      carNumber: "",
      phoneNumber: "",
    },
  });

  const handlePayment = async () => {
    try {
      if (!amount) {
        return;
      }
      const res = await Payment(chekOutCarNumber, amount);
      if (res.success) {
        toast("Payment successful, you can now check-out");
        setCheckOutCarNumber("");
        setAmount(null);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function onSubmit(values: z.infer<typeof SignInformSchema>) {
    try {
      const res = await checkIn(placeId, values.carNumber, values.phoneNumber);
      if (res.success) {
        alert("Check-in successful");
        form.reset();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-w-96 p-6 border rounded-lg">
      {checkOut ? (
        <div className="space-y-4">
          <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Check-Out</h1>
          <Input
            type="text"
            placeholder="Enter car number"
            value={chekOutCarNumber}
            onChange={(e) => setCheckOutCarNumber(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs py-2">{error}</p>}
          <div className="flex flex-col gap-2">
            {!amount ? (
              <Button onClick={handleCalulatePayment}>Check charges</Button>
            ) : (
              <Button onClick={handlePayment}>
                Pay <span>({amount}₹)</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Check-in</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="carNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="car number" type="text" {...field} />
                      </div>
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
                    <FormLabel>phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                check-in
              </Button>
              <Button type="button" className="w-full" onClick={() => setCheckOut(true)}>
                check-out
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default ParkingForm;
