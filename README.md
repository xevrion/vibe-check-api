# Vibe Check API

it's 2am and i built an API.

it actually exists now. wasn't supposed to, but here we are.

## what is this

`vibe.xevrion.dev` is a "REST API" that checks the vibe of anything you
send it. query, decision, your situationship, doesn't matter. it
returns a fully formed JSON response with a score, a confidence level,
a recommendation, and a council that "checked" it.

the docs page looks real because the API is real now too. small
cloudflare worker behind it, returning the same json shape every time,
just with the fields rolled fresh on each request.

## the endpoint

```
GET /vibe-check?q={anything}
```

works from curl, fetch, your browser, postman, whatever. no auth,
no api key, no rate limit. send it.

### example request

```bash
curl "https://vibe.xevrion.dev/vibe-check?q=should+i+send+this+text"
```

### example response

```json
{
  "query": "should i send this text",
  "vibe": "chaotic neutral",
  "score": 61,
  "confidence": "based on vibes alone",
  "recommendation": "send it. send it now. don't overthink",
  "red_flags": 2,
  "certified": true,
  "checked_by": "the vibe council",
  "timestamp": "2026-06-13T01:42:09.881Z"
}
```

run that curl command and you'll actually get a response. every field
except `query` and `timestamp` is randomized per request. the "try it"
box on the docs page hits this exact same endpoint.

### more example queries, for the bit

```bash
curl "https://vibe.xevrion.dev/vibe-check?q=quitting+my+job+to+build+a+fake+api+that+turned+real"
curl "https://vibe.xevrion.dev/vibe-check?q=3am+thoughts"
curl "https://vibe.xevrion.dev/vibe-check?q="
```

that last one (empty query) still works. the council vibe-checks the
void too. very thorough.

### use it from your own site

CORS is wide open (`Access-Control-Allow-Origin: *`), so go nuts:

```js
const res = await fetch("https://vibe.xevrion.dev/vibe-check?q=my+pull+request");
const { vibe, score, recommendation } = await res.json();
```

put it in a CI badge, a slack bot, a browser extension, whatever. it's
free real estate.

## response fields

| field | type | meaning |
|---|---|---|
| `query` | string | what you typed. we don't store it, we don't read it, we just throw it back at you |
| `vibe` | string | one of 24 official vibe classifications, picked at random |
| `score` | number | 0-100, means nothing, please don't put this in a spreadsheet |
| `confidence` | string | how sure the council is (never very) |
| `recommendation` | string | what to do next. do not actually do this |
| `red_flags` | number | 0-5, vibes-based, not evidence-based |
| `certified` | boolean | coin flip |
| `checked_by` | string | which unqualified authority signed off on this |
| `timestamp` | string | the one (1) real piece of data in the entire response |

## why does this exist

great question. let's workshop some answers:

- because `vibe.xevrion.dev` was sitting there doing nothing
- because writing fake API docs is funnier than writing real ones
- because at some point "let me just check the vibe real quick" stopped
  being a joke and started being a design requirement
- because every other side project i start needs a database and this
  one needs `Math.random()` and a dark theme
- honestly no further questions, your honor

if you came here looking for an actual API with actual auth and actual
rate limits and an actual SLA: this is not that. there's no auth, no
rate limits, and the only SLA is "the council felt like responding".
the json is real though. that part we promise.

## how it's built

two parts, glued together with DNS:

### 1. the docs page (`index.html`)

a single static HTML file. dark theme, sidebar nav, code blocks,
copy buttons, an active-section highlighter, and the "try it" box.
zero build step, zero dependencies, zero frameworks. it's just html,
css, and one `<script>` tag.

hosted on **GitHub Pages**, served from the `main` branch root.

### 2. the actual api (`worker/vibe-check.js`)

a tiny **Cloudflare Worker**. handles `GET /vibe-check`, picks random
entries from a handful of arrays (vibes, confidence levels,
recommendations, "authorities"), and returns them as json with CORS
headers wide open.

```bash
cd worker
npx wrangler deploy
```

config lives in `worker/wrangler.jsonc`. the route is bound directly
to `vibe.xevrion.dev/vibe-check*`.

### 3. wiring it together

both pieces need to live on `vibe.xevrion.dev`, which meant:

- **DNS**: `vibe.xevrion.dev` is a CNAME to `xevrion.github.io`,
  proxied through Cloudflare (orange cloud, not "DNS only")
- **GitHub Pages**: handles everything except `/vibe-check` — the docs
  page, assets, 404s, all of it
- **Cloudflare Worker Route**: `vibe.xevrion.dev/vibe-check*` gets
  intercepted by Cloudflare *before* it reaches GitHub Pages, and the
  worker answers instead
- **SSL/TLS mode**: set to "Full" in Cloudflare, so it can still talk
  to GitHub Pages over https without choking on the cert

net effect: one domain, two backends, nobody can tell from the
outside. the docs page's "try it" box and `curl` hit the literal same
url and get the literal same kind of response.

## local dev

### docs page

on linux:

```bash
xdg-open index.html
```

or just double-click it in your file manager, or drag it into a
browser tab, whatever. it's a static file, it doesn't care.

heads up: the "try it" box calls `/vibe-check` as a relative path, so
when opened locally (`file://`) it'll try to hit your local
filesystem and fail. that's expected — it only resolves correctly on
`vibe.xevrion.dev`. if you want to test it locally, run the worker
(below) and point `API_URL` in `index.html` at `http://localhost:8787`.

### worker

```bash
cd worker
npx wrangler dev
```

spins up the worker on `localhost:8787`. test it with:

```bash
curl "http://localhost:8787/vibe-check?q=does+this+work+locally"
```

## license

do whatever you want with this. steal the vibe council, they were
never real anyway.

---

*powered by vibes and questionable science*
