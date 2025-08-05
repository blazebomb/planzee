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
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-orange-400/20 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="hover:scale-105 transition-transform duration-200">
          <span className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
            Plan<span className="text-orange-400 animate-pulse">zee</span>
            <span className="text-2xl ml-1">🧳</span>
          </span>
        </Link>

        <div className="flex items-center space-x-8 text-white text-lg font-medium relative">
          {session?.user && (
            <>
              <Link 
                href="/trips" 
                className="text-gray-300 hover:text-orange-400 transition-all duration-200 hover:scale-110 relative group"
              >
                Your Trips
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/trips/new" 
                className="text-gray-300 hover:text-orange-400 transition-all duration-200 hover:scale-110 relative group"
              >
                Create Trip
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </>
          )}

          {!session?.user ? (
            <button
              onClick={() => login()}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 border border-orange-400/30"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-3 bg-gray-700/50 rounded-full px-3 py-1 border border-gray-600/50 hover:border-orange-400/50 transition-all duration-200">
                <span className="text-gray-300 text-sm hidden sm:block font-medium">
                  {session.user.name}
                </span>
                <Image
                  src={session.user.image ?? "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer border-2 border-orange-400/60 hover:border-orange-400 transition-all duration-200 hover:scale-110"
                  onClick={() => setShowMenu((prev) => !prev)}
                />
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-44 bg-gray-800/95 backdrop-blur-sm border border-orange-400/30 rounded-xl shadow-2xl z-20 overflow-hidden">
                  <button
                    onClick={() => logout()}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-orange-400/10 hover:text-orange-400 transition-all duration-200 font-medium"
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
