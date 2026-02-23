import * as z from "zod";

export const roastSchema = z.object({
  name: z.string().min(2, "Name required"),
  bio: z.string().optional(),
  level: z.enum(["mild", "medium", "savage"]),
});

export type RoastValues = z.infer<typeof roastSchema>;
