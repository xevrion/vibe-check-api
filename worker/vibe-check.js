// the actual api. yes, a real one. this runs on cloudflare's edge
// and is the thing curl actually talks to.
//
// the docs page (index.html) calls this same endpoint now too,
// so what you see in "try it" is exactly what you get from curl.

const VIBES = [
  "immaculate",
  "cooked",
  "mid",
  "chaotic neutral",
  "suspiciously good",
  "certified unhinged",
  "low-key thriving",
  "high-key spiraling",
  "ok but make it weird",
  "blessed",
  "cursed",
  "404 vibe not found",
  "ascended",
  "feral",
  "unreasonably confident",
  "quietly falling apart",
  "main character energy",
  "npc energy",
  "delulu but in a fun way",
  "touch grass advised",
  "elite tier",
  "concerning but funny",
  "powered entirely by spite",
  "running on 3 hours of sleep and hope"
];

const CONFIDENCES = [
  "suspiciously high",
  "based on vibes alone",
  "don't question it",
  "98% certain, 2% lying",
  "extremely confident, zero evidence",
  "the council voted unanimously",
  "moderate, like a shrug but official",
  "low, but we're saying it with our chest",
  "calculated using ancient math",
  "trust the process",
  "confidence interval: yes"
];

const RECOMMENDATIONS = [
  "keep doing whatever you're doing bhai",
  "stop. immediately. but also keep going",
  "this is your sign. sign says nothing readable though",
  "consult a raccoon before proceeding",
  "proceed with caution, or don't, your call honestly",
  "manifest harder",
  "this energy belongs in a museum",
  "do it for the plot",
  "log off. but in a confident way",
  "this is giving 'final boss' energy, act accordingly",
  "drink some water and reassess in 10 minutes",
  "the council suggests chaos, respectfully",
  "rebrand and try again",
  "this vibe has main character privileges, use wisely",
  "absolutely not, but also yes",
  "frame this moment. literally, get a frame",
  "ask again after touching grass",
  "send it. send it now. don't overthink",
  "this requires a snack break first",
  "you already know what to do, we're just confirming"
];

const CHECKED_BY = [
  "the vibe council",
  "3 raccoons in a trenchcoat",
  "ancient vibe scripture",
  "a magic 8-ball with trust issues",
  "your group chat (probably)",
  "the ministry of mid energy",
  "a fortune cookie that's seen too much",
  "two pigeons and a calculator",
  "the algorithm, allegedly",
  "a very tired intern",
  "the office printer (it knows things)",
  "your horoscope's evil twin",
  "the vibes department (unfunded)",
  "a committee of one (it's a cat)",
  "whoever left this comment unattended"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function vibeCheck(query) {
  return {
    query: query || "",
    vibe: pick(VIBES),
    score: randInt(0, 100),
    confidence: pick(CONFIDENCES),
    recommendation: pick(RECOMMENDATIONS),
    red_flags: randInt(0, 5),
    certified: Math.random() > 0.5,
    checked_by: pick(CHECKED_BY),
    timestamp: new Date().toISOString()
  };
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    return Response.json(vibeCheck(query), {
      headers: CORS_HEADERS
    });
  }
};
