"use client";

import { Scale, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-900 p-1.5">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900">
                LegalFlow
              </span>
              <span className="ml-1 text-lg font-bold text-slate-500">AI</span>
            </div>
          </div>

          {/* User info and logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="rounded-full bg-slate-100 p-1.5">
                  <User className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">
                    {user.role.toLowerCase()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
