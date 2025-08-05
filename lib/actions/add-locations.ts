"use server"
import { auth } from "../../auth"
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address:string) {
    const api_key = process.env.GOOGLE_MAPS_API_KEY!;

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api_key}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Add timeout to prevent hanging
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
            throw new Error(`Google Maps API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'ZERO_RESULTS') {
            throw new Error('Location not found. Please try a different address.');
        }

        if (data.status !== 'OK') {
            throw new Error(`Geocoding failed: ${data.status} - ${data.error_message || 'Unknown error'}`);
        }

        if (!data.results || data.results.length === 0) {
            throw new Error('No location data found for this address.');
        }

        const {lat, lng} = data.results[0].geometry.location;
        return { lat, lng };

    } catch (error) {
        console.error('Geocoding error:', error);
        
        // If it's a timeout or network error, provide fallback
        if (error instanceof Error && (error.name === 'TimeoutError' || error.message.includes('ECONNRESET'))) {
            throw new Error('Network connection failed. Please check your internet connection and try again.');
        }
        
        throw error;
    }
}


export async function addLocation(formData: FormData, tripId: string){
    try {
        const session = await auth();

        if(!session?.user?.id) {
            throw new Error("You must be logged in to add a location.");
        }

        const address = formData.get("address") as string;

        if(!address || address.trim().length === 0) {
            throw new Error("Address is required.");
        }

        if (address.trim().length < 3) {
            throw new Error("Please enter a more specific location (at least 3 characters).");
        }

        if (address.trim().length > 200) {
            throw new Error("Location name is too long (maximum 200 characters).");
        }

        // Verify trip exists and user owns it
        const trip = await prisma.trip.findFirst({
            where: {
                id: tripId,
                userId: session.user.id
            }
        });

        if (!trip) {
            throw new Error("Trip not found or you don't have permission to add locations to it.");
        }

        // Check for duplicate locations
        const existingLocation = await prisma.location.findFirst({
            where: {
                tripId,
                locationTitle: {
                    equals: address.trim(),
                    mode: 'insensitive'
                }
            }
        });

        if (existingLocation) {
            throw new Error("This location has already been added to your trip.");
        }

        const { lat, lng } = await geocodeAddress(address.trim());

        const count = await prisma.location.count({
            where: {tripId}
        });

        await prisma.location.create({
            data: {
                locationTitle: address.trim(),
                latitude: lat,
                longitude: lng,
                tripId,
                order: count
            }
        });

        // Successful redirect - this will throw NEXT_REDIRECT internally (normal behavior)
        redirect(`/trips/${tripId}`);

    } catch (error) {
        // Don't log NEXT_REDIRECT as an error (it's normal redirect behavior)
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error; // Re-throw redirect errors without logging
        }
        
        console.error('Add location error:', error);
        
        // Re-throw the error so the UI can handle it
        if (error instanceof Error) {
            throw error;
        }
        
        throw new Error("An unexpected error occurred while adding the location.");
    }
}