"use client"

import { useTransition, useState } from "react"
import { addLocation } from "@/lib/actions/add-locations";

interface Props {
  tripId: string
  title: string
}

export default function NewLocationClient({ tripId, title }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (formData: FormData) => {
    setError(null)
    setSuccess(false)
    
    startTransition(async () => {
      try {
        await addLocation(formData, tripId)
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add location')
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold text-purple-600 mb-4">
        Add <span className="text-orange-500">{title}</span> a New Location
      </h2>
      
      <p className="text-gray-400 text-lg mb-6 max-w-lg">
        Just add the name of the location and let us handle the accuracy and coordinates for you
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 max-w-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg mb-4 max-w-md">
          <p className="text-sm">Location added successfully! Redirecting...</p>
        </div>
      )}

      <form
        className="flex flex-col gap-4 w-full max-w-md"
        action={handleSubmit}
      >
        <input type="hidden" name="tripId" value={tripId} />

        <input
          type="text"
          name="address"
          required
          placeholder="Enter location address"
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          disabled={isPending}
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold transition-colors disabled:opacity-50"
            disabled={isPending}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-50 transition-colors"
          >
            {isPending ? "Adding..." : "Add Location"}
          </button>
        </div>
      </form>
    </div>
  )
}
