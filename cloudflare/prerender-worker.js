const BOT_AGENTS = [
  "googlebot",
  "adsbot-google",
  "apis-google",
  "mediapartners-google",
  "google-safety",
  "feedfetcher-google",
  "googleproducer",
  "google-site-verification",
  "bingbot",
  "yandexbot",
  "yabrowser",
  "yahoo",
  "baiduspider",
  "naver",
  "seznambot",
  "sznprohlizec",
  "qwantbot",
  "ecosia",
  "duckduckbot",
  "duckassistbot",
  "applebot",
  "facebookexternalhit",
  "facebookcatalog",
  "facebookbot",
  "meta-externalagent",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "slackbot",
  "pinterest",
  "pinterestbot",
  "tiktok",
  "tiktokspider",
  "bytespider",
  "discordbot",
  "semrushbot",
  "ahrefsbot",
  "chrome-lighthouse",
  "screaming-frog",
  "oncrawlbot",
  "botifybot",
  "deepcrawl",
  "lumar",
  "rogerbot",
  "dotbot",
  "gptbot",
  "chatgpt",
  "oai-searchbot",
  "chatgpt-user",
  "claudebot",
  "google-extended",
  "perplexitybot",
  "perplexity-user",
  "youbot",
  "amazonbot",
  "anthropic-ai",
  "claude-web",
  "claude-user",
  "ccbot",
  "mistralai-user",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest/0.",
  "developers.google.com/+/web/snippet",
  "vkshare",
  "w3c_validator",
  "redditbot",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "google page speed",
  "qwantify",
  "bitrix link preview",
  "xing-contenttabreceiver",
  "google-inspectiontool",
  "telegrambot",
  "integration-test",
];

const IGNORE_EXTENSIONS = [
  ".js",
  ".css",
  ".xml",
  ".less",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".pdf",
  ".doc",
  ".txt",
  ".ico",
  ".rss",
  ".zip",
  ".mp3",
  ".rar",
  ".exe",
  ".wmv",
  ".avi",
  ".ppt",
  ".mpg",
  ".mpeg",
  ".tif",
  ".wav",
  ".mov",
  ".psd",
  ".ai",
  ".xls",
  ".mp4",
  ".m4a",
  ".swf",
  ".dat",
  ".dmg",
  ".iso",
  ".flv",
  ".m4v",
  ".torrent",
  ".woff",
  ".ttf",
  ".svg",
  ".webmanifest",
];

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch {
      return fetch(request);
    }
  },
};

async function handleRequest(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/robots.txt") {
    return new Response(
      [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://dmrsoaps.com/sitemap.xml",
        "",
      ].join("\n"),
      {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }

  const userAgent = request.headers.get("User-Agent")?.toLowerCase() || "";
  const isPrerenderRequest = request.headers.get("X-Prerender");
  const pathName = url.pathname.toLowerCase();
  const lastDot = pathName.lastIndexOf(".");
  const extension = lastDot > -1 ? pathName.substring(lastDot) : "";
  const shouldPrerender =
    !isPrerenderRequest &&
    BOT_AGENTS.some((bot) => userAgent.includes(bot)) &&
    !(extension.length && IGNORE_EXTENSIONS.includes(extension));

  if (!shouldPrerender || !env.PRERENDER_TOKEN) {
    return fetch(request);
  }

  const prerenderHeaders = new Headers(request.headers);
  prerenderHeaders.set("X-Prerender-Token", env.PRERENDER_TOKEN);
  prerenderHeaders.set("X-Prerender-Int-Type", "CloudFlare");

  return fetch(
    new Request(`https://service.prerender.io/${request.url}`, {
      headers: prerenderHeaders,
      redirect: "manual",
    })
  );
}
