import { z } from "zod";

/**
 * Sign up Form schema
 */
export const SignUpformSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
    // })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter.",
    // })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter.",
    // })
    // .regex(/[0-9]/, {
    //   message: "Password must contain at least one number.",
    // })
    // .regex(/[@$!%*?&#]/, {
    //   message: "Password must contain at least one special character.",
  }),
  placeName: z.string().min(2, {
    message: "Place Name must be at least 2 characters.",
  }),
});

export const SignInformSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
  }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter.",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter.",
  // })
  // .regex(/[0-9]/, {
  //   message: "Password must contain at least one number.",
  // })
  // .regex(/[@$!%*?&#]/, {
  //   message: "Password must contain at least one special character.",
  // }),
});
