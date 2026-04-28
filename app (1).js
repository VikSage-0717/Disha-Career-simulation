/* ============================================================
   DISHA — app.js
   All game logic: mood, assessment, cluster map, simulation, debrief
   ============================================================ */

/* ---------------------------------------------------------------
   DATA: Careers
--------------------------------------------------------------- */
const CAREERS = [
  { title:"Doctor",             emoji:"👨‍⚕️", cluster:"Healthcare",     clusterColor:"#1dc8a0", minApt:80, stress:"High",
    scenario:`It's 2 AM in the ICU. Three critical patients simultaneously. A 45-year-old post-op patient's vitals are crashing, a teenager rushed in with suspected meningitis, and your senior consultant is stuck in emergency surgery. The on-call nurse looks to you. Your pager is going off. What do you do first?` },
  { title:"ER Nurse",           emoji:"👩‍⚕️", cluster:"Healthcare",     clusterColor:"#1dc8a0", minApt:65, stress:"High",
    scenario:`Friday 11 PM — three ambulances pull in at once. Asthmatic child, spinal injury, cardiac arrest. Your senior stepped away, the attending is in surgery, two student nurses are shadowing you. The alarm on Bed 2 goes off. What do you do?` },
  { title:"Surgeon",            emoji:"🔬",   cluster:"Healthcare",     clusterColor:"#1dc8a0", minApt:85, stress:"High",
    scenario:`Mid-surgery you discover an unexpected complication — the patient's anatomy differs from the scans. The anaesthesiologist flags dropping BP. Your scrub nurse quietly says the wrong implant size was prepared. The clock is running. What is your call?` },
  { title:"Psychologist",       emoji:"🧠",   cluster:"Healthcare",     clusterColor:"#1dc8a0", minApt:68, stress:"Medium",
    scenario:`A long-term client discloses they have been thinking about self-harm — something they say they have "thought about" but not acted on. They beg you not to tell anyone. What is your next move?` },
  { title:"Software Engineer",  emoji:"💻",   cluster:"Technology",     clusterColor:"#7c6af7", minApt:75, stress:"Medium",
    scenario:`Production is down. The payment gateway has been double-charging customers for 3 hours. The code you deployed this morning is the culprit. Your team lead is on a flight, the CTO is demanding updates every 15 minutes, customer support is overwhelmed. What do you do?` },
  { title:"Data Scientist",     emoji:"📊",   cluster:"Technology",     clusterColor:"#7c6af7", minApt:80, stress:"Low",
    scenario:`You are presenting quarterly projections to the board in 20 minutes when you discover your key dataset has a processing error — revenue numbers are off by 18%. Your manager is unreachable. The CFO just walked in early. How do you handle it?` },
  { title:"UX Designer",        emoji:"🎨",   cluster:"Technology",     clusterColor:"#7c6af7", minApt:58, stress:"Low",
    scenario:`Your biggest design project is due tomorrow. The client just sent a last-minute request to scrap the entire visual language and start over. Your developer says any change now breaks the sprint. The product manager is caught in the middle. What is your move?` },
  { title:"Lawyer",             emoji:"⚖️",   cluster:"Law & Policy",   clusterColor:"#efb627", minApt:80, stress:"High",
    scenario:`You are mid-trial when you discover a key document may have been mislabeled — it could be inadmissible. Opposing counsel has not noticed yet. The judge is ready to proceed. Withdrawing could cost your client everything. What do you do?` },
  { title:"Judge",              emoji:"🏛️",   cluster:"Law & Policy",   clusterColor:"#efb627", minApt:88, stress:"Medium",
    scenario:`A high-profile case has a procedural error — evidence you admitted may be unconstitutional. Both sides built their entire cases around it. Reversing now could cause a mistrial. The media is watching every move. How do you rule?` },
  { title:"Civil Servant",      emoji:"🏢",   cluster:"Law & Policy",   clusterColor:"#efb627", minApt:62, stress:"Medium",
    scenario:`A government scheme launches in 6 hours. You discover a data entry error affecting 12,000 beneficiary records. The minister gives a press conference in 2 hours. Fixing it requires halting the launch. What do you recommend?` },
  { title:"Chartered Accountant",emoji:"💰",  cluster:"Finance",        clusterColor:"#378add", minApt:78, stress:"Medium",
    scenario:`During a client audit you find evidence that funds are being moved in a way that looks like fraud — but could also be a legitimate restructuring you were not briefed on. The client CEO is your contact. Filing a report could end the engagement. What do you do?` },
  { title:"Investment Banker",  emoji:"📈",   cluster:"Finance",        clusterColor:"#378add", minApt:84, stress:"High",
    scenario:`A deal you have been structuring for 8 months closes in 4 hours. A junior analyst just flagged a valuation model error that could tank the deal if the other side finds out. Correcting it changes the terms significantly. What do you do?` },
  { title:"Financial Analyst",  emoji:"📉",   cluster:"Finance",        clusterColor:"#378add", minApt:76, stress:"Low",
    scenario:`Your quarterly report has been distributed to 200 clients when you spot a formula error — projected returns are overstated by 3x. Some clients have likely already traded on the numbers. What are your next steps?` },
  { title:"Journalist",         emoji:"📰",   cluster:"Creative & Media",clusterColor:"#e05aaa", minApt:65, stress:"High",
    scenario:`You are 2 hours from publishing an investigative piece on corporate fraud when the company's PR team calls threatening legal action. Your source is now refusing to be named. Your editor says run it anyway. What do you do?` },
  { title:"Author / Writer",    emoji:"✍️",   cluster:"Creative & Media",clusterColor:"#e05aaa", minApt:60, stress:"Low",
    scenario:`Your publisher wants to release your novel in 6 weeks. You have just realised a key character arc undermines the theme you have been building toward. Rewriting means missing the deadline. Keeping it means publishing something that does not feel true. What do you choose?` },
  { title:"Film Director",      emoji:"🎬",   cluster:"Creative & Media",clusterColor:"#e05aaa", minApt:63, stress:"High",
    scenario:`On the last day of your most expensive shoot, the lead actor refuses to film the climactic scene — the script changed too much from what they agreed to. You have 4 hours of golden light left. The studio executive just arrived on set. What do you do?` },
  { title:"Graphic Designer",   emoji:"🖼️",   cluster:"Creative & Media",clusterColor:"#e05aaa", minApt:56, stress:"Low",
    scenario:`Your biggest campaign is due in 4 hours. The client wants a complete rebrand — new colours, fonts, logo placement. Your art director says the original brief was approved and you should not change it. The client CC'd their CEO. What do you do?` },
  { title:"Teacher",            emoji:"👩‍🏫", cluster:"Education",      clusterColor:"#f07b5d", minApt:62, stress:"Low",
    scenario:`A student accuses another of plagiarism on a final exam — the evidence is convincing but not conclusive. The accused has a scholarship on the line. Your department head wants the case resolved by tomorrow. What is your approach?` },
  { title:"School Principal",   emoji:"🏫",   cluster:"Education",      clusterColor:"#f07b5d", minApt:70, stress:"Medium",
    scenario:`A parent complaint about a teacher's methods has gone viral with 10,000 shares. The teacher is one of your best educators. Parents are demanding a response. The teacher is devastated. How do you handle both?` },
  { title:"Librarian",          emoji:"📚",   cluster:"Education",      clusterColor:"#f07b5d", minApt:55, stress:"Low",
    scenario:`You discover 47 rare manuscripts may have been mislabelled and stored incorrectly for decades. A journalist has heard about it. Your director is travelling. The university president's office is calling for a report. What do you do first?` },
  { title:"Air Traffic Controller",emoji:"✈️",cluster:"Engineering",    clusterColor:"#63a322", minApt:88, stress:"High",
    scenario:`You are managing 14 aircraft during an unexpected storm. Two report turbulence, one declares fuel emergency, two are on a potential collision course from an earlier routing mistake. Your radio is cutting in and out. Your supervisor just stepped away. What do you do?` },
  { title:"Civil Engineer",     emoji:"🏗️",   cluster:"Engineering",    clusterColor:"#63a322", minApt:76, stress:"Medium",
    scenario:`During inspections you find a foundation section of a public bridge was poured with the wrong concrete mix — it meets minimum standards but not your firm's specs. The project is 80% complete. Rebuilding costs 2 crore and 3 months. What do you report?` },
];

/* Build cluster colour lookup */
const CLUSTER_COLORS = {};
CAREERS.forEach(c => { CLUSTER_COLORS[c.cluster] = c.clusterColor; });

/* ---------------------------------------------------------------
   DATA: Assessment Questions
--------------------------------------------------------------- */
const SQ = [
  { text:"Which number comes next in the series: 3, 6, 12, 24, ___?",
    opts:["36","48","40","32"], correct:1, type:"math",
    explain:"Each number doubles. 24 × 2 = 48" },
  { text:"All pilots are trained. Some trained people stay calm under pressure. What must be true?",
    opts:["All pilots are calm","Some pilots may be calm","No pilots are calm","Calm people are always pilots"], correct:1, type:"logic",
    explain:"Pilots are a subset of trained people. Because some trained people are calm, some pilots may be calm." },
  { text:"A hospital has 240 beds. 75% are occupied. How many beds are free?",
    opts:["55","60","65","70"], correct:1, type:"math",
    explain:"75% of 240 = 180 occupied. 240 − 180 = 60 free." },
  { text:"Complete the analogy: Lawyer is to courtroom as doctor is to ___?",
    opts:["Stethoscope","Hospital","Medicine","Patient"], correct:1, type:"verbal",
    explain:"A lawyer works in a courtroom; a doctor works in a hospital." },
  { text:"If 6 workers build a wall in 8 days, how many days do 12 workers take?",
    opts:["3 days","4 days","5 days","6 days"], correct:1, type:"math",
    explain:"Total work = 6 × 8 = 48 worker-days. 48 ÷ 12 = 4 days." },
  { text:"All contracts are documents. No documents are verbal. Therefore:",
    opts:["All contracts are verbal","No contracts are verbal","Some contracts are verbal","Contracts may be verbal"], correct:1, type:"logic",
    explain:"All contracts are documents. No documents are verbal. Therefore no contracts are verbal." },
  { text:"A train travels 360 km in 4 hours. What is its speed in km/h?",
    opts:["80","85","90","95"], correct:2, type:"math",
    explain:"360 ÷ 4 = 90 km/h." },
  { text:"Choose the odd one out: Symphony, Concerto, Sonata, Litigation",
    opts:["Symphony","Concerto","Sonata","Litigation"], correct:3, type:"verbal",
    explain:"Symphony, Concerto and Sonata are musical forms. Litigation is a legal term." },
  { text:"If today is Wednesday, what day is it 100 days from now?",
    opts:["Monday","Tuesday","Wednesday","Friday"], correct:3, type:"logic",
    explain:"100 ÷ 7 = 14 weeks remainder 2. Wednesday + 2 days = Friday." },
  { text:"A budget of ₹80,000 is split in ratio 3:5. What is the smaller share?",
    opts:["₹25,000","₹28,000","₹30,000","₹32,000"], correct:2, type:"math",
    explain:"Total parts = 8. Smaller share = (3/8) × 80,000 = ₹30,000." },
  { text:"Unscramble: LEANG — which word does it make?",
    opts:["ANGLE","GLEAN","ANGEL","PANEL"], correct:1, type:"verbal",
    explain:"LEANG rearranged = GLEAN (to gather gradually)." },
  { text:"No engineers are poets. Some poets are dreamers. Which conclusion is definitely valid?",
    opts:["Some engineers are dreamers","No engineers are dreamers","All dreamers are engineers","Some dreamers may be engineers"], correct:3, type:"logic",
    explain:"We only know some poets are dreamers. We cannot exclude engineers from being dreamers via another path. 'Some dreamers may be engineers' is the safest valid deduction." },
];

const TOTAL_Q = SQ.length;
const KEYS = ['A', 'B', 'C', 'D'];

const SIM_FALLBACKS = [
  "Your decision creates a ripple. Part of the team settles — but an unexpected complication surfaces. Someone else is now affected and you have fewer options than before. What is your next call?",
  "Solid instinct. The situation stabilises slightly, but a new stakeholder enters — they heard about the crisis second-hand and have their own expectations. How do you manage this?",
  "The crisis winds down, but now comes accountability. Someone senior asks what happened and why. Your answer shapes how your judgment is perceived going forward. How do you frame it?"
];

/* ---------------------------------------------------------------
   STATE
--------------------------------------------------------------- */
let S = {
  mood: 0, responses: [], curQ: 0, qStart: 0, hov: 0,
  apt: 0, stress: 0, profile: "Medium",
  career: null, chatHist: [], turn: 0
};
let timerInterval = null;
let hovTimer = null;
let answered = false;
let bubbles = [];

/* ---------------------------------------------------------------
   UTILITIES
--------------------------------------------------------------- */
function setP(p) { document.getElementById('pfill').style.width = p + '%'; }

function go(scr) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('scr-' + scr).classList.add('active');
  window.scrollTo(0, 0);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/* ---------------------------------------------------------------
   MOOD
--------------------------------------------------------------- */
function pickMood(v, el) {
  document.querySelectorAll('.mb').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
  S.mood = v;
  document.getElementById('mood-next').style.display = 'block';
}

/* ---------------------------------------------------------------
   ASSESSMENT
--------------------------------------------------------------- */
function renderQProgress() {
  const container = document.getElementById('qprogress');
  container.innerHTML = '';
  for (let i = 0; i < TOTAL_Q; i++) {
    const d = document.createElement('div');
    d.className = 'qp-dot';
    if (i < S.curQ) {
      d.classList.add(S.responses[i] && S.responses[i].is_correct ? 'done-correct' : 'done-wrong');
    } else if (i === S.curQ) {
      d.classList.add('current');
    }
    container.appendChild(d);
  }
}

function renderQ() {
  answered = false;
  clearInterval(timerInterval);

  const q = SQ[S.curQ];
  document.getElementById('qbadge').textContent = 'Q ' + (S.curQ + 1) + ' / ' + TOTAL_Q;
  renderQProgress();

  const typeLabel = { math: 'Numerical', logic: 'Logical reasoning', verbal: 'Verbal' };
  const typeClass = { math: 'tag-math', logic: 'tag-logic', verbal: 'tag-verbal' };

  const optionsHTML = q.opts.map((opt, i) =>
    `<button class="opt" id="opt-${i}" onclick="pickAnswer(${i})" onmouseenter="trackHov()">
      <span class="optkey">${KEYS[i]}</span>
      <span class="opttext">${opt}</span>
    </button>`
  ).join('');

  document.getElementById('qarea').innerHTML = `
    <div class="qcard">
      <div class="qtag ${typeClass[q.type]}">${typeLabel[q.type]}</div>
      <div class="qnum">Question ${S.curQ + 1} of ${TOTAL_Q}</div>
      <div class="qtxt">${q.text}</div>
      <div class="opts" id="opts-container">${optionsHTML}</div>
      <div id="feedback-bar"></div>
    </div>`;

  S.qStart = Date.now();
  S.hov = 0;
  startTimer(18);
}

function trackHov() {
  if (answered) return;
  clearTimeout(hovTimer);
  hovTimer = setTimeout(() => { if (!answered) S.hov++; }, 500);
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  let remaining = seconds;
  const fill = document.getElementById('tfill');
  fill.style.transition = 'none';
  fill.style.width = '100%';
  fill.style.background = 'var(--acc)';
  setTimeout(() => { fill.style.transition = 'width 0.1s linear'; }, 50);

  timerInterval = setInterval(() => {
    if (answered) { clearInterval(timerInterval); return; }
    remaining--;
    const pct = (remaining / seconds) * 100;
    fill.style.width = Math.max(0, pct) + '%';
    if (pct < 40) fill.style.background = 'var(--amber)';
    if (pct < 20) fill.style.background = 'var(--coral)';
    if (remaining <= 0) {
      clearInterval(timerInterval);
      if (!answered) autoAnswer();
    }
  }, 1000);
}

function autoAnswer() {
  if (answered) return;
  answered = true;
  const q = SQ[S.curQ];
  const t = Math.min((Date.now() - S.qStart) / 1000, 18);
  S.responses.push({ is_correct: 0, time_taken: t, hesitations: S.hov });

  document.querySelectorAll('.opt').forEach(b => b.setAttribute('data-answered', 'true'));
  document.getElementById('opt-' + q.correct).classList.add('correct');

  document.getElementById('feedback-bar').innerHTML =
    `<div class="feedback-bar fb-wrong">⏱ Time's up! Correct answer: ${KEYS[q.correct]}: ${q.opts[q.correct]}. ${q.explain}</div>`;

  setTimeout(() => advanceQ(), 2200);
}

function pickAnswer(idx) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q = SQ[S.curQ];
  const isCorrect = (idx === q.correct) ? 1 : 0;
  const t = Math.min((Date.now() - S.qStart) / 1000, 18);
  S.responses.push({ is_correct: isCorrect, time_taken: t, hesitations: S.hov });

  document.querySelectorAll('.opt').forEach(b => b.setAttribute('data-answered', 'true'));

  if (isCorrect) {
    document.getElementById('opt-' + idx).classList.add('correct');
    document.getElementById('feedback-bar').innerHTML =
      `<div class="feedback-bar fb-correct">✓ Correct! ${q.explain}</div>`;
  } else {
    document.getElementById('opt-' + idx).classList.add('wrong');
    document.getElementById('opt-' + q.correct).classList.add('correct');
    document.getElementById('feedback-bar').innerHTML =
      `<div class="feedback-bar fb-wrong">✗ Not quite. Answer: ${KEYS[q.correct]}: ${q.opts[q.correct]}. ${q.explain}</div>`;
  }

  setTimeout(() => advanceQ(), 1800);
}

function advanceQ() {
  S.curQ++;
  if (S.curQ < TOTAL_Q) { renderQ(); } else { finishAssessment(); }
}

/* ---------------------------------------------------------------
   SCORING
--------------------------------------------------------------- */
function finishAssessment() {
  clearInterval(timerInterval);
  const n = S.responses.length;
  const correct = S.responses.filter(r => r.is_correct).length;
  S.apt = Math.round((correct / n) * 100);

  const avgT = S.responses.reduce((a, r) => a + r.time_taken, 0) / n;
  const eRate = 1 - correct / n;
  const avgH = S.responses.reduce((a, r) => a + r.hesitations, 0) / n;
  const mInv = (5 - S.mood) / 4;
  S.stress = Math.round(100 * (
    (0.30 * Math.min(avgT / 10, 1)) +
    (0.20 * eRate) +
    (0.10 * Math.min(avgH / 3, 1)) +
    (0.40 * mInv)
  ));
  S.profile = S.stress < 40 ? 'Low' : S.stress < 70 ? 'Medium' : 'High';

  computeFits();
  renderResults();
  go('results');
  setP(65);
}

function computeFits() {
  CAREERS.forEach(c => {
    const aptFit = Math.max(0, Math.min(100, (S.apt - c.minApt + 35) / 60 * 100));
    let stressBonus = 0;
    if (S.profile === 'High')
      stressBonus = c.stress === 'High' ? 30 : c.stress === 'Medium' ? 18 : 8;
    else if (S.profile === 'Medium')
      stressBonus = c.stress === 'High' ? 8 : c.stress === 'Medium' ? 28 : 22;
    else
      stressBonus = c.stress === 'Low' ? 32 : c.stress === 'Medium' ? 16 : 4;
    c.fit = Math.max(12, Math.min(98, Math.round(aptFit * 0.6 + stressBonus * 0.4)));
  });
}

/* ---------------------------------------------------------------
   RESULTS — stats + bubble cluster + career list
--------------------------------------------------------------- */
function renderResults() {
  const sc = S.profile === 'Low' ? 'v-teal' : S.profile === 'Medium' ? 'v-amber' : 'v-coral';
  const correct = S.responses.filter(r => r.is_correct).length;

  document.getElementById('stats').innerHTML = `
    <div class="scard"><div class="scard-label">Aptitude score</div><div class="scard-val v-acc">${S.apt}%</div></div>
    <div class="scard"><div class="scard-label">Stress index</div><div class="scard-val ${sc}">${S.stress}</div></div>
    <div class="scard"><div class="scard-label">Stress profile</div><div class="scard-val" style="font-size:1.3rem">${S.profile}</div></div>
    <div class="scard"><div class="scard-label">Correct</div><div class="scard-val v-teal">${correct}/${TOTAL_Q}</div></div>`;

  drawBubbles();

  const top = [...CAREERS].sort((a, b) => b.fit - a.fit).slice(0, 6);
  document.getElementById('toplist').innerHTML = `
    <div class="slabel" style="margin-top:2rem;margin-bottom:.75rem">Top matches</div>
    <div class="clist">${top.map((c, i) => `
      <div class="ccard ${i === 0 ? 'top' : ''}" onclick="startSim('${c.title.replace(/'/g, "\\'")}')">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:24px">${c.emoji}</span>
          <div>
            <div class="cname">${i === 0 ? '⭐ ' : ''}${c.title}</div>
            <div class="cmeta">${c.cluster} · click to simulate</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="sbadge s-${c.stress.toLowerCase()}">${c.stress} stress</span>
          <span class="fit-pct">${c.fit}%</span>
        </div>
      </div>`).join('')}
    </div>`;
}

/* ---------------------------------------------------------------
   BUBBLE CLUSTER CHART
--------------------------------------------------------------- */
function drawBubbles() {
  const canvas = document.getElementById('clusterCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 680;
  const H = 440;
  canvas.width = W; canvas.height = H;

  const clusters = [...new Set(CAREERS.map(c => c.cluster))];
  const cols = 3;
  const cw = W / cols;
  const ch = H / Math.ceil(clusters.length / cols);
  bubbles = [];

  /* Build bubble list */
  clusters.forEach((cl, ci) => {
    const cx = (ci % cols + 0.5) * cw;
    const cy = (Math.floor(ci / cols) + 0.5) * ch;
    const members = CAREERS.filter(c => c.cluster === cl).sort((a, b) => b.fit - a.fit);
    const color = CLUSTER_COLORS[cl];
    members.forEach((c, mi) => {
      const angle = (mi / Math.max(members.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const spread = Math.min(cw, ch) * (members.length > 1 ? 0.28 : 0);
      const r = Math.max(14, Math.round(c.fit / 100 * 26));
      bubbles.push({ x: cx + Math.cos(angle) * spread, y: cy + Math.sin(angle) * spread + 8, r, color, career: c });
    });
  });

  function drawFrame(hoverCareer) {
    ctx.clearRect(0, 0, W, H);

    /* Cluster backgrounds */
    clusters.forEach((cl, ci) => {
      const color = CLUSTER_COLORS[cl];
      const bx = (ci % cols) * cw + 4;
      const by = Math.floor(ci / cols) * ch + 4;
      ctx.fillStyle = hexToRgba(color, 0.05);
      ctx.strokeStyle = hexToRgba(color, 0.18);
      ctx.lineWidth = 1;
      roundRect(ctx, bx, by, cw - 8, ch - 8, 12);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = hexToRgba(color, 0.7);
      ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cl, (ci % cols + 0.5) * cw, Math.floor(ci / cols) * ch + 18);
    });

    /* Bubbles */
    bubbles.forEach(b => {
      const isHov = hoverCareer && hoverCareer.title === b.career.title;
      const r = isHov ? b.r * 1.18 : b.r;
      ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(b.color, isHov ? 0.42 : 0.22); ctx.fill();
      ctx.strokeStyle = hexToRgba(b.color, isHov ? 1 : 0.65);
      ctx.lineWidth = isHov ? 2 : 1.5; ctx.stroke();

      ctx.font = `${Math.max(14, Math.min(b.r, 22))}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.career.emoji, b.x, b.y);

      ctx.font = '500 10px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = hexToRgba(b.color, 0.9);
      ctx.textBaseline = 'top';
      ctx.fillText(b.career.fit + '%', b.x, b.y + r + 4);

      if (isHov) {
        ctx.font = '600 12px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = 'rgba(240,238,232,0.95)';
        ctx.textBaseline = 'bottom';
        ctx.fillText(b.career.title, b.x, b.y - r - 4);
      }
    });
  }

  drawFrame(null);

  canvas.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    let hit = null;
    bubbles.forEach(b => { if (Math.hypot(mx - b.x, my - b.y) < b.r + 8) hit = b; });
    canvas.style.cursor = hit ? 'pointer' : 'default';
    drawFrame(hit);
  };
  canvas.onmouseleave = () => drawFrame(null);
  canvas.onclick = function (e) {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    let hit = null;
    bubbles.forEach(b => { if (Math.hypot(mx - b.x, my - b.y) < b.r + 8) hit = b; });
    if (hit) startSim(hit.career.title);
  };

  /* Legend */
  document.getElementById('legend').innerHTML =
    [...new Set(CAREERS.map(c => c.cluster))].map(cl =>
      `<div class="cl-item"><div class="cl-dot" style="background:${CLUSTER_COLORS[cl]}"></div>${cl}</div>`
    ).join('');
}

/* ---------------------------------------------------------------
   SIMULATION
--------------------------------------------------------------- */
function updateTDots() {
  const el = document.getElementById('tdots');
  el.innerHTML = Array.from({ length: 3 }, (_, i) => {
    let cls = 'tdot';
    if (i < S.turn) cls += ' done';
    else if (i === S.turn) cls += ' cur';
    return `<div class="${cls}"></div>`;
  }).join('');
  document.getElementById('simtc').textContent = `Turn ${S.turn} of 3`;
}

function addMsg(type, text) {
  const area = document.getElementById('chatarea');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = `<div class="mavatar ${type}">${type === 'ai' ? 'Di' : 'U'}</div><div class="mbubble">${text}</div>`;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function showTyping() {
  document.getElementById('chatarea').insertAdjacentHTML('beforeend',
    `<div class="msg ai" id="tyind"><div class="mavatar ai">Di</div><div class="mbubble"><span class="tydot"></span><span class="tydot"></span><span class="tydot"></span></div></div>`);
  document.getElementById('chatarea').scrollTop = 99999;
}
function hideTyping() { const t = document.getElementById('tyind'); if (t) t.remove(); }

function setQR(replies) {
  document.getElementById('qreplies').innerHTML = replies.map(r =>
    `<button class="qr" onclick="useQR('${r.replace(/'/g, "\\'")}')">${r}</button>`).join('');
}
function useQR(t) { document.getElementById('cinput').value = t; document.getElementById('qreplies').innerHTML = ''; send(); }

function startSim(title) {
  const c = CAREERS.find(x => x.title === title);
  if (!c) return;
  S.career = c; S.chatHist = []; S.turn = 0;
  go('sim'); setP(82);
  document.getElementById('simname').textContent = c.title;
  document.getElementById('simav').textContent = c.emoji;
  document.getElementById('chatarea').innerHTML = '';
  document.getElementById('cinput').disabled = false;
  document.getElementById('cinput').placeholder = 'What do you do next?';
  document.getElementById('sbtn').disabled = false;
  updateTDots();
  addMsg('ai', c.scenario);
  S.chatHist.push({ role: 'ai', content: c.scenario });
  setQR(["Stay calm and assess the situation", "Immediately escalate to leadership", "Take direct charge", "Gather more information first"]);
}

async function send() {
  const inp = document.getElementById('cinput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = ''; inp.style.height = 'auto';
  document.getElementById('sbtn').disabled = true;
  document.getElementById('qreplies').innerHTML = '';
  addMsg('user', text);
  S.chatHist.push({ role: 'user', content: text });
  S.turn++;
  updateTDots();
  showTyping();

  if (S.turn >= 3) {
    await delay(1600); hideTyping();
    const final = "The immediate crisis is over. The dust settles. Some things went well, some did not — that is real life. Let us see what your choices revealed about you.";
    addMsg('ai', final);
    document.getElementById('sbtn').disabled = true;
    document.getElementById('cinput').disabled = true;
    document.getElementById('cinput').placeholder = 'Simulation complete...';
    setTimeout(() => genDebrief(), 2200);
    return;
  }

  const resp = await callClaude(text);
  hideTyping();
  addMsg('ai', resp);
  S.chatHist.push({ role: 'ai', content: resp });
  document.getElementById('sbtn').disabled = false;
  setQR(["Handle it directly myself", "Delegate to a team member", "Pause and think strategically", "Seek more information"]);
}

/* ---------------------------------------------------------------
   GEMINI API (via FastAPI backend → llm_agent.generate_next_turn)
--------------------------------------------------------------- */
async function callClaude(userReply) {
  const histStr = S.chatHist.map(m => `${m.role === 'ai' ? 'AI' : 'User'}: ${m.content}`).join('\n');
  try {
    const res = await fetch("http://localhost:8000/api/v1/simulation-turn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_history: histStr,
        user_reply: userReply
      })
    });
    const d = await res.json();
    return d.ai_response || SIM_FALLBACKS[Math.min(S.turn - 1, 2)];
  } catch { return SIM_FALLBACKS[Math.min(S.turn - 1, 2)]; }
}

/* ---------------------------------------------------------------
   DEBRIEF
--------------------------------------------------------------- */
async function genDebrief() {
  go('debrief'); setP(100);
  const fit = S.career.fit;
  document.getElementById('dbtitle').textContent = `Your ${S.career.title} debrief`;
  document.getElementById('ringval').textContent = fit + '%';
  const offset = 352 - (352 * fit / 100);
  setTimeout(() => {
    const c = document.getElementById('ringcircle');
    c.style.transition = 'stroke-dashoffset 1.6s ease';
    c.style.strokeDashoffset = offset;
  }, 300);

  const confColors = ['#7c6af7', '#1dc8a0', '#efb627', '#e05aaa', '#f07b5d', '#378add'];
  document.getElementById('confetti').innerHTML =
    Array.from({ length: 20 }, (_, i) =>
      `<div class="cbit" style="background:${confColors[i % confColors.length]};animation-delay:${i * 0.06}s;transform:rotate(${i * 18}deg)"></div>`
    ).join('');

  const histStr = S.chatHist.map(m => `${m.role === 'ai' ? 'AI' : 'User'}: ${m.content}`).join('\n');
  let db = null;
  try {
    // Calls your FastAPI → llm_agent.generate_debrief() → Gemini
    const res = await fetch("http://localhost:8000/api/v1/generate-debrief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_history: histStr })
    });
    const d = await res.json();
    // d.debrief is a plain text string from Gemini with 3 bullet points
    // Split into the 3 cards; tip uses a fallback since backend only returns 3 points
    const lines = (d.debrief || '').split('\n').map(l => l.replace(/^[\d\.\-\*\•]+\s*/, '').trim()).filter(l => l);
    db = {
      strength: lines[0] || null,
      pressure: lines[1] || null,
      fit:      lines[2] || null,
      tip:      null
    };
  } catch { /* use fallbacks below */ }

  const s   = db?.strength || "You demonstrated decisive thinking when pressure was high — a genuine strength in demanding roles.";
  const p   = db?.pressure || "You managed stress reasonably well, prioritising action over paralysis even when information was incomplete.";
  const f   = db?.fit      || `${S.career.title} appears to be a plausible match — though nothing replaces real exposure through internships or shadowing.`;
  const tip = db?.tip      || "Explore this field through short experiential programs or conversations with professionals already in the role.";

  document.getElementById('dbcards').innerHTML = `
    <div class="dbcard"><div class="dbicon">💪</div><div class="dbtitle">Your strength</div><div class="dbtext">${s}</div></div>
    <div class="dbcard teal"><div class="dbicon">🧘</div><div class="dbtitle">Pressure handling</div><div class="dbtext">${p}</div></div>
    <div class="dbcard amber"><div class="dbicon">🎯</div><div class="dbtitle">Career fit</div><div class="dbtext">${f}</div></div>
    <div class="dbcard pink"><div class="dbicon">💡</div><div class="dbtitle">Next step</div><div class="dbtext">${tip}</div></div>`;
}

/* ---------------------------------------------------------------
   RESTART / COPY
--------------------------------------------------------------- */
function restart() {
  clearInterval(timerInterval);
  S = { mood: 0, responses: [], curQ: 0, qStart: 0, hov: 0, apt: 0, stress: 0, profile: "Medium", career: null, chatHist: [], turn: 0 };
  go('welcome'); setP(0);
}

function copyResults() {
  const t = `Disha Assessment | Career: ${S.career?.title || '?'} | Aptitude: ${S.apt}% | Stress: ${S.profile} | Fit: ${S.career?.fit || '?'}%`;
  if (navigator.clipboard) navigator.clipboard.writeText(t);
  alert('Results copied to clipboard!');
}

/* ---------------------------------------------------------------
   FLOATING PARTICLES
--------------------------------------------------------------- */
(function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#7c6af730', '#1dc8a030', '#efb62730', '#e05aaa30', '#f07b5d30'];
  for (let i = 0; i < 16; i++) {
    const d = document.createElement('div');
    d.className = 'p';
    const sz = 4 + Math.random() * 10;
    Object.assign(d.style, {
      width: sz + 'px', height: sz + 'px',
      left: Math.random() * 100 + '%',
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: (9 + Math.random() * 14) + 's',
      animationDelay: (Math.random() * 8) + 's'
    });
    container.appendChild(d);
  }
})();
