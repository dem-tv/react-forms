import { z } from 'zod';

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const Schema = z
  .object({
    name: z.string().regex(/^[A-Z]/, {
      error: 'Name must start with uppercase letter',
    }),
    age: z.string().refine((n) => Number(n) > 0, {
      error: 'Age must must be bigger than 0',
    }),
    email: z.email({ error: 'Incorrect email address' }),
    password: z
      .string()
      .regex(/\d/, {
        error: 'Password should contain at least 1 number',
      })
      .regex(/[A-Z]/, {
        error: 'Password should contain at least 1 uppercase letter',
      })
      .regex(/[a-z]/, {
        error: 'Password should contain at least 1 lowercase letter',
      })
      .regex(/[!@#$%^&*()_+]/, {
        error:
          'Password should contain at least 1 special character(!@#$%^&*()_+)',
      }),
    confirmPassword: z.string(),
    male: z.boolean().optional(),
    acceptTerms: z.boolean().optional(),
    // image: z
    //   .file({
    //     error: 'File must be uploaded',
    //   })
    //   .max(1024, {
    //     error: 'File size must be less than 1mB',
    //   })
    //   .mime(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], {
    //     error: 'File must be image',
    //   }),
    image: z
      .transform<File[], File | undefined>((filelist) => filelist[0])
      .refine((file) => file, {
        error: 'File must be uploaded',
      })
      .refine((file) => file && file.size > 1024, {
        error: 'File size must be less than 1mB',
      })
      .refine(
        (file) =>
          file &&
          ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
            file.type
          ),
        {
          error: 'File must be image',
        }
      )
      .transform(async (file) => {
        return file ? await toBase64(file) : '';
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (!confirmPassword || confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export type FormModel = z.infer<typeof Schema>;

export type FormSchema = Omit<FormModel, 'image'> & {
  image: File[];
};
