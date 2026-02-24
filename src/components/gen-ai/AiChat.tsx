"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roastSchema, RoastValues } from "@/lib/schemas";
import { Spinner } from "../ui/spinner";
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "../ui/input-group";

export default function AIChat() {
  const [roast, setRoast] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<RoastValues>({
    resolver: zodResolver(roastSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      bio: "",
      level: "medium",
    },
  });

  async function onSubmit(values: RoastValues) {
    setLoading(true);
    setRoast([]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();
      setRoast(data.roast ?? []);

      if (res.ok) {
        form.reset();
      }
    } catch (error) {
      console.error("Error: ", error);

      toast.error("Error", {
        description: "Something went wrong, please try again after sometime.",
      });
    } finally {
      setLoading(false);
    };
  }

  return (
    <div className="space-y-6">
      <form id="form-rhf-roast" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col gap-8 items-center mb-8">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-name" className="gap-0.5">
                    Name <span>*</span>
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-name"
                    placeholder="Enter your name... (i.e.: Jeffery Epstein)"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={form.formState.errors.name ? [form.formState.errors.name] : undefined} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-bio" className="gap-0.5">
                    Bio <span>*</span>
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-bio"
                      placeholder="Tell me about you or your profession..."
                      rows={4}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText>
                        {field.value.length}/200 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        <Field>
          <FieldLabel htmlFor="level">Roast Intensity</FieldLabel>

          <FieldContent>
            <Controller
              name="level"
              control={form.control}
              render={({ field }) => {
                const levels = ["mild", "medium", "savage"] as const;
                const currentIndex = levels.indexOf(field.value);

                return (
                  <div className="w-full space-y-3">
                    <div className="grid grid-cols-3 text-xs text-muted-foreground">
                      <div className="text-start">Mild 🙂</div>
                      <div className="text-center">Medium 😈</div>
                      <div className="text-end">Savage 🔥</div>
                    </div>

                    <Slider
                      min={0}
                      max={2}
                      step={1}
                      value={[currentIndex === -1 ? 1 : currentIndex]}
                      onValueChange={(val) => {
                        field.onChange(levels[val[0]]);
                      }}
                    />
                  </div>
                );
              }}
            />
          </FieldContent>

          <FieldError
            errors={
              form.formState.errors.level
                ? [form.formState.errors.level]
                : undefined
            }
          />
        </Field>

        <Button
          type="submit"
          form="form-rhf-roast"
          disabled={loading}
          variant="default"
          className="flex mt-10 mx-auto cursor-pointer w-40"
        >
          {loading && (
            <Spinner />
          )}

          {loading ? "Roasting..." : "Roast me"}
        </Button>
      </form>

      {/* RESULT */}
      {roast.length > 0 && (
        <h2 className="text-xl font-semibold">Results:</h2>
      )}

      {roast.length > 0 && (
        <ul className="space-y-3 mb-10">
          {roast.map((item, index) => (
            <li key={index} className="flex gap-6">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary/70 shrink-0" />

              <p className="tracking-[0.005em]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}