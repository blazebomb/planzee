import NewLocationClient from "@/components/new-location";
import { prisma } from "@/lib/prisma";



export default async function AddLocation({ params }: { params: { tripId: string } }) {
  const tripId = await params.tripId;

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { title: true },
  });

  return (
    <>
      <NewLocationClient tripId={tripId} title={trip?.title || "Unknown Trip"} />


      <p className="text-lg text-gray-100 mb-6">
        You are adding a location to trip:{" "}
        <span className="font-semibold">{trip?.title || "Unknown Trip"}</span>
      </p>
    </>
  );
}
