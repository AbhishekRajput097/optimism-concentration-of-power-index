import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import clientPromise from "@/lib/mongo";

// Reusable database connection
let cachedClient: any = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await clientPromise;
  const db = client.db("copidatabase"); // main database name

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// POST API for Contact Form
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email } = await request.json();

    // Validate the incoming data
    if (!email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const contactFormCollection = db.collection("newsletter");
    const userCollection = db.collection("users");

    // Check if the email already exists in the newsletter collection
    const existingSubscription = await contactFormCollection.findOne({ email });

    // If the email is already subscribed, return an error message
    if (existingSubscription) {
      return NextResponse.json(
        { message: "This email is already subscribed to the newsletter" },
        { status: 409 } // Conflict status code
      );
    }

    // Check if the user already exists based on the email
    const existingUser = await userCollection.findOne({ email });

    // If the user does not exist, store the name and email in the users collection
    if (!existingUser) {
      const newUser = {
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await userCollection.insertOne(newUser);
    }

    // Store the contact form details in the contactusform collection
    const newContactForm = {
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the new contact form document into the contactusform collection
    const contactResult = await contactFormCollection.insertOne(newContactForm);

    // Return a success response
    return NextResponse.json(
      {
        message: "Newsletter subscribed successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);

    // Handle MongoDB errors
    if (error instanceof MongoServerError) {
      return NextResponse.json(
        { message: "Error submitting contact form", error: error.message },
        { status: 500 }
      );
    } else {
      // General error handling
      return NextResponse.json(
        { message: "Unknown error occurred", error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
