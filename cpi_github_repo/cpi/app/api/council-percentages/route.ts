import { NextRequest, NextResponse } from 'next/server';

// Type for the council percentages
type CouncilPercentages = Record<string, number>;

// In-memory storage (replace with a database in a real application)
let storedPercentages: CouncilPercentages = {};

export async function GET() {
  return NextResponse.json(storedPercentages);
}

export async function POST(request: NextRequest) {
  const percentages = await request.json() as CouncilPercentages;
  storedPercentages = percentages;
  return NextResponse.json({ message: "Percentages stored successfully" });
}