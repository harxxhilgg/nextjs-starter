import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { ThemeToggleClient } from "./theme-toggle-client";

export default function TopNav() {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between w-full h-18 sm:h-20 px-4 py-3 sm:py-4 sm:px-4 select-none transition-all">
        <Link href="/" className="active:scale-95 transition-all">
          <Image
            src="/main/profile-icon-y.png"
            alt="Profile Icon"
            height={46}
            width={46}
            className="rounded-lg w-11.5 h-11.5 sm:w-11.5 sm:h-11.5"
          />
        </Link>

        <div className="flex items-center">
          <div className="mr-1">
            <Button variant="link" className="cursor-pointer" asChild>
              <Link href="/work-experience">Work</Link>
            </Button>

            <Button variant="link" className="cursor-pointer" asChild>
              <Link href="/projects">Projects</Link>
            </Button>
          </div>

          <Separator orientation="vertical" className="h-5" />

          <div className="flex items-center ml-2">
            <ThemeToggleClient />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
