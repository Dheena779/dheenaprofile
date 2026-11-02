/* =========================================================
   EDIT YOUR CONTENT HERE. The page builds itself from this.
   ========================================================= */
const SITE = {
  // Add your email to show a "Email me" button. Leave "" to hide it.
  email: "",

  links: {
    github: "https://github.com/Dheena779",
    linkedin: "https://www.linkedin.com/in/dheenadhayalan779/",
  },

  stats: [
    { value: 3, suffix: "+", label: "years of experience" },
    { value: 4, suffix: "", label: "applications built" },
    { value: 3, suffix: "", label: "live websites" },
  ],

  marquee: [
    "Full-stack development", "Billing systems", "E-commerce", "Online ordering",
    "Vulnerability assessment", "NIST checks", "Cloud deployment", "JSON analysis",
    "Report generation", "Photography", "Videography", "Vibe coding", "Cinema",
  ],

  projects: [
    {
      name: "Billora",
      tag: "Billing software",
      desc: "A billing application for shops and small businesses, available as an offline edition and a cloud edition.",
      chips: ["Offline edition", "Cloud edition", "Invoicing"],
      url: "https://dheena-billing.onrender.com/",
      host: "dheena-billing.onrender.com",
      c1: "#1e3a5f", c2: "#4fd1c5",
    },
    {
      name: "Shastik Studio",
      tag: "E-commerce",
      desc: "An online store for the Shastik Studio saree brand, where customers browse collections and order sarees online.",
      chips: ["Saree store", "Online ordering", "Brand website"],
      url: "https://dheenaproject.duckdns.org/",
      host: "dheenaproject.duckdns.org",
      c1: "#4a1f3d", c2: "#ff4d8d",
    },
    {
      name: "Swathi's Kitchen",
      tag: "Food ordering",
      desc: "An online food ordering service where customers pick dishes from the menu and place an order in a few taps.",
      chips: ["Menu", "Online orders", "Mobile friendly"],
      url: "https://swathi-kitchen.vercel.app/",
      host: "swathi-kitchen.vercel.app",
      c1: "#5a3412", c2: "#ffb43b",
    },
    {
      name: "VA Testing Tool",
      tag: "Security",
      desc: "A vulnerability assessment tool. Upload an environment JSON file, get it checked against the NIST library, then see a score and a generated report.",
      chips: ["NIST library", "Scoring", "PDF-ready report"],
      url: "", // add the link when it is online
      host: "see how it works below",
      c1: "#0e3b3a", c2: "#7dd87a",
      scrollTo: "#scanner",
    },
  ],

  scanFlow: [
    { t: "Upload", d: "Drop in the environment file in JSON format." },
    { t: "Analyse", d: "Every component and version is read and listed." },
    { t: "Check against NIST", d: "Each one is matched with the official NIST library." },
    { t: "Score", d: "Findings are rated by severity into one risk score." },
    { t: "Report", d: "A clear report is generated, ready to share." },
  ],

  // Sample numbers for the visual preview only (not real scan data).
  scanSample: {
    score: 7.4,
    severity: [
      { name: "Critical", n: 3, max: 12, color: "#ff4d6d" },
      { name: "High", n: 8, max: 12, color: "#ff8a3b" },
      { name: "Medium", n: 11, max: 12, color: "#ffb43b" },
      { name: "Low", n: 5, max: 12, color: "#4fd1c5" },
    ],
  },

  // Update this from your resume. Newest first.
  experience: [
    {
      when: "Present",
      role: "Your job title",
      org: "Your company",
      points: [
        "Three years of professional experience building and shipping software.",
        "Add the achievements from your resume here.",
      ],
    },
  ],
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- build content ---------- */
$("#year").textContent = new Date().getFullYear();

// marquee (doubled for seamless loop)
$("#marquee").innerHTML = [...SITE.marquee, ...SITE.marquee].map(t => `<span>${t}</span>`).join("");

// hero stats
const statsEl = $("#heroStats");
SITE.stats.forEach(s => {
  const li = el("li", "", `<b data-to="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b><span>${s.label}</span>`);
  statsEl.append(li);
});

// project cards
const cards = $("#cards");
SITE.projects.forEach(p => {
  const live = !!p.url;
  const a = el(live ? "a" : "a", "card");
  a.href = live ? p.url : (p.scrollTo || "#work");
  if (live) { a.target = "_blank"; a.rel = "noopener"; }
  a.setAttribute("aria-label", live ? `${p.name}, open the live site` : `${p.name}, see how it works`);
  a.innerHTML = `
    <div class="card-in">
      <div class="shot" style="--c1:${p.c1};--c2:${p.c2}">
        <div class="win">
          <div class="win-bar"><i></i><i></i><i></i><em>${p.host}</em></div>
          <div class="win-body"><b></b><b></b><b></b><b></b><b></b><b></b></div>
        </div>
      </div>
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <ul>${p.chips.map(c => `<li>${c}</li>`).join("")}</ul>
        <span class="visit ${live ? "" : "off"}">${live ? "Open live site" : "See how it works"}</span>
      </div>
    </div>`;
  cards.append(a);
});

// scanner flow
$("#flow").innerHTML = SITE.scanFlow.map(s => `<li><b>${s.t}</b><span>${s.d}</span></li>`).join("");
$("#sev").innerHTML = SITE.scanSample.severity.map(s =>
  `<li><span>${s.name}</span><div class="bar"><i style="--c:${s.color}" data-w="${(s.n / s.max) * 100}"></i></div><em>${s.n}</em></li>`).join("");

// timeline
$("#timeline").innerHTML = SITE.experience.map(x => `
  <li class="tl-item">
    <span class="tl-when">${x.when}</span>
    <h3>${x.role}</h3><div class="tl-org">${x.org}</div>
    <ul>${x.points.map(p => `<li>${p}</li>`).join("")}</ul>
  </li>`).join("");

// contact links
const links = $("#links");
const mk = (label, href) => { const a = el("a", "link-pill", `${label}`); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; };
links.append(mk("GitHub", SITE.links.github), mk("LinkedIn", SITE.links.linkedin));
if (SITE.email) { const m = mk("Email me", "mailto:" + SITE.email); m.removeAttribute("target"); links.append(m); }

// camera aperture: hexagonal iris with six blade edges
const blades = $("#blades");
const pt = (r, deg) => [50 + r * Math.cos(deg * Math.PI / 180), 50 + r * Math.sin(deg * Math.PI / 180)];
let rays = "", hex = [];
for (let i = 0; i < 6; i++) {
  const [x1, y1] = pt(18, 60 * i), [x2, y2] = pt(46, 60 * i + 72);
  rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  hex.push(pt(18, 60 * i).map(n => n.toFixed(1)).join(","));
}
blades.innerHTML = rays + `<polygon points="${hex.join(" ")}"/>`;

/* ---------- nav shadow ---------- */
const nav = $("#nav");
const onScroll = () => {
  nav.classList.toggle("scrolled", scrollY > 30);
  // timeline progress line
  const tl = $("#timeline"), r = tl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
  tl.style.setProperty("--draw", (p * 100).toFixed(1) + "%");
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- viewfinder timecode ---------- */
const tc = $("#timecode"); const t0 = performance.now();
const pad = n => String(n).padStart(2, "0");
(function tick() {
  const ms = performance.now() - t0, s = Math.floor(ms / 1000);
  tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(Math.floor((ms % 1000) / 1000 * 24))}`;
  requestAnimationFrame(tick);
})();

/* ---------- autofocus ring follows cursor, locks on interactive things ---------- */
const ring = $("#focusRing");
if (!reduce && matchMedia("(hover: hover)").matches) {
  let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; ring.classList.add("on"); });
  document.addEventListener("pointerleave", () => ring.classList.remove("on"));
  document.addEventListener("pointerover", e => ring.classList.toggle("lock", !!e.target.closest("a, button, .tile")));
  (function loop() { x += (tx - x) * .22; y += (ty - y) * .22; ring.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
}

/* ---------- 3D tilt on project cards ---------- */
if (!reduce && matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach(c => {
    const inner = c.firstElementChild;
    c.addEventListener("pointermove", e => {
      const b = c.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width - .5, py = (e.clientY - b.top) / b.height - .5;
      inner.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(0)`;
    });
    c.addEventListener("pointerleave", () => { inner.style.transform = ""; });
  });
}

/* ---------- counters ---------- */
function countUp(node) {
  const to = +node.dataset.to, suf = node.dataset.suffix || "", dur = reduce ? 0 : 1400;
  let s = null;
  requestAnimationFrame(function f(now) {
    if (s === null) s = now;
    const k = dur ? Math.min(1, Math.max(0, (now - s) / dur)) : 1, e = 1 - Math.pow(1 - k, 3);
    node.textContent = Math.round(to * e) + suf;
    if (k < 1) requestAnimationFrame(f);
  });
}
setTimeout(() => document.querySelectorAll("[data-to]").forEach(countUp), 900);

/* ---------- scanner preview ---------- */
const gFill = $("#gFill"), gNum = $("#gNum");
function runScan() {
  const { score } = SITE.scanSample;
  gFill.style.strokeDashoffset = 101;
  gNum.textContent = "0.0";
  document.querySelectorAll(".sev .bar i").forEach(i => i.style.width = "0");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    gFill.style.strokeDashoffset = 100 - score * 10;
    document.querySelectorAll(".sev .bar i").forEach(i => i.style.width = i.dataset.w + "%");
    const dur = reduce ? 0 : 1800;
    let s = null;
    requestAnimationFrame(function f(now) {
      if (s === null) s = now;
      const k = dur ? Math.min(1, Math.max(0, (now - s) / dur)) : 1;
      gNum.textContent = (score * (1 - Math.pow(1 - k, 3))).toFixed(1);
      if (k < 1) requestAnimationFrame(f);
    });
  }));
}
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { runScan(); o.disconnect(); } }, { threshold: .4 }).observe($(".report"));
$("#rescan").addEventListener("click", runScan);

/* ---------- vibe-coding typewriter ---------- */
const lines = [
  "> make me a billing app that works offline",
  "  scaffolding screens...",
  "  adding invoices, stock, reports...",
  "  deploying to the cloud...",
  "  live. share the link.",
];
const term = $("#term");
if (reduce) { term.textContent = lines.join("\n"); }
else {
  let li = 0, ci = 0, out = "";
  (function type() {
    if (li >= lines.length) { setTimeout(() => { li = 0; ci = 0; out = ""; type(); }, 3200); return; }
    const L = lines[li];
    if (ci <= L.length) { term.textContent = out + L.slice(0, ci++); setTimeout(type, L.startsWith(">") ? 45 : 22); }
    else { out += L + "\n"; li++; ci = 0; setTimeout(type, 320); }
  })();
}
