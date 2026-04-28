# 🎯 Disha — Stress-Aware Career Guidance

A fully interactive, AI-powered career guidance website that combines aptitude testing,
real-time stress profiling, and career crisis simulation.

---

## 📁 File Structure

```
disha-website/
├── index.html   ← Main HTML (all screens)
├── style.css    ← All styling
├── app.js       ← All game logic + Gemini API calls
└── README.md    ← This file
```

---

## 🚀 How to Run

### Option 1 — Open directly in browser (simplest)
Just double-click `index.html`. Everything runs client-side.

> ⚠️ The Gemini API calls (simulation + debrief) require a server context due to
> CORS. For local testing, use Option 2 or 3 below.

### Option 2 — Python local server (recommended)
```bash
cd disha-website
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 3 — Node.js live server
```bash
npm install -g live-server
live-server disha-website
```

---

## 🤖 AI Features 

The simulation turns and debrief are powered by the Gemini API.

The API calls are in `app.js` 



> ⚠️ Calling the API directly from the browser exposes your API key.
> For production, proxy these calls through your FastAPI backend (see below).

---

## 🔌 Connecting to Your FastAPI Backend

Your backend (`main.py`) already has these endpoints:

| Endpoint | Used for |
|----------|----------|
| `POST /api/v1/analyze-assessment` | Scoring (optional — currently done client-side) |
| `POST /api/v1/start-simulation` | Start a career scenario |
| `POST /api/v1/simulation-turn` | Each chat turn |
| `POST /api/v1/generate-debrief` | End-of-simulation feedback |

To switch from direct Gemini API to your backend, replace the fetch calls in `app.js`:

```javascript

const res = await fetch("http://localhost:8000/api/v1/simulation-turn", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_history: histStr,
    user_reply: userReply
  })
});
const d = await res.json();
return d.ai_response;

// In genDebrief() — replace with:
const res = await fetch("http://localhost:8000/api/v1/generate-debrief", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_history: histStr })
});
const d = await res.json();
// parse d.debrief
```

Make sure your FastAPI backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
```

---

## 🎮 Flow

1. **Welcome** → click to start
2. **Mood check** → pick 1–5 emoji
3. **Assessment** → 12 timed questions (numerical / logical / verbal)
   - 18 seconds per question
   - Timer colour changes: purple → amber → red
   - Correct/wrong feedback shown after each answer
   - Progress dots track accuracy in real time
4. **Results** → stats cards + interactive bubble cluster map
   - Click any bubble to start that career's simulation
   - Or pick from the top-matches list
5. **Simulation** → 3-turn AI crisis chat
   - Quick reply buttons available
   - Powered by Gemini API or your backend
6. **Debrief** → animated score ring + 4 personalised insight cards

---

## 📦 Dependencies

None — pure HTML, CSS, JavaScript. No npm, no build step.

The only external resource is the Google Fonts CDN (loaded in `index.html`).

---

## 🛠 Customisation

- **Add careers** → edit the `CAREERS` array in `app.js`
- **Change questions** → edit the `SQ` array in `app.js`
- **Adjust scoring** → edit `computeFits()` in `app.js`
- **Change colours** → edit CSS variables in `style.css` under `:root`
