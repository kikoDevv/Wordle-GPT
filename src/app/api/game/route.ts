import { NextRequest, NextResponse } from "next/server";
/*------------------- get the userInput form front end -------------------*/
export async function POST(request: NextRequest) {
  const body = await request.json();
  const userInput = body.guess;
  console.log("Received userInput--------->", userInput);
  return NextResponse.json({ received: userInput });
}
