import { ZodType, z } from 'zod';

// User registration schema
export type UserRegistrationProps = {
  type: string; // Consider making this an enum if applicable
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string; // Ensure this is needed for registration
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: 'Your full name must be at least 4 characters long.' }),
    email: z.string().email({ message: 'Incorrect email format.' }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Your password must be at least 8 characters long.' })
      .max(64, {
        message: 'Your password cannot be longer than 64 characters long.',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'Password should contain only alphabets and numbers.'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'You must enter a 6-digit code.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Your emails do not match.',
    path: ['confirmEmail'],
  });

// User login schema
export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'You did not enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters long.' })
    .max(64, {
      message: 'Your password cannot be longer than 64 characters long.',
    }),
});

// Change password schema
export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Your password must be at least 8 characters long.' })
      .max(64, {
        message: 'Your password cannot be longer than 64 characters long.',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'Password should contain only alphabets and numbers.'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });
