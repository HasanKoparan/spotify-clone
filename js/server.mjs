import { createServer } from "node:http";

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://127.0.0.1:3000");

  if (request.method !== "GET" || url.pathname !== "/api/search") {
    response.end("Sunucu calisiyor!");
    return;
  }

  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

  const query = url.searchParams.get("q")?.trim();

  if (!query) {
    response.statusCode = 400;
    response.end(JSON.stringify({ error: "Arama kelimesi gerekli." }));
    return;
  }

  const shazamUrl = new URL("https://shazam.p.rapidapi.com/v2/search");
  shazamUrl.searchParams.set("term", query);

  try {
    const shazamResponse = await fetch(shazamUrl, {
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    if (!shazamResponse.ok) {
      throw new Error(`Shazam HTTP ${shazamResponse.status}`);
    }

    const data = await shazamResponse.json();
    const songs = data.results?.songs?.data ?? [];
    response.end(JSON.stringify(songs.map((song) => song.attributes)));
  } catch (error) {
    console.error(error.message);
    response.statusCode = 502;
    response.end(JSON.stringify({ error: "Shazam'dan sonuç alınamadı." }));
  }
});

const port = Number(process.env.PORT ?? 3000);
const host = process.env.PORT ? "0.0.0.0" : "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Sunucu hazır → http://${host}:${port}`);
});
