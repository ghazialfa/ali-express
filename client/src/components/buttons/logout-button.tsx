"use client";
import { logout } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
