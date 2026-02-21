import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div className="flex flex-col px-2">
        <p className="font-semibold tracking-wide">
          Hellowww!, {user?.user_metadata.name}.
        </p>
      </div>
    </div>
  );
}
