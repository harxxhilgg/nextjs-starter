# when to use each client

- `createBrowserClient` → Supabase function for browser-side authentication
- The browser handles cookies automatically

#

### Server Client

Use the **Server Client** in:

- Server Components (`.tsx` files)
- Server Actions (`"use server"`)
- Route Handlers (`app/api/*/route.ts`)
- Middleware (`middleware.ts`)

#### Example (Server Client)

```ts
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
}
```

#

### Client Client

Use the **Cllient Client** in:

- Client Components (`"use client"` files)
- Event Handlers (`onClick`, `onChange`, etc.)
- `useEffect` hooks

### Example (Client Client)

```ts
"use client"

import { createClient } from "@/lib/supabase/client";

export function LoginButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    awiat supabase.auth.signInWithOAuth({
      provider: "google",
    })
  };
};
```
