"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { roastSchema, RoastValues } from "@/lib/schemas";
import { Spinner } from "../ui/spinner";
import { Slider } from "../ui/slider";

export default function AIChat() {
  const [roast, setRoast] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<RoastValues>({
    resolver: zodResolver(roastSchema),
    defaultValues: {
      name: "",
      bio: "",
      level: "medium",
    },
  });

  async function onSubmit(values: RoastValues) {
    setLoading(true);
    setRoast([]);

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await res.json();
    setRoast(data.roast ?? []);
    setLoading(false);
  }

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 items-center mb-10"
      >
        {/* NAME */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              placeholder="Enter your name... (i.e.: Jeffery Epstein)"
              {...form.register("name")}
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.name ? [form.formState.errors.name] : undefined} />
        </Field>

        {/* BIO */}
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <FieldContent>
            <Textarea
              id="bio"
              placeholder="Enter your proffesion or your idea... (i.e.: Cameraman)"
              {...form.register("bio")}
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.bio ? [form.formState.errors.bio] : undefined} />
        </Field>

        {/* LEVEL */}
        {/* <Field>
          <FieldLabel htmlFor="level">Intensity</FieldLabel>
          <FieldContent>
            <Controller
              name="level"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="mild">Mild 🙂</SelectItem>
                    <SelectItem value="medium">Medium 😈</SelectItem>
                    <SelectItem value="savage">Savage 🔥</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FieldContent>
          <FieldError errors={form.formState.errors.level ? [form.formState.errors.level] : undefined} />
        </Field> */}

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
          disabled={loading}
          variant="default"
          className="cursor-pointer"
        >
          {loading && (
            <Spinner />
          )}

          {loading ? "Roasting..." : "Roast me"}
        </Button>
      </form>

      {/* RESULT */}
      {roast.length > 0 && (
        <h2 className="text-xl font-semibold">Result:</h2>
      )}

      {roast.length > 0 && (
        <ul className="mt-8 space-y-3 mb-10">
          {roast.map((item, index) => (
            <>
              <li key={index} className="flex gap-6">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary/70 shrink-0" />

                <p className="tracking-[0.005em]">
                  {item}
                </p>
              </li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
}