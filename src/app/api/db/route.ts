import connectMongoDB from "@/lib/mongodb/connection";
import game from "@/lib/mongodb/models/gameSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Backend received full data object:", JSON.stringify(data, null, 2));
  /*------------------- Send data to data base -------------------*/
  await connectMongoDB();
  const result = await game.create({
    userName: data.userName,
    targetWord: data.targetWord,
    wordLength: data.wordLength,
    unique: data.unique,
    trys: data.trys,
  });
  console.log("Saved to MongoDB:", result);
  return NextResponse.json("Backend received trys data");
}

/*------------------- Get data from data base -------------------*/
export async function GET() {
  try {
    await connectMongoDB();
    const allGames = await game.find({}).sort({ trys: 1, createdAt: -1 });
    return NextResponse.json(allGames);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
