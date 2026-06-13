# Vibe Check API

it's 2am and i built an API.

it does not exist.

## what is this

`vibe.xevrion.dev` is a "REST API" that checks the vibe of anything you
send it. query, decision, your situationship, doesn't matter. it
returns a fully formed JSON response with a score, a confidence level,
a recommendation, and a council that "checked" it.

there is no backend. there is no database. there is no `/api`. it's
one HTML file with some JS that rolls dice and pretends really hard.

the docs page looks real on purpose. that's the whole bit.

## the endpoint

```
GET /vibe-check?q={anything}
```

yes, "GET"-ing it just means typing into a box on the page and
clicking a button. the curl command below is for vibes only (pun
intended, i'm not sorry).

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

run the curl command above and you'll get... nothing, because there's
no server at that path. that's the joke. open the site and use the
"try it" box instead. that's the real API. the real API is a button.

### more example queries, for the bit

```bash
curl "https://vibe.xevrion.dev/vibe-check?q=quitting+my+job+to+build+a+fake+api"
curl "https://vibe.xevrion.dev/vibe-check?q=3am+thoughts"
curl "https://vibe.xevrion.dev/vibe-check?q="
```

that last one (empty query) still works. the council vibe-checks the
void too. very thorough.

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
rate limits and an actual SLA: this is not that. this is a button that
makes a fake JSON object and shows it to you with a fake 800ms delay
so it *feels* like a network request happened. it did not.

## tech stack

- HTML
- CSS
- JS
- `Math.random()`
- spite

zero dependencies. zero frameworks. zero backend. one file
(`index.html`). deploy it anywhere that can serve a static file:
GitHub Pages, Netlify, Vercel, a USB stick, doesn't matter.

## local dev

```bash
open index.html
```

that's it. that's the dev environment. no `npm install`, no build
step, no `.env`, nothing to configure. if it's broken, it's broken in
the file itself, ctrl+f and go fix it.

## license

do whatever you want with this. steal the vibe council, they were
never real anyway.

---

*powered by vibes and questionable science*
