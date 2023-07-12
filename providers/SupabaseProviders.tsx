"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";
import { SupabaseProviderProps } from "@/types";

// SupabaseProvider component that wraps its children with the SessionContextProvider
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  // Initializing the supabaseClient state using the createClientComponentClient function
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  // Wrapping children with the SessionContextProvider and passing the supabaseClient as a prop
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
