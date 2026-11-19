/* =============================================================
   Sowmiya – The Main Character of Today  🎬💗
   A cinematic birthday movie experience.

   HOW TO EDIT YOUR CONTENT:
   Everything personal lives in the CONTENT object right below.
   Change the text here — you do NOT need to touch the HTML.
   Photos go in the /photos folder (see photos/README.txt).
   Optional music: /assets/music.mp3   Optional video: /assets/movie.mp4
   ============================================================= */

const CONTENT = {
  // ----- Basics -----
  name: "Sowmiya",
  age: 24,
  birthday: { month: 11, day: 20, year: 2026 }, // November 20, 2026
  signedBy: "Manojuhh",

  // ----- Entry gate -----
  // Password = her date of birth. Accepted as 20/11/2002, 20-11-2002, 20.11.2002 or 20112002.
  // NOTE: this check runs in the browser, so it's a fun gate, not real security.
  gatePassword: "20112002",
  // One message per balloon (EDIT ME). Keep exactly 4.
  balloonMessages: [
    "You are so special 💗",
    "You make every day brighter ✨",
    "You deserve all the happiness 🌸",
    "Today is all about YOU 🎂"
  ],

  // ----- Cinematic opening -----
  openingLine1: "Some people make ordinary days special...",
  openingLine2: "And today, the spotlight belongs to YOU, Sowmiya!",

  // ----- Intro slideshow captions (one per photo, EDIT ME) -----
  // These show over the slideshow photos. Keep them short.
  introCaptions: [
    "The star of the show",
    "Always smiling",
    "Our favourite person",
    "Pure sunshine",
    "One of a kind",
    "Simply you",
    "The main character",
    "Forever a sweetheart"
  ],

  // ----- Our Little Memories (Polaroid captions, EDIT ME) -----
  // Neutral placeholders — replace with your own real captions.
  memories: [
    "Write a memory here ✏️",
    "That one day we...",
    "Remember this? 😄",
    "A moment to keep",
    "Our kind of fun",
    "Add your caption",
    "So many laughs",
    "Good times",
    "Always an adventure",
    "Caught smiling again",
    "Our little world",
    "Never a dull day",
    "Making memories",
    "Just us being us",
    "To many more 💗"
  ],

  // ----- 24 Little Reasons to Smile (EDIT ME) -----
  // Exactly 24 short appreciation lines. Placeholders — make them yours.
  reasons: [
    "Your laugh is contagious.",
    "You always know what to say.",
    "You light up every room.",
    "You never give up.",
    "You're ridiculously kind.",
    "You make boring days fun.",
    "You remember the little things.",
    "You're braver than you think.",
    "You give the best hugs.",
    "You're effortlessly funny.",
    "You listen like no one else.",
    "You're stronger than you look.",
    "You make everyone feel welcome.",
    "You dream big.",
    "You're honest, always.",
    "You turn problems into plans.",
    "You're our family's glue.",
    "You forgive quickly.",
    "You work so hard.",
    "You stay you, no matter what.",
    "You make memories worth keeping.",
    "You care without being asked.",
    "You're the calm in the chaos.",
    "You are simply irreplaceable."
  ],

  // ----- Scratch card -----
  scratchMessage: "Congratulations! You've unlocked one more year of happiness, laughter and beautiful memories! 💗",

  // ----- Personal letter -----
  letter: [
    "Happy Birthday Sowmiya ❤️🫶🏻",
    "Honestly, I don't even know where to start. We've literally grown up together, shared so many memories, had countless laughs, fought over stupid things and irritated each other in every possible way 😂. But at the end of the day, you're someone I'll always be grateful to have in my life.",
    "You're not just my cousin, you're my childhood, my best friend and one of my favourite people. No matter how much we fight or how much we annoy each other, there's always going to be a special place for you in my life that nobody else can replace.",
    "I know we don't always express things properly, and sometimes we might not talk or behave the way we used to, but that doesn't change how much you mean to me. I hope you always remember that you have someone in me, no matter what happens.",
    "I want us to travel to all those places we've talked about, try new things, make stupid memories and keep laughing at the same old jokes. We still have so much life to live and so many memories to create together.",
    "I genuinely wish you get everything you've been dreaming of. Keep smiling, keep being your crazy self and never let anything take away your happiness. And don't think you'll ever get rid of me that easily 😂.",
    "Thank you for being a part of my life and making my childhood and growing-up years so special.",
    "LOVE YOU SO MUCHHH! ❤️🫂",
    "Once again, happiest birthday to my forever favourite person. Let's make many more memories together! ❤️",
  ],

  // ----- Final messages -----
  finalBig: "HAPPY 24TH BIRTHDAY, SOWMIYA! 🎉",
  finalSmall: "Keep smiling, keep shining, and never stop being YOU. 💗",

  // ----- Photo distribution -----
  // How many photos each photo-section uses. Files go in /photos as
  // 01.jpg, 02.jpg, ... See photos/README.txt. Total here = 14.
  introPhotoCount: 8,      // slideshow uses 01.jpg … 08.jpg
  memoryPhotoCount: 15,    // polaroids use 09.jpg … 23.jpg
};

/* =============================================================
   From here down is the engine. You usually don't need to edit it.
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Each step is guarded so one failure can never break the whole movie
  // (most importantly, the cinematic opening + Start button).
  const safe = (label, fn) => { try { fn(); } catch (e) { console.error("[" + label + "]", e); } };
  safe("gate", buildGate);
  safe("opening", buildOpening);
  safe("slideshow", buildIntroSlideshow);
  safe("memories", buildMemories);
  safe("reasons", buildReasons);
  safe("scratch", initScratchCard);
  safe("letter", buildLetter);
  safe("cake", buildCake);
  safe("hearts", () => initFloatingHearts(reduceMotion));
  safe("music", initMusic);
  safe("replay", initReplay);
});

/* ---------- small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
function esc(s) {
  return (s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function pad2(n) { return String(n).padStart(2, "0"); }

// Create an <img> that falls back to a styled placeholder if the file is missing.
function photoEl(fileIndex, labelIcon, labelText) {
  const wrap = document.createElement("div");
  wrap.className = "photo-inner";
  const ph = document.createElement("div");
  ph.className = "photo-ph";
  ph.innerHTML = `<span class="photo-ph-ic">${labelIcon}</span><span class="photo-ph-tx">${esc(labelText)}</span>`;
  const img = document.createElement("img");
  img.alt = "A photo of Sowmiya";
  img.loading = "lazy";
  img.src = `${pad2(fileIndex)}.jpg`;
  img.addEventListener("load", () => { img.classList.add("loaded"); });
  img.addEventListener("error", () => { img.remove(); }); // leave placeholder visible
  wrap.appendChild(ph);
  wrap.appendChild(img);
  return wrap;
}

/* ---------- 0. Entry gate: password → balloons → opening ---------- */
function buildGate() {
  const gate = $("#gate");
  const login = $("#loginCard");
  const input = $("#gatePass");
  const err = $("#gateErr");
  const stage = $("#balloonStage");
  const row = $("#balloonRow");
  const msg = $("#balloonMsg");
  const next = $("#balloonNext");

  // Keep digits only so "20/11/2002", "20-11-2002" and "20112002" all work.
  const digits = s => (s || "").replace(/\D/g, "");

  login.addEventListener("submit", e => {
    e.preventDefault();
    if (digits(input.value) === CONTENT.gatePassword) {
      err.textContent = "";
      login.hidden = true;
      stage.hidden = false;
      showBalloons();
    } else {
      err.textContent = "Hmm, that's not it. Try her date of birth 💭";
      login.classList.remove("shake"); void login.offsetWidth; login.classList.add("shake");
      input.select();
    }
  });

  // Four balloons; each pops with a burst and reveals its message.
  const COLORS = ["#ff8ec1", "#f7c8d8", "#e3b0ff", "#ffd36b"];
  function showBalloons() {
    let popped = 0;
    const total = CONTENT.balloonMessages.length;
    CONTENT.balloonMessages.forEach((text, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "balloon";
      b.style.setProperty("--c", COLORS[i % COLORS.length]);
      b.style.setProperty("--d", (i * 0.4) + "s");
      b.setAttribute("aria-label", "Balloon " + (i + 1) + " — tap to pop");
      b.addEventListener("click", () => {
        b.classList.add("pop");
        burst(b);
        msg.textContent = text;
        msg.classList.remove("swap"); void msg.offsetWidth; msg.classList.add("swap");
        popped++;
        if (popped === total) {
          $("#balloonHint").textContent = "";
          next.hidden = false;
          launchConfetti(80);
        }
      });
      row.appendChild(b);
    });
  }

  // Little sparkle burst where the balloon was.
  function burst(el) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      const a = (Math.PI * 2 * i) / 14, d = 50 + Math.random() * 50;
      s.style.left = cx + "px"; s.style.top = cy + "px";
      s.style.background = COLORS[i % COLORS.length];
      s.style.setProperty("--x", Math.cos(a) * d + "px");
      s.style.setProperty("--y", Math.sin(a) * d + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  }

  // Finish: fade the gate out and start the cinematic opening animations.
  next.addEventListener("click", () => {
    gate.classList.add("hide");
    $("#opening").classList.add("play");
  });
}

/* ---------- 1. Cinematic opening ---------- */
function buildOpening() {
  $("#openLine1").textContent = CONTENT.openingLine1;
  $("#openLine2").textContent = CONTENT.openingLine2;

  const startBtn = $("#startBtn");
  startBtn.addEventListener("click", () => {
    // Audio may only start after this user gesture (no autoplay before interaction).
    startMusicIfReady();
    const movie = $("#openingMovie");
    // Hide the opening, reveal the scrolling experience.
    $("#opening").classList.add("done");
    document.body.classList.add("started");
    // Try to play the optional opening video if present.
    if (movie && movie.dataset.hasSource === "true") {
      movie.classList.add("show");
      movie.play().catch(() => {});
      movie.addEventListener("ended", () => movie.classList.remove("show"), { once: true });
    }
    // Gently scroll to the intro.
    setTimeout(() => $("#intro").scrollIntoView({ behavior: "smooth" }), 400);
  });

  // Detect an optional opening film: assets/movie.mp4
  const movie = $("#openingMovie");
  if (movie) {
    const probe = document.createElement("video");
    probe.addEventListener("loadeddata", () => { movie.dataset.hasSource = "true"; }, { once: true });
    probe.addEventListener("error", () => { movie.dataset.hasSource = "false"; }, { once: true });
    probe.src = "movie.mp4";
  }
}

/* ---------- 2. Intro slideshow ---------- */
function buildIntroSlideshow() {
  const stage = $("#slideStage");
  const capEl = $("#slideCaption");
  const n = CONTENT.introPhotoCount;
  const slides = [];
  for (let i = 1; i <= n; i++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.appendChild(photoEl(i, "🎬", "Photo " + i));
    stage.appendChild(slide);
    slides.push(slide);
  }
  let idx = 0;
  function show(i) {
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    capEl.textContent = CONTENT.introCaptions[i % CONTENT.introCaptions.length] || "";
    capEl.classList.remove("pop"); void capEl.offsetWidth; capEl.classList.add("pop");
  }
  show(0);
  if (slides.length > 1) {
    setInterval(() => { idx = (idx + 1) % slides.length; show(idx); }, 3500);
  }
  $("#slidePrev").addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; show(idx); });
  $("#slideNext").addEventListener("click", () => { idx = (idx + 1) % slides.length; show(idx); });
}

/* ---------- 3. Our Little Memories (Polaroids) ---------- */
function buildMemories() {
  const grid = $("#polaroidGrid");
  const start = CONTENT.introPhotoCount + 1; // continue the numbering
  for (let k = 0; k < CONTENT.memoryPhotoCount; k++) {
    const fileIndex = start + k;
    const card = document.createElement("figure");
    card.className = "polaroid";
    card.style.setProperty("--tilt", (k % 2 === 0 ? -3 : 3) + "deg");
    const frame = document.createElement("div");
    frame.className = "polaroid-photo";
    frame.appendChild(photoEl(fileIndex, "📸", "Photo " + fileIndex));
    const cap = document.createElement("figcaption");
    cap.className = "polaroid-cap";
    cap.setAttribute("contenteditable", "false");
    cap.textContent = CONTENT.memories[k % CONTENT.memories.length] || "Add a caption";
    card.appendChild(frame);
    card.appendChild(cap);
    grid.appendChild(card);
  }
}

/* ---------- 24 Little Reasons (flip cards) ---------- */
function buildReasons() {
  const grid = $("#reasonGrid");
  CONTENT.reasons.slice(0, 24).forEach((msg, i) => {
    const card = document.createElement("button");
    card.className = "reason-card";
    card.type = "button";
    card.setAttribute("aria-label", "Reason number " + (i + 1));
    card.innerHTML = `
      <div class="reason-face reason-front">
        <span class="reason-num">${i + 1}</span>
        <span class="reason-tap">tap</span>
      </div>
      <div class="reason-face reason-back"><p>${esc(msg)}</p></div>`;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    grid.appendChild(card);
  });
}

/* ---------- 6. Scratch-to-Reveal card (Canvas, mouse + touch) ---------- */
function initScratchCard() {
  const canvas = $("#scratchCanvas");
  const wrap = $("#scratchWrap");
  const revealMsg = $("#scratchMessage");
  revealMsg.textContent = CONTENT.scratchMessage;

  const ctx = canvas.getContext("2d");
  let painting = false;
  let revealed = false;

  function sizeCanvas() {
    const r = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(r.width * dpr));
    canvas.height = Math.max(1, Math.floor(r.height * dpr));
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCover(r.width, r.height);
  }

  function paintCover(w, h) {
    // Pink-to-gold foil cover.
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f7a8c4");
    g.addColorStop(0.5, "#e98cb0");
    g.addColorStop(1, "#d9af62");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // Sparkle dots
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.6 + 0.4, 0, 7);
      ctx.fill();
    }
    // Instruction text
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "600 16px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here to reveal your surprise!", w / 2, h / 2);
  }

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  }

  function scratch(e) {
    if (revealed) return;
    const { x, y } = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
  }

  function pct() {
    // Sample how much has been scratched away (alpha==0).
    const w = canvas.width, h = canvas.height;
    const step = 8 * (window.devicePixelRatio || 1);
    const data = ctx.getImageData(0, 0, w, h).data;
    let clear = 0, total = 0;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        total++;
        if (data[(y * w + x) * 4 + 3] === 0) clear++;
      }
    }
    return clear / total;
  }

  function maybeReveal() {
    if (revealed) return;
    if (pct() > 0.55) {
      revealed = true;
      canvas.classList.add("cleared");
      $("#scratchDone").classList.add("show");
    }
  }

  // Mouse
  canvas.addEventListener("mousedown", e => { painting = true; scratch(e); });
  canvas.addEventListener("mousemove", e => { if (painting) scratch(e); });
  window.addEventListener("mouseup", () => { if (painting) { painting = false; maybeReveal(); } });
  // Touch
  canvas.addEventListener("touchstart", e => { painting = true; scratch(e); e.preventDefault(); }, { passive: false });
  canvas.addEventListener("touchmove", e => { if (painting) scratch(e); e.preventDefault(); }, { passive: false });
  canvas.addEventListener("touchend", () => { if (painting) { painting = false; maybeReveal(); } });

  // Reveal threshold check throttled
  canvas.addEventListener("mousemove", throttle(maybeReveal, 250));
  canvas.addEventListener("touchmove", throttle(maybeReveal, 250));

  // "One Last Surprise..." jumps to the letter.
  $("#lastSurpriseBtn").addEventListener("click", () => $("#letterSection").scrollIntoView({ behavior: "smooth" }));

  window.addEventListener("resize", debounce(sizeCanvas, 200));
  // Size once layout is settled.
  setTimeout(sizeCanvas, 60);

  // expose a reset for the replay button
  initScratchCard._reset = () => { revealed = false; painting = false; canvas.classList.remove("cleared"); $("#scratchDone").classList.remove("show"); sizeCanvas(); };
}

function throttle(fn, ms) { let t = 0; return (...a) => { const now = Date.now(); if (now - t > ms) { t = now; fn(...a); } }; }
function debounce(fn, ms) { let id; return (...a) => { clearTimeout(id); id = setTimeout(() => fn(...a), ms); }; }

/* ---------- 7. Personal letter (envelope) ---------- */
function buildLetter() {
  const body = $("#letterBody");
  body.innerHTML = CONTENT.letter.map(p => `<p>${esc(p)}</p>`).join("");
  $("#letterSign").textContent = "— " + CONTENT.signedBy;

  const env = $("#envelope");
  env.addEventListener("click", () => env.classList.toggle("open"));
  env.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); env.classList.toggle("open"); } });
}

/* ---------- 8. Cake + candles + confetti ---------- */
function buildCake() {
  const candles = $("#candles");
  for (let i = 0; i < 24; i++) {
    const c = document.createElement("span");
    c.className = "candle";
    c.innerHTML = `<span class="flame"></span>`;
    candles.appendChild(c);
  }
  $("#big").textContent = CONTENT.finalBig;
  $("#small").textContent = CONTENT.finalSmall;

  $("#blowBtn").addEventListener("click", () => {
    $$(".candle").forEach(c => c.classList.add("out"));
    $("#finale").classList.add("show");
    launchConfetti();
  });
}

/* ---------- confetti (shared) ---------- */
const CONFETTI_COLORS = ["#ff8ec1", "#f7c8d8", "#d9af62", "#ffffff", "#c98a5e", "#ffd6e8"];
function launchConfetti(count = 140) {
  const layer = $("#confettiLayer");
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    c.style.animationDuration = (Math.random() * 2 + 2.4) + "s";
    c.style.animationDelay = (Math.random() * 0.6) + "s";
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    layer.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

/* ---------- floating hearts + sparkles background ---------- */
function initFloatingHearts(reduceMotion) {
  if (reduceMotion) return;
  const layer = $("#heartsLayer");
  const EMOJI = ["💗", "💕", "✨", "🤍", "💛"];
  setInterval(() => {
    if (document.hidden) return;
    const h = document.createElement("span");
    h.className = "float-heart";
    h.textContent = EMOJI[Math.floor(Math.random() * EMOJI.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (Math.random() * 14 + 12) + "px";
    h.style.animationDuration = (Math.random() * 4 + 5) + "s";
    layer.appendChild(h);
    setTimeout(() => h.remove(), 9000);
  }, 900);
}

/* ---------- music (no autoplay before interaction) ---------- */
let audioReady = false;
function initMusic() {
  const audio = $("#bgm");
  const btn = $("#muteBtn");
  const probe = document.createElement("audio");
  probe.addEventListener("canplay", () => { audioReady = true; }, { once: true });
  probe.addEventListener("error", () => { audioReady = false; }, { once: true });
  probe.src = "music.wav";

  let muted = false;
  btn.addEventListener("click", () => {
    muted = !muted;
    if (muted) { audio.pause(); btn.textContent = "🔇"; btn.setAttribute("aria-label", "Unmute music"); }
    else { startMusicIfReady(); btn.textContent = "🔊"; btn.setAttribute("aria-label", "Mute music"); }
  });
}
function startMusicIfReady() {
  const audio = $("#bgm");
  if (!audio) return;
  audio.volume = 0.5;
  audio.play().then(() => { $("#muteBtn").textContent = "🔊"; }).catch(() => {
    // No file or blocked — keep the control usable, no error shown.
  });
}

/* ---------- Replay / restart the whole experience ---------- */
function initReplay() {
  $("#replayBtn").addEventListener("click", () => {
    // reset interactive states
    $$(".reason-card").forEach(c => c.classList.remove("flipped"));
    $("#envelope").classList.remove("open");
    $$(".candle").forEach(c => c.classList.remove("out"));
    $("#finale").classList.remove("show");
    if (initScratchCard._reset) initScratchCard._reset();
    // back to the cinematic opening
    $("#opening").classList.remove("done");
    document.body.classList.remove("started");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Guestbook (uses the Spring Boot /api/wishes backend) ---------- */
function buildGuestbook() {
  const API = "/api/wishes";
  const listEl = $("#gbList");
  const form = $("#gbForm");
  const nameEl = $("#gbName");
  const msgEl = $("#gbMsg");
  const noteEl = $("#gbNote");
  const btn = $("#gbBtn");
  const counter = $("#gbCount");

  function initials(n) { return (n || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase(); }
  function when(iso) { try { const d = new Date(iso); return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } }
  function render(list) {
    if (!list.length) { listEl.innerHTML = '<div class="gb-empty">Be the first to leave a wish 💐</div>'; return; }
    listEl.innerHTML = list.map(w => `
      <div class="wish">
        <div class="wish-top"><span class="wish-av">${esc(initials(w.name))}</span><span class="wish-name">${esc(w.name)}</span><span class="wish-time">${when(w.createdAt)}</span></div>
        <div class="wish-msg">${esc(w.message)}</div>
      </div>`).join("");
  }
  async function load() {
    try { const r = await fetch(API); if (!r.ok) throw 0; render(await r.json()); }
    catch (e) { listEl.innerHTML = '<div class="gb-empty">Couldn\'t load wishes. Is the app running?</div>'; }
  }
  msgEl.addEventListener("input", () => counter.textContent = msgEl.value.length);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = nameEl.value.trim(), message = msgEl.value.trim();
    noteEl.className = "gb-note"; noteEl.textContent = "";
    if (!name || !message) { noteEl.className = "gb-note err"; noteEl.textContent = "Please add your name and a message."; return; }
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, message }) });
      if (r.status === 201) {
        noteEl.className = "gb-note ok"; noteEl.textContent = "Thank you! Your wish was added 💕";
        form.reset(); counter.textContent = "0"; await load(); launchConfetti(60);
      } else {
        const data = await r.json().catch(() => ({}));
        const first = data.fields ? Object.values(data.fields)[0] : null;
        noteEl.className = "gb-note err"; noteEl.textContent = first || "Something went wrong. Please try again.";
      }
    } catch (err) { noteEl.className = "gb-note err"; noteEl.textContent = "Network error. Is the app running?"; }
    finally { btn.disabled = false; btn.textContent = "Send My Wish 💝"; }
  });
  load();
}
