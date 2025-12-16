"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();

  // if (!user) redirect("/login");

  return <div className="h-full w-full">{children}</div>;
}
