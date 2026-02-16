import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthCodeError() {
  return (
    <div className="gap-2">
      <h1 className="text-lg font-semibold tracking-tight">Authentication Error</h1>

      <p className="tracking-wide">There was an error signing in. Please try again.</p>

      <Link href="/">
        <Button
          variant='link'
          size="default"
        >
          Go back home
        </Button>
      </Link>
    </div>
  );
}
