"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

function ThemeToggleFallback() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-md h-7 w-7"
      disabled
      title="Switch Theme"
    />
  );
}

export const ThemeToggleClient = dynamic(
  () => import("@/components/nav/theme-toggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
    loading: () => <ThemeToggleFallback />,
  },
);
