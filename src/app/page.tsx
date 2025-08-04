"use client"

import { authClient } from "@/lib/auth/auth-client"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"

export default function HomeScreen() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect("/login")
  } else {
    redirect("/dashboard")
  }
}
