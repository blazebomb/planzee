import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function TripDetail(props: { params: Promise<{ tripId: string }> }) {
    const params = await props.params;
    const session = await auth();

    if (!session) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
          <p className="text-xl font-medium">Please sign in to view trip details.</p>
        </div>
      );
    }

    const tripId = await params.tripId; // await to silence warning, even though it's a string


    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId: session.user?.id,
      }, include:{locations: true}
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
                        </div>
                    </div>
                    
                    {/* Dates and details on the right */}
                    <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 min-w-[280px]">
                        <h3 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                            <CalendarIcon />
                            Trip Information
                        </h3>
                        <div className="space-y-3">
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
                            
                            {/* Trip details in compact format */}
                            <div className="border-t border-zinc-700 pt-3">
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-zinc-400">Planned by</p>
                                        <p className="text-zinc-200 font-medium text-sm">
                                            {session.user?.name || 'You'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-400">Status</p>
                                        <p className="text-zinc-200 font-medium text-sm">
                                            {tripStatus}
                                        </p>
                                    </div>
                                </div>
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

                {/* Locations section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-orange-400 flex items-center gap-2">
                            <LocationIcon />
                            Destinations ({trip.locations.length})
                        </h2>
                        <Link 
                            href={`/trips/${trip.id}/location`}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <PlusIcon />
                            Add Location
                        </Link>
                    </div>

                    {trip.locations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trip.locations.map((location, index) => (
                                <div key={location.id} className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-orange-300">
                                            {location.locationTitle}
                                        </h3>
                                        <span className="text-xs bg-purple-600 px-2 py-1 rounded-full text-white">
                                            #{location.order || index + 1}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-zinc-400">Coordinates</p>
                                            <p className="text-zinc-200 font-mono text-xs">
                                                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-zinc-400">Added</p>
                                            <p className="text-zinc-200 text-xs">
                                                {new Date(location.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3 pt-3 border-t border-zinc-700 flex gap-2">
                                        <a
                                            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-400 hover:text-orange-300 text-xs flex items-center gap-1"
                                        >
                                            <MapIcon />
                                            View on Maps
                                        </a>
                                        <a
                                            href={`https://www.google.com/maps/dir//${location.latitude},${location.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                                        >
                                            <DirectionsIcon />
                                            Directions
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/30 rounded-xl p-8 border border-zinc-800 border-dashed text-center">
                            <div className="text-4xl mb-3">📍</div>
                            <h3 className="text-lg font-semibold text-zinc-300 mb-2">No destinations added yet</h3>
                            <p className="text-zinc-400 text-sm mb-4">
                                Start planning your trip by adding some destinations and points of interest.
                            </p>
                            <Link 
                                href={`/trips/${trip.id}/location`}
                                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                                <PlusIcon />
                                Add Your First Location
                            </Link>
                        </div>
                    )}
                </section>
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

function LocationIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 0 0 3 9c0 3.492 1.698 5.988 3.354 7.584.829.8 1.654 1.381 2.274 1.765a11.5 11.5 0 0 0 .757.433l.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
    );
}

function MapIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 0 0-1.147 0l-4.084 1.69A1.5 1.5 0 0 0 2 5.251v10.877a1.5 1.5 0 0 0 2.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 0 0 1.146 0l4.083-1.69A1.5 1.5 0 0 0 18 14.748V3.873a1.5 1.5 0 0 0-2.073-1.386l-3.51 1.452-4.26-1.763ZM7.58 5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 7.58 5Zm5.59 2.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z" clipRule="evenodd" />
        </svg>
    );
}

function DirectionsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z" clipRule="evenodd" />
        </svg>
    );
}