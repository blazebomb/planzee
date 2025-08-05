"use server"

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";


export async function createTrip(formData: FormData) {

    const session = await auth();
    
    if (!session || !session.user?.id) {
        throw new Error("You must be logged in to create a trip");
    }
    
    const title= formData.get("title") as string;
    const description = formData.get("description") as string; 
    const startDate = formData.get("startDate") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const endDate = formData.get("endDate") as string;

    if(!title || !description || !startDate || !endDate) {
        throw new Error("All fields are required");
    }

    const startDateNew = new Date(startDate);
    const endDateNew = new Date(endDate);

    await prisma.trip.create({
        data: {
            title,
            description,
            imageUrl,
            startDate: startDateNew,
            endDate: endDateNew,
            userId: session.user?.id
        }
    })

    redirect("/trips");
}