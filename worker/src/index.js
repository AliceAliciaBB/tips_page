const course = {
  course: "IT",
  title: "ITビジネス学科",
  message: "Hello Workers",
  skills: ["Web制作", "JavaScript", "Cloudflare Workers"]
};

const fortunes = [
  { result: "大吉", message: "小さな一歩が大きな成果につながります。" },
  { result: "中吉", message: "試してから考えると、よい流れが生まれます。" },
  { result: "吉", message: "誰かに見せると新しい発見があります。" },
  { result: "末吉", message: "焦らず、ひとつずつ進めましょう。" }
];

const events = [
  { date: "2026-09-18", title: "Workers API 入門", type: "講座" },
  { date: "2026-09-25", title: "Pages 公開ハンズオン", type: "実習" },
  { date: "2026-10-02", title: "ミニアプリ発表会", type: "発表" }
];

function getCorsHeaders(request, env) {
  const requestedOrigin = request.headers.get("Origin");
  const allowedOrigin = env.ALLOWED_ORIGIN || "*";
  const origin = allowedOrigin === "*" || allowedOrigin === requestedOrigin ? allowedOrigin : "null";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "Content-Type",
    "access-control-max-age": "86400",
    "content-type": "application/json; charset=UTF-8"
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: getCorsHeaders(request, env)
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: getCorsHeaders(request, env) });
    if (request.method !== "GET") return json({ error: "Method Not Allowed" }, 405, request, env);

    if (url.pathname === "/api" || url.pathname === "/api/") {
      return json({ status: "running", service: "senka-api", timestamp: new Date().toISOString() }, 200, request, env);
    }
    if (url.pathname === "/api/course") return json(course, 200, request, env);
    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name || name.length > 40) return json({ error: "name is required and must be 40 characters or fewer" }, 400, request, env);
      return json({ message: `こんにちは、${name}さん！`, name }, 200, request, env);
    }
    if (url.pathname === "/api/fortune") {
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      return json({ ...fortune, generatedAt: new Date().toISOString() }, 200, request, env);
    }
    if (url.pathname === "/api/events") return json({ events }, 200, request, env);
    return json({ error: "Not Found" }, 404, request, env);
  }
};