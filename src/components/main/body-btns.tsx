"use client";

import { Button } from "../ui/button";

export function FooterBtn() {
  return (
    <Button
      variant="link"
      size="sm"
      className="font-semibold text-[13px] leading-8 tracking-wide text-secondary px-0 cursor-pointer underline hover:text-primary"
      onClick={() => window.open("https://github.com/harxxhilgg", "_blank")}
    >
      Harshil
    </Button>
  );
}