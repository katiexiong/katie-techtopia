// TechTopia by Katie Xiong — pure HTML/CSS/JavaScript, no libraries required.

// -------------------- GALAXY THEME --------------------
const savedTheme = localStorage.getItem("techtopiaTheme") || "light";
const savedGalaxy = localStorage.getItem("techtopiaGalaxy") || "nebula";

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("techtopiaTheme", theme);
  document.querySelectorAll("[data-theme-choice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeChoice === theme);
  });
  drawGeometry();
}

function setGalaxy(galaxy) {
  document.body.dataset.galaxy = galaxy;
  localStorage.setItem("techtopiaGalaxy", galaxy);
  document.querySelectorAll("[data-galaxy-choice]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.galaxyChoice === galaxy);
  });
  drawGeometry();
}

document.querySelectorAll("[data-theme-choice]").forEach(btn => {
  btn.addEventListener("click", () => setTheme(btn.dataset.themeChoice));
});

document.querySelectorAll("[data-galaxy-choice]").forEach(btn => {
  btn.addEventListener("click", () => setGalaxy(btn.dataset.galaxyChoice));
});

// -------------------- PHOTO GALLERY --------------------
const galleryItems = [
  { title: "Science Fair Day", category: "school", note: "School", bg: "linear-gradient(135deg,#60a5fa,#7c3aed)" },
  { title: "Library Study Time", category: "school", note: "School", bg: "linear-gradient(135deg,#34d399,#0ea5e9)" },
  { title: "Beach Adventure", category: "travel", note: "Travel", bg: "linear-gradient(135deg,#f59e0b,#ec4899)" },
  { title: "Mountain Trip", category: "travel", note: "Travel", bg: "linear-gradient(135deg,#22c55e,#155e75)" },
  { title: "Piano Practice", category: "hobbies", note: "Hobbies", bg: "linear-gradient(135deg,#a78bfa,#f472b6)" },
  { title: "Coding Project", category: "hobbies", note: "Hobbies", bg: "linear-gradient(135deg,#111827,#0ea5e9)" }
];
const galleryGrid = document.getElementById("galleryGrid");
function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  galleryItems.filter(item => filter === "all" || item.category === filter).forEach(item => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.style.background = item.bg;
    el.innerHTML = `<span>${item.title}</span><small>${item.note}</small>`;
    galleryGrid.appendChild(el);
  });
}
document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderGallery(btn.dataset.filter);
}));
renderGallery();

// -------------------- KNOWLEDGE QUIZ --------------------
const quizBanks = {
  easy: [
    { subject: "Math", q: "A notebook costs $3.75. Katie buys 4 notebooks and pays with a $20 bill. How much change should she get?", options: ["$4.00", "$5.00", "$6.25", "$15.00"], answer: 1 },
    { subject: "Science", q: "Which statement best explains why the Moon appears to change shape during the month?", options: ["Earth's shadow always covers it", "We see different lit portions as it orbits Earth", "The Moon changes its actual shape", "Clouds block different parts of it"], answer: 1 },
    { subject: "Geography", q: "Which pair correctly matches a continent with a major desert found there?", options: ["Europe - Sahara", "Asia - Gobi", "South America - Kalahari", "Antarctica - Mojave"], answer: 1 },
    { subject: "Language Arts", q: "In the sentence 'The careful scientist recorded every result,' what does 'careful' describe?", options: ["Scientist", "Recorded", "Every", "Result"], answer: 0 },
    { subject: "Coding", q: "If a loop runs while i < 5 and i starts at 1, increasing by 1 each time, how many times does it run?", options: ["3", "4", "5", "6"], answer: 1 },
    { subject: "History", q: "Why were primary sources useful to historians studying ancient civilizations?", options: ["They are always easier to read", "They come from the time being studied", "They never contain bias", "They summarize every event"], answer: 1 },
    { subject: "Geometry", q: "A rectangle has length 9 and width 4. What is its perimeter?", options: ["13", "26", "36", "81"], answer: 1 },
    { subject: "Earth Science", q: "Which process changes liquid water into water vapor?", options: ["Condensation", "Evaporation", "Precipitation", "Erosion"], answer: 1 }
  ],
  hard: [
    { subject: "Math", q: "A recipe uses 2/3 cup of sugar for 12 cookies. How much sugar is needed for 30 cookies?", options: ["1 1/3 cups", "1 2/3 cups", "2 cups", "2 1/2 cups"], answer: 1 },
    { subject: "Science", q: "A plant is kept near a sunny window but is not watered for two weeks. Which limiting factor most directly slows photosynthesis first?", options: ["Carbon dioxide", "Water", "Soil color", "The plant's shadow"], answer: 1 },
    { subject: "Geography", q: "Why do many major cities develop near rivers or coasts?", options: ["They never flood", "They provide transportation, trade, and water access", "They are always colder", "They prevent population growth"], answer: 1 },
    { subject: "Coding", q: "What value does total have after this code: total = 0; for n in [2, 4, 6] { total = total + n / 2 }?", options: ["6", "9", "12", "24"], answer: 0 },
    { subject: "Geometry", q: "A triangular prism has a triangular base area of 18 square units and a length of 7 units. What is its volume?", options: ["25 cubic units", "63 cubic units", "126 cubic units", "252 cubic units"], answer: 2 },
    { subject: "History", q: "Which question is best for comparing two civilizations instead of only describing one?", options: ["What crops did one civilization grow?", "How did geography influence trade in both civilizations?", "Who was one famous ruler?", "What year did one city begin?"], answer: 1 },
    { subject: "Language Arts", q: "Which sentence uses a dependent clause?", options: ["Katie opened her laptop.", "Because the timer rang, everyone looked up.", "The quiz was challenging.", "Stars flashed across the screen."], answer: 1 },
    { subject: "Data", q: "A data set has values 4, 7, 7, 10, and 12. Which statement is true?", options: ["Mean and median are both 7", "Median is 7 and mean is 8", "Mode is 10", "Range is 6"], answer: 1 },
    { subject: "Physics", q: "Two balls have the same size, but one has more mass. If the same force pushes each ball, what happens?", options: ["The heavier ball accelerates less", "The heavier ball accelerates more", "Both must accelerate equally", "Neither can move"], answer: 0 },
    { subject: "Digital Citizenship", q: "Which is the strongest reason to check multiple sources before trusting an online claim?", options: ["More tabs make research faster", "Different sources can reveal errors or bias", "Search engines always rank truth first", "Longer articles are always correct"], answer: 1 }
  ]
};
let quizLevel = localStorage.getItem("techtopiaQuizLevel") || "easy";
let quiz = quizBanks[quizLevel];
let quizIndex = 0, quizCorrect = 0, quizAttempts = 0, quizChecked = false;
const questionEl = document.getElementById("quizQuestion"), optionsEl = document.getElementById("quizOptions"), feedbackEl = document.getElementById("quizFeedback");
function loadQuestion() {
  quizChecked = false; feedbackEl.textContent = ""; feedbackEl.className = "feedback";
  const item = quiz[quizIndex];
  document.getElementById("quizProgress").textContent = `${quizLevel[0].toUpperCase() + quizLevel.slice(1)} · ${item.subject} · Question ${quizIndex + 1} of ${quiz.length}`;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = item.options.map((opt, i) => `<label class="option-label"><input type="radio" name="quiz" value="${i}"><span>${String.fromCharCode(65+i)}. ${opt}</span></label>`).join("");
  document.getElementById("quizScore").textContent = `${quizCorrect} / ${quizAttempts}`;
}
function setQuizLevel(level) {
  quizLevel = level;
  quiz = quizBanks[level];
  quizIndex = 0;
  quizCorrect = 0;
  quizAttempts = 0;
  quizChecked = false;
  localStorage.setItem("techtopiaQuizLevel", level);
  document.querySelectorAll("[data-quiz-level]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.quizLevel === level);
  });
  loadQuestion();
}
document.querySelectorAll("[data-quiz-level]").forEach(btn => {
  btn.addEventListener("click", () => setQuizLevel(btn.dataset.quizLevel));
});
document.getElementById("checkAnswer").addEventListener("click", () => {
  if (quizChecked) return;
  const chosen = document.querySelector('input[name="quiz"]:checked');
  if (!chosen) { feedbackEl.textContent = "Choose an answer first."; feedbackEl.className = "feedback wrong"; return; }
  quizChecked = true; quizAttempts++;
  const correct = Number(chosen.value) === quiz[quizIndex].answer;
  if (correct) { quizCorrect++; feedbackEl.textContent = "Correct! Great job 🎉"; feedbackEl.className = "feedback correct"; }
  else { feedbackEl.textContent = `Not quite. The correct answer is ${String.fromCharCode(65 + quiz[quizIndex].answer)}.`; feedbackEl.className = "feedback wrong"; }
  document.getElementById("quizScore").textContent = `${quizCorrect} / ${quizAttempts}`;
});
document.getElementById("nextQuestion").addEventListener("click", () => { quizIndex = (quizIndex + 1) % quiz.length; loadQuestion(); });
setQuizLevel(quizBanks[quizLevel] ? quizLevel : "easy");

// -------------------- CHAT BOT --------------------
const chatForm = document.getElementById("chatForm"), chatInput = document.getElementById("chatInput"), chatMessages = document.getElementById("chatMessages");
function addMessage(text, who) { const div = document.createElement("div"); div.className = `message ${who}`; div.textContent = text; chatMessages.appendChild(div); chatMessages.scrollTop = chatMessages.scrollHeight; }
function botReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hello") || t.includes("hi")) return "Hi there! Welcome to TechTopia ✨";
  if (t.includes("katie")) return "Katie Xiong is the creator of this TechTopia portfolio.";
  if (t.includes("math")) return "Try the Knowledge Quiz or Geometry Visualizer. A good math habit is: understand the idea, practice, then explain it back.";
  if (t.includes("geometry") || t.includes("circle") || t.includes("shape")) return "The Geometry Visualizer can show circles, triangles, trapezoids, rectangles, cubes, spheres, cylinders, cones, and pyramids.";
  if (t.includes("study") || t.includes("homework")) return "Break your work into small tasks, use the Homework Tracker, then focus with the Timer.";
  if (t.includes("particle") || t.includes("gravity")) return "The particle simulator lets you compare Moon, Earth, Jupiter, and zero gravity.";
  if (t.includes("website") || t.includes("techtopia")) return "TechTopia is Katie's interactive portfolio built with HTML, CSS, and JavaScript.";
  return "Good question! I am a simple offline demo bot, so try asking about Katie, math, geometry, studying, gravity, or TechTopia.";
}
chatForm.addEventListener("submit", e => { e.preventDefault(); const text = chatInput.value.trim(); if (!text) return; addMessage(text, "user"); chatInput.value = ""; setTimeout(() => addMessage(botReply(text), "bot"), 250); });

// -------------------- GEOMETRY VISUALIZER --------------------
const gCanvas = document.getElementById("geometryCanvas");
const g = gCanvas.getContext("2d");
const shapeSelect = document.getElementById("shapeSelect");
const sizeInput = document.getElementById("sizeInput");
const heightInput = document.getElementById("heightInput");
const roundValues = document.getElementById("roundValues");
const shapeLabel = document.getElementById("shapeLabel");
const sizeValue = document.getElementById("sizeValue");
const heightValue = document.getElementById("heightValue");
const metricLabels = [
  document.getElementById("metricLabelA"),
  document.getElementById("metricLabelB"),
  document.getElementById("metricLabelC")
];
const metricOutputs = [
  document.getElementById("metricOutputA"),
  document.getElementById("metricOutputB"),
  document.getElementById("metricOutputC")
];

const shapeMeta = {
  circle: { label: "Circle Lab", size: "Radius", height: "Guide" },
  triangle: { label: "Triangle Lab", size: "Half base", height: "Height" },
  trapezoid: { label: "Trapezoid Lab", size: "Top base", height: "Height" },
  rectangle: { label: "Rectangle Lab", size: "Half width", height: "Height" },
  cube: { label: "Cube Lab", size: "Side", height: "Tilt" },
  sphere: { label: "Sphere Lab", size: "Radius", height: "Glow" },
  cylinder: { label: "Cylinder Lab", size: "Radius", height: "Height" },
  cone: { label: "Cone Lab", size: "Radius", height: "Height" },
  pyramid: { label: "Pyramid Lab", size: "Base side", height: "Height" }
};

function formatValue(n) {
  return roundValues.checked ? n.toFixed(2) : String(Math.round(n * 10000) / 10000);
}

function cssVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function setMetrics(items) {
  items.forEach((item, i) => {
    metricLabels[i].textContent = item.label;
    metricOutputs[i].textContent = formatValue(item.value);
  });
}

function drawLabel(text, x, y) {
  g.fillStyle = cssVar("--ink");
  g.font = "800 17px system-ui";
  g.fillText(text, x, y);
}

function drawGalaxyFill(x0, y0, x1, y1) {
  const grad = g.createLinearGradient(x0, y0, x1, y1);
  grad.addColorStop(0, cssVar("--accent-3"));
  grad.addColorStop(.52, cssVar("--accent"));
  grad.addColorStop(1, cssVar("--accent-2"));
  return grad;
}

function prepGeometryCanvas() {
  g.clearRect(0, 0, gCanvas.width, gCanvas.height);
  g.save();
  g.globalAlpha = .18;
  for (let i = 0; i < 36; i++) {
    const x = (i * 83) % gCanvas.width;
    const y = (i * 47) % gCanvas.height;
    g.beginPath();
    g.arc(x, y, i % 5 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
    g.fillStyle = i % 3 === 0 ? cssVar("--accent-2") : cssVar("--ink");
    g.fill();
  }
  g.restore();
}

function drawGeometry() {
  if (!gCanvas || !shapeSelect) return;
  const shape = shapeSelect.value;
  const meta = shapeMeta[shape];
  const size = Number(sizeInput.value);
  const height = Number(heightInput.value);
  const cx = gCanvas.width / 2;
  const cy = gCanvas.height / 2 + 8;
  const scale = 16;
  const stroke = cssVar("--accent");
  const ink = cssVar("--ink");
  const fill = drawGalaxyFill(120, 36, 500, 280);

  shapeLabel.textContent = meta.label;
  sizeInput.previousElementSibling.innerHTML = `${meta.size} <strong id="sizeValue">${size}</strong>`;
  heightInput.previousElementSibling.innerHTML = `${meta.height} <strong id="heightValue">${height}</strong>`;
  prepGeometryCanvas();
  g.lineWidth = 4;
  g.lineJoin = "round";
  g.lineCap = "round";

  if (shape === "circle") {
    const r = size * scale;
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.fillStyle = fill;
    g.globalAlpha = .46;
    g.fill();
    g.globalAlpha = 1;
    g.strokeStyle = stroke;
    g.stroke();
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(cx + r, cy);
    g.strokeStyle = cssVar("--accent-3");
    g.stroke();
    g.beginPath();
    g.arc(cx, cy, 5, 0, Math.PI * 2);
    g.fillStyle = ink;
    g.fill();
    drawLabel(`radius = ${size}`, cx + 18, cy - 10);
    setMetrics([
      { label: "Diameter", value: 2 * size },
      { label: "Circumference", value: 2 * Math.PI * size },
      { label: "Area", value: Math.PI * size * size }
    ]);
  }

  if (shape === "triangle") {
    const halfBase = size * scale;
    const h = height * scale;
    const p1 = [cx, cy - h / 2], p2 = [cx - halfBase, cy + h / 2], p3 = [cx + halfBase, cy + h / 2];
    g.beginPath();
    g.moveTo(...p1); g.lineTo(...p2); g.lineTo(...p3); g.closePath();
    g.fillStyle = fill; g.globalAlpha = .48; g.fill(); g.globalAlpha = 1; g.strokeStyle = stroke; g.stroke();
    drawLabel(`base = ${size * 2}, height = ${height}`, cx - 92, cy + h / 2 + 28);
    const side = Math.hypot(size, height);
    setMetrics([
      { label: "Base", value: size * 2 },
      { label: "Perimeter", value: size * 2 + side * 2 },
      { label: "Area", value: size * height }
    ]);
  }

  if (shape === "trapezoid") {
    const top = size * scale;
    const bottom = size * 2 * scale;
    const h = height * scale;
    const points = [[cx - top / 2, cy - h / 2], [cx + top / 2, cy - h / 2], [cx + bottom / 2, cy + h / 2], [cx - bottom / 2, cy + h / 2]];
    g.beginPath();
    points.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
    g.closePath();
    g.fillStyle = fill; g.globalAlpha = .48; g.fill(); g.globalAlpha = 1; g.strokeStyle = stroke; g.stroke();
    drawLabel(`top = ${size}, bottom = ${size * 2}`, cx - 94, cy + h / 2 + 28);
    const leg = Math.hypot(size / 2, height);
    setMetrics([
      { label: "Bottom base", value: size * 2 },
      { label: "Perimeter", value: size + size * 2 + leg * 2 },
      { label: "Area", value: ((size + size * 2) / 2) * height }
    ]);
  }

  if (shape === "rectangle") {
    const w = size * 2 * scale;
    const h = height * scale;
    g.beginPath();
    g.roundRect(cx - w / 2, cy - h / 2, w, h, 8);
    g.fillStyle = fill; g.globalAlpha = .48; g.fill(); g.globalAlpha = 1; g.strokeStyle = stroke; g.stroke();
    drawLabel(`width = ${size * 2}, height = ${height}`, cx - 102, cy + h / 2 + 28);
    setMetrics([
      { label: "Width", value: size * 2 },
      { label: "Perimeter", value: 2 * (size * 2 + height) },
      { label: "Area", value: size * 2 * height }
    ]);
  }

  if (shape === "cube") {
    const s = size * scale;
    const offset = Math.max(26, height * 3);
    drawPrism(cx - s / 2, cy - s / 2 + 16, s, s, offset, fill, stroke);
    drawLabel(`side = ${size}`, cx - 38, cy + s / 2 + 54);
    setMetrics([
      { label: "Surface area", value: 6 * size * size },
      { label: "Volume", value: size ** 3 },
      { label: "Space diagonal", value: Math.sqrt(3) * size }
    ]);
  }

  if (shape === "sphere") {
    const r = size * scale;
    const glow = Math.max(5, height * 2);
    const sphere = g.createRadialGradient(cx - r / 3, cy - r / 3, glow, cx, cy, r);
    sphere.addColorStop(0, "#ffffff");
    sphere.addColorStop(.18, cssVar("--accent-2"));
    sphere.addColorStop(1, cssVar("--accent"));
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.fillStyle = sphere;
    g.globalAlpha = .68;
    g.fill();
    g.globalAlpha = 1;
    g.strokeStyle = stroke;
    g.stroke();
    g.beginPath();
    g.ellipse(cx, cy, r, r / 3, 0, 0, Math.PI * 2);
    g.strokeStyle = cssVar("--accent-3");
    g.globalAlpha = .8;
    g.stroke();
    g.globalAlpha = 1;
    drawLabel(`radius = ${size}`, cx - 42, cy + r + 26);
    setMetrics([
      { label: "Diameter", value: 2 * size },
      { label: "Surface area", value: 4 * Math.PI * size * size },
      { label: "Volume", value: (4 / 3) * Math.PI * size ** 3 }
    ]);
  }

  if (shape === "cylinder") {
    const r = size * scale;
    const h = height * scale;
    drawCylinder(cx, cy, r, h, fill, stroke);
    drawLabel(`radius = ${size}, height = ${height}`, cx - 104, cy + h / 2 + 38);
    setMetrics([
      { label: "Diameter", value: 2 * size },
      { label: "Surface area", value: 2 * Math.PI * size * (size + height) },
      { label: "Volume", value: Math.PI * size * size * height }
    ]);
  }

  if (shape === "cone") {
    const r = size * scale;
    const h = height * scale;
    drawCone(cx, cy, r, h, fill, stroke);
    const slant = Math.hypot(size, height);
    drawLabel(`radius = ${size}, height = ${height}`, cx - 104, cy + h / 2 + 38);
    setMetrics([
      { label: "Slant height", value: slant },
      { label: "Surface area", value: Math.PI * size * (size + slant) },
      { label: "Volume", value: Math.PI * size * size * height / 3 }
    ]);
  }

  if (shape === "pyramid") {
    const base = size * scale * 1.35;
    const h = height * scale;
    drawPyramid(cx, cy, base, h, fill, stroke);
    const slant = Math.hypot(size / 2, height);
    drawLabel(`base = ${size}, height = ${height}`, cx - 90, cy + h / 2 + 40);
    setMetrics([
      { label: "Slant height", value: slant },
      { label: "Surface area", value: size * size + 2 * size * slant },
      { label: "Volume", value: size * size * height / 3 }
    ]);
  }
}

function drawPrism(x, y, w, h, offset, fill, stroke) {
  g.fillStyle = fill;
  g.globalAlpha = .34;
  g.fillRect(x, y, w, h);
  g.globalAlpha = .20;
  g.beginPath();
  g.moveTo(x + offset, y - offset); g.lineTo(x + w + offset, y - offset); g.lineTo(x + w + offset, y + h - offset); g.lineTo(x + offset, y + h - offset); g.closePath();
  g.fill();
  g.globalAlpha = .52;
  g.beginPath();
  g.moveTo(x, y); g.lineTo(x + offset, y - offset); g.lineTo(x + w + offset, y - offset); g.lineTo(x + w, y); g.closePath();
  g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = stroke;
  g.strokeRect(x, y, w, h);
  g.beginPath();
  g.rect(x + offset, y - offset, w, h);
  g.stroke();
  [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([a, b]) => {
    g.beginPath(); g.moveTo(a, b); g.lineTo(a + offset, b - offset); g.stroke();
  });
}

function drawCylinder(cx, cy, r, h, fill, stroke) {
  g.fillStyle = fill;
  g.globalAlpha = .42;
  g.fillRect(cx - r, cy - h / 2, r * 2, h);
  g.beginPath(); g.ellipse(cx, cy - h / 2, r, r / 3, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(cx, cy + h / 2, r, r / 3, 0, 0, Math.PI * 2); g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = stroke;
  g.beginPath(); g.moveTo(cx - r, cy - h / 2); g.lineTo(cx - r, cy + h / 2); g.moveTo(cx + r, cy - h / 2); g.lineTo(cx + r, cy + h / 2); g.stroke();
  g.beginPath(); g.ellipse(cx, cy - h / 2, r, r / 3, 0, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.ellipse(cx, cy + h / 2, r, r / 3, 0, 0, Math.PI * 2); g.stroke();
}

function drawCone(cx, cy, r, h, fill, stroke) {
  g.beginPath();
  g.moveTo(cx, cy - h / 2);
  g.lineTo(cx + r, cy + h / 2);
  g.ellipse(cx, cy + h / 2, r, r / 3, 0, 0, Math.PI);
  g.lineTo(cx, cy - h / 2);
  g.closePath();
  g.fillStyle = fill;
  g.globalAlpha = .46;
  g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = stroke;
  g.stroke();
  g.beginPath();
  g.ellipse(cx, cy + h / 2, r, r / 3, 0, 0, Math.PI * 2);
  g.stroke();
}

function drawPyramid(cx, cy, base, h, fill, stroke) {
  const top = [cx, cy - h / 2];
  const left = [cx - base / 2, cy + h / 2];
  const right = [cx + base / 2, cy + h / 2];
  const back = [cx + base * .18, cy + h / 2 - base * .30];
  g.fillStyle = fill;
  g.globalAlpha = .46;
  g.beginPath(); g.moveTo(...top); g.lineTo(...left); g.lineTo(...right); g.closePath(); g.fill();
  g.globalAlpha = .26;
  g.beginPath(); g.moveTo(...top); g.lineTo(...right); g.lineTo(...back); g.closePath(); g.fill();
  g.globalAlpha = 1;
  g.strokeStyle = stroke;
  g.beginPath();
  g.moveTo(...top); g.lineTo(...left); g.lineTo(...right); g.lineTo(...back); g.lineTo(...left);
  g.moveTo(...top); g.lineTo(...right); g.moveTo(...top); g.lineTo(...back);
  g.stroke();
}

shapeSelect.addEventListener("change", drawGeometry);
sizeInput.addEventListener("input", drawGeometry);
heightInput.addEventListener("input", drawGeometry);
roundValues.addEventListener("change", drawGeometry);
setTheme(savedTheme);
setGalaxy(savedGalaxy);

// -------------------- PARTICLE SIMULATION --------------------
const pCanvas = document.getElementById("particleCanvas"), p = pCanvas.getContext("2d"), gravitySelect=document.getElementById("gravitySelect"), particleCount=document.getElementById("particleCount");
let particles=[], paused=false;
function resetParticles() {
  particles = Array.from({length:Number(particleCount.value)}, () => ({
    x: Math.random()*pCanvas.width, y: Math.random()*pCanvas.height*.65+10,
    vx:(Math.random()-.5)*2.4, vy:(Math.random()-.5)*1.4,
    r:4+Math.random()*6, hue:210+Math.random()*90
  }));
  document.getElementById("particleCountLabel").textContent=`${particles.length} particles`;
}
function animateParticles() {
  requestAnimationFrame(animateParticles); if (paused) return;
  p.clearRect(0,0,pCanvas.width,pCanvas.height);
  const gravity=Number(gravitySelect.value);
  particles.forEach(o => {
    o.vy += gravity; o.x += o.vx; o.y += o.vy;
    if (o.x-o.r<0 || o.x+o.r>pCanvas.width) { o.vx*=-1; o.x=Math.max(o.r,Math.min(pCanvas.width-o.r,o.x)); }
    if (o.y+o.r>pCanvas.height) { o.y=pCanvas.height-o.r; o.vy*=-.82; }
    if (o.y-o.r<0) { o.y=o.r; o.vy=Math.abs(o.vy); }
    p.beginPath(); p.arc(o.x,o.y,o.r,0,Math.PI*2); p.fillStyle=`hsla(${o.hue},80%,60%,.86)`; p.fill();
  });
}
particleCount.addEventListener("input", resetParticles); document.getElementById("resetParticles").addEventListener("click", resetParticles);
document.getElementById("pauseParticles").addEventListener("click", e => { paused=!paused; e.target.textContent=paused?"Resume":"Pause"; });
resetParticles(); animateParticles();

// -------------------- TIMER --------------------
let timerSeconds=300, initialSeconds=300, timerId=null;
const timerDisplay=document.getElementById("timerDisplay"), timerStart=document.getElementById("timerStart");
function updateTimerDisplay(){ const m=Math.floor(timerSeconds/60), s=timerSeconds%60; timerDisplay.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; }
function stopTimer(){ clearInterval(timerId); timerId=null; timerStart.textContent="Start"; }
timerStart.addEventListener("click", () => {
  if (timerId) { stopTimer(); return; }
  timerStart.textContent="Stop";
  timerId=setInterval(()=>{ if(timerSeconds>0){ timerSeconds--; updateTimerDisplay(); } else { stopTimer(); alert("Time's up! Great focus session 🎉"); } },1000);
});
document.getElementById("timerReset").addEventListener("click",()=>{ stopTimer(); timerSeconds=initialSeconds; updateTimerDisplay(); });
document.getElementById("timerChange").addEventListener("click",()=>{ const min=prompt("Enter focus time in minutes (1-120):", Math.round(initialSeconds/60)); if(min===null)return; const n=Math.max(1,Math.min(120,Number(min)||5)); stopTimer(); initialSeconds=timerSeconds=Math.round(n*60); updateTimerDisplay(); });
updateTimerDisplay();

// -------------------- HOMEWORK TRACKER --------------------
const homeworkForm=document.getElementById("homeworkForm"), homeworkInput=document.getElementById("homeworkInput"), homeworkList=document.getElementById("homeworkList");
let tasks=JSON.parse(localStorage.getItem("techtopiaTasks")||"null") || [
  {text:"Finish math practice",done:false}, {text:"Read 20 minutes",done:true}
];
function saveTasks(){ localStorage.setItem("techtopiaTasks",JSON.stringify(tasks)); }
function renderTasks(){
  homeworkList.innerHTML="";
  tasks.forEach((task,i)=>{ const li=document.createElement("li"); li.className=`homework-item ${task.done?"completed":""}`; li.innerHTML=`<input type="checkbox" ${task.done?"checked":""} aria-label="Mark task complete"><span></span><button class="delete-task" aria-label="Delete task">×</button>`; li.querySelector("span").textContent=task.text; li.querySelector("input").addEventListener("change",e=>{tasks[i].done=e.target.checked;saveTasks();renderTasks();}); li.querySelector("button").addEventListener("click",()=>{tasks.splice(i,1);saveTasks();renderTasks();}); homeworkList.appendChild(li); });
  const done=tasks.filter(t=>t.done).length; document.getElementById("homeworkSummary").textContent=`${done}/${tasks.length} completed`;
}
homeworkForm.addEventListener("submit",e=>{e.preventDefault();const text=homeworkInput.value.trim();if(!text)return;tasks.push({text,done:false});homeworkInput.value="";saveTasks();renderTasks();});
document.getElementById("clearCompleted").addEventListener("click",()=>{tasks=tasks.filter(t=>!t.done);saveTasks();renderTasks();});
renderTasks();
