import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function TripDetail({ params }: { params: { tripId: string } }) {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <p className="text-xl font-medium">Please sign in to view trip details.</p>
      </div>
    );
  }

    const tripId = await params.tripId; // await to silence warning, even though it's a string


  // ✅ Use tripId directly
  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id,
    },
  });

    if (!trip) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <p className="text-xl font-medium">Trip not found or you dont have permission to view it.</p>
            </div>
        );
    }

    const tripStatus = new Date(trip.startDate) > new Date() ? 'Upcoming' : 'Completed';
    const dateFormatOptions: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    return (
        <div className="min-h-screen text-white">
            {/* Full-width hero image */}
            {trip.imageUrl && (
                <div className="relative w-full h-96">
                    <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-contain"
                        priority
                        quality={90}
                        sizes="100vw"
                    />
                </div>
            )}

            {/* Content container */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Title and dates section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-orange-400 mb-3">
                            {trip.title}
                        </h1>
                        <div className="flex gap-4 items-center">
                            <span className="px-3 py-1 text-sm rounded-full bg-orange-600">
                                {tripStatus}
                            </span>
                            <Link 
                                href={`/trips/${trip.id}/location`}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <LocationIcon />
                                View Locations
                            </Link>
                        </div>
                    </div>
                    
                    {/* Dates on the right */}
                    <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 min-w-[280px]">
                        <h3 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                            <CalendarIcon />
                            Trip Dates
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-zinc-400">Start date</p>
                                <p className="text-zinc-200 font-medium text-sm">
                                    {trip.startDate ? 
                                        new Date(trip.startDate).toLocaleDateString('en-US', dateFormatOptions) : 
                                        'Not specified'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400">End date</p>
                                <p className="text-zinc-200 font-medium text-sm">
                                    {trip.endDate ? 
                                        new Date(trip.endDate).toLocaleDateString('en-US', dateFormatOptions) : 
                                        'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 mb-4">About this trip</h2>
                    <p className="text-lg text-zinc-300 leading-relaxed">
                        {trip.description}
                    </p>
                </section>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    {/* Trip info card */}
                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 max-w-md">
                        <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
                            <InfoIcon />
                            Trip Details
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-zinc-400">Planned by</p>
                                <p className="text-zinc-200 font-medium">
                                    {session.user?.name || 'You'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400">Status</p>
                                <p className="text-zinc-200 font-medium">
                                    {tripStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple icon components (replace with your actual icons)
function CalendarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 0 0 3 9c0 3.492 1.698 5.988 3.354 7.584.829.8 1.654 1.381 2.274 1.765a11.5 11.5 0 0 0 .757.433l.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
        </svg>
    );
}