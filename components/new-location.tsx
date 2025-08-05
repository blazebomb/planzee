"use client"

import { useTransition } from "react"

interface Props {
  tripId: string
  title: string
}

const addLocation = async (formData: FormData) => {
  // you can implement the actual logic here
  console.log("Submitting", formData.get("address"))
}

export default function NewLocationClient({ tripId, title }: Props) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold text-purple-600 mb-4">
        Add <span className="text-orange-500">{title}</span> a New Location
      </h2>

      <form
        className="flex flex-col gap-4 w-full max-w-md"
        action={(formData: FormData) => {
          startTransition(() => {
            addLocation(formData)
          })
        }}
      >
        <input type="hidden" name="tripId" value={tripId} />

        <input
          type="text"
          name="address"
          required
          placeholder="Enter location address"
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-semibold"
        >
          {isPending ? "Adding..." : "Add Location"}
        </button>
      </form>
    </div>
  )
}
