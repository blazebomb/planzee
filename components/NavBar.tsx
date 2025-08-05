"use client";

import Link from "next/link";
import { login, logout } from "@/lib/auth-actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-orange-100 py-2 border border-purple-600">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <span className="text-3xl font-extrabold tracking-wide text-gray-700">
            Planze<span className="text-purple-800">e🧳</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6 text-gray-800 text-lg font-medium relative">
          {session?.user && (
            <>
              <Link href="/trips" className="hover:underline">Your Trips</Link>
              <Link href="/globe" className="hover:underline">Globe</Link>
            </>
          )}

          {!session?.user ? (
            <button
              onClick={() => login()}
              className="bg-purple-600 text-amber-50 hover:bg-purple-700 px-4 py-1 rounded-md transition-colors cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <Image
                src={session.user.image ?? "/default-avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  <button
                    onClick={() => logout()}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
