"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ZodType } from "zod";
import Link from "next/link";
import ROUTES from "@/constatns/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  formType: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

export default function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  async function handleSubmit(): SubmitHandler<T> {
    // TODO authenticate user
  }

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form
      className="mt-10 space-y-6"
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {Object.keys(defaultValues).map((field) => (
        <FieldGroup key={field}>
          <Controller
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex w-full flex-col gap-3"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  className="paragraph-medium text-dark400_light700"
                  htmlFor="form-rhf-demo-title"
                >
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  required
                  type={field.name === "password" ? "password" : "text"}
                  {...field}
                  className="paragraph-regular background-light900background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      ))}
      <Button
        className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        disabled={form.formState.isSubmitting}
        type="submit"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>
      {formType === "SIGN_IN" ? (
        <p>
          Dont have an account?{" "}
          <Link
            className="paragraph-semibold primary-text-gradient"
            href={ROUTES.SIGN_UP}
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Alredy have an account?{" "}
          <Link
            className="paragraph-semibold primary-text-gradient"
            href={ROUTES.SIGN_IN}
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
}
