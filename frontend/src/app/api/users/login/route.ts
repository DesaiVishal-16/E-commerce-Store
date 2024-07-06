import { NextResponse } from "next/server";
const BACKEND_URL = "http://localhost:8000/login/";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Here, you would typically make a fetch request to your Django backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to log in" }, { status: 401 });
  }
}
