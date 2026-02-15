"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { GoogleLogoIcon } from "@phosphor-icons/react";

export function LoginButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleLogin}
      className="cursor-pointer"
    >
      <GoogleLogoIcon />
      Continue with Google
    </Button>
  );
}
