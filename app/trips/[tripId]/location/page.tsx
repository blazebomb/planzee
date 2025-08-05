import NewLocationClient from "@/components/new-location";
import { prisma } from "@/lib/prisma";



export default async function AddLocation(props: { params: Promise<{ tripId: string }> }) {
  const params = await props.params;
  const tripId = await params.tripId;

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { title: true },
  });

  return (
    <>
      <NewLocationClient tripId={tripId} title={trip?.title || "Unknown Trip"} />


      ||||||||||||||||||||||TEST:|||||||||||||||||||||||||||||||||
      <p className="text-lg text-gray-100 mb-6">
        
        location to trip:{" "}
        <span className="">{tripId}</span>
      </p>
    </>
  );
}
