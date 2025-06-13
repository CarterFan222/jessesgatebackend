export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(decodeURIComponent(targetUrl));
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "text/plain");
    const body = await response.text();
    res.send(body);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
