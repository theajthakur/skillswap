"use client"

import { SessionProvider, useSession } from "next-auth/react"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user ?? null,
    isLogin: status === "authenticated",
    loading: status === "loading"
  }
}
