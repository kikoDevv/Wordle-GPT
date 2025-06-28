import connectMongoDB from '@/lib/mongodb/connection';
import game from '@/lib/mongodb/models/gameSession';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Backend received full data object:", JSON.stringify(data, null, 2));
  console.log("Individual fields:");
  console.log("- trys:", data.trys);
  console.log("- userName:", data.userName);
  console.log("- wordLength:", data.wordLength);
  console.log("- targetWord:", data.targetWord);
  console.log("- unique:", data.unique);

  /*------------------- Send data to data base -------------------*/
  await connectMongoDB();
  const result = await game.create({userName: data.userName, targetWord: data.targetWord, wordLength: data.wordLength, unique: data.unique, trys: data.trys});
  console.log("Saved to MongoDB:", result);
  return NextResponse.json("Backend received trys data");
}