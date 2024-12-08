export async function POST(req: Request) {
  try {
    const base: string = process.env.NEXT_BASE_API_URL || "";
    const apiKey: string = process.env.NEXT_API_KEY || "";

    if (!base || !apiKey) {
      throw new Error("Base API URL or API Key is missing");
    }

    const requestBody = await req.json();

    const response: any = await fetch(`${base}starter/cost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        key: apiKey,
      },
      body: new URLSearchParams(requestBody).toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify(data), { status: response.status });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in POST handler:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
