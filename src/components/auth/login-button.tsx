"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { DiscordLogoIcon, GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";

export function LoginButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={handleGoogleLogin}
        className="cursor-pointer font-semibold"
      >
        <GoogleLogoIcon />
        Sign in with Google
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={handleGitHubLogin}
        className="cursor-pointer font-semibold"
      >
        <GithubLogoIcon />
        Sign in with GitHub
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={handleDiscordLogin}
        className="cursor-pointer font-semibold text-primary bg-[#5865F2] hover:bg-[#5865F295]"
      >
        <DiscordLogoIcon />
        Sign in with Discord
      </Button>
    </>
  );
}
