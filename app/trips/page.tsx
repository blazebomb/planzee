import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../lib/prisma";

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <p className="text-xl font-medium">Please sign in to view your trips.</p>
      </div>
    );
  }

  const currentDate = new Date();

  const trips = await prisma.trip.findMany({
    where: { userId: session.user?.id },
    orderBy: { startDate: "asc" },
  });

  // Trip categorization
  const upcomingTrips = trips.filter(
    (trip) => trip.startDate && new Date(trip.startDate) >= currentDate
  );

  const pastTrips = trips.filter(
    (trip) => trip.endDate && new Date(trip.endDate) < currentDate
  );

  return (
    <div className="min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6 mb-10 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-500 sm:text-4xl">My Travel Dashboard</h1>
            <p className="mt-2 text-zinc-400">
              {trips.length > 0 
                ? `You have ${trips.length} trip${trips.length > 1 ? 's' : ''} registered`
                : "Your adventure starts here"}
            </p>
          </div>
          <Link href="/trips/new">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition bg-orange-600 rounded-xl hover:bg-orange-700 shadow-md hover:shadow-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Trip
            </button>
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-zinc-900/50">
            <div className="w-24 h-24 mb-6 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">No trips yet</h3>
            <p className="max-w-md mx-auto mb-6 text-zinc-400">Start planning your next adventure by creating your first trip</p>
            <Link href="/trips/new">
              <button className="px-6 py-2 font-medium text-white transition bg-orange-600 rounded-lg hover:bg-orange-700">
                Plan Your Trip
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Upcoming Trips Section */}
            {upcomingTrips.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 mr-3 rounded-full bg-green-500"></div>
                  <h2 className="text-2xl font-bold text-green-400">Upcoming Adventures</h2>
                  <span className="ml-4 px-3 py-1 text-xs font-medium rounded-full bg-green-900/50 text-green-300">
                    {upcomingTrips.length} trip{upcomingTrips.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingTrips.map((trip) => (
                    <Link key={trip.id} href={`/trips/${trip.id}`} className="group">
                      <div className="relative h-full overflow-hidden transition border rounded-xl border-zinc-800 group-hover:border-orange-500/30 bg-zinc-900/50 group-hover:bg-zinc-900">
                        {trip.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={trip.imageUrl}
                              alt={trip.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"></div>
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="mb-2 text-lg font-semibold text-orange-300 line-clamp-1">{trip.title}</h3>
                          <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{trip.description}</p>
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>
                              {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'N/A'}
                            </span>
                            <span className="px-1 text-zinc-600">→</span>
                            <span>
                              {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Past Trips Section */}
            {pastTrips.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 mr-3 rounded-full bg-red-500"></div>
                  <h2 className="text-2xl font-bold text-red-400">Travel Memories</h2>
                  <span className="ml-4 px-3 py-1 text-xs font-medium rounded-full bg-red-900/50 text-red-300">
                    {pastTrips.length} trip{pastTrips.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pastTrips.map((trip) => (
                    <Link key={trip.id} href={`/trips/${trip.id}`} className="group">
                      <div className="relative h-full overflow-hidden transition border rounded-xl border-zinc-800 group-hover:border-orange-500/30 bg-zinc-900/50 group-hover:bg-zinc-900">
                        {trip.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={trip.imageUrl}
                              alt={trip.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"></div>
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="mb-2 text-lg font-semibold text-orange-300 line-clamp-1">{trip.title}</h3>
                          <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{trip.description}</p>
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>
                              {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'N/A'}
                            </span>
                            <span className="px-1 text-zinc-600">→</span>
                            <span>
                              {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}