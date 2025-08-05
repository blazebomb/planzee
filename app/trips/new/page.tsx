"use client";

import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTransition } from "react";
import { useState } from "react";
import Image from "next/image";

export default function NewTripPage() {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <h1 className="text-4xl font-bold text-purple-900 tracking-tight mb-6">
          Start Your Trip with <span className="text-orange-500">Planzee🧳</span>
        </h1>
        <p className="text-lg text-orange-700 mb-6 text-center max-w-md">
          To begin crafting your perfect getaway, please log in.
        </p>
        <Link
          href="/api/auth/signin"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-md font-semibold transition-all shadow-md hover:shadow-lg"
        >
          Login or Sign Up
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Join thousands of travelers exploring the world with Planzee!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-4xl font-bold text-orange-400 mb-3 tracking-tight">
          Create a <span className="text-purple-300">New Trip</span>
        </h2>

        <p className="text-lg text-purple-200 max-w-md">
          Welcome, <span className="text-orange-300 font-semibold">{session.user?.name}</span>!{" "}
          Let’s plan your next <span className="text-orange-400 font-medium">adventure</span>{" "}
          <span className="animate-bounce inline-block">✈️</span>
        </p>

        <form
          action={(formData: FormData) => {
            if(imageUrl){
                formData.append("imageUrl", imageUrl);
            }
            startTransition(() => {
              createTrip(formData);
            });
          }}
          className="mt-8 w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Trip Details</h3>

          {/* Trip Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="title">
              Trip Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g., Himalayan Escape"
            />
          </div>

          {/* Trip Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Briefly describe your trip..."
              rows={4}
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* End Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Trip Image</label>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-100 object-cover"
                  width={400}
                  height={256}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {isPending ? "Creating Trip..." : "Create Trip"}
          </button>
        </form>
      </div>
    </>
  );
}
