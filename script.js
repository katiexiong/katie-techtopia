// TechTopia by Katie Xiong — pure HTML/CSS/JavaScript, no libraries required.

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
const quiz = [
  { q: "What is 6 × 6?", options: ["25", "36", "24", "31"], answer: 1 },
  { q: "A circle has radius 5. What is its diameter?", options: ["2.5", "5", "10", "25"], answer: 2 },
  { q: "Which number is prime?", options: ["21", "27", "29", "33"], answer: 2 },
  { q: "What is 3/4 written as a decimal?", options: ["0.34", "0.50", "0.75", "1.25"], answer: 2 },
  { q: "Solve: x + 7 = 15", options: ["6", "7", "8", "22"], answer: 2 }
];
let quizIndex = 0, quizCorrect = 0, quizAttempts = 0, quizChecked = false;
const questionEl = document.getElementById("quizQuestion"), optionsEl = document.getElementById("quizOptions"), feedbackEl = document.getElementById("quizFeedback");
function loadQuestion() {
  quizChecked = false; feedbackEl.textContent = ""; feedbackEl.className = "feedback";
  const item = quiz[quizIndex];
  document.getElementById("quizProgress").textContent = `Question ${quizIndex + 1} of ${quiz.length}`;
  questionEl.textContent = item.q;
  optionsEl.innerHTML = item.options.map((opt, i) => `<label class="option-label"><input type="radio" name="quiz" value="${i}"><span>${String.fromCharCode(65+i)}. ${opt}</span></label>`).join("");
  document.getElementById("quizScore").textContent = `${quizCorrect} / ${quizAttempts}`;
}
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
loadQuestion();

// -------------------- CHAT BOT --------------------
const chatForm = document.getElementById("chatForm"), chatInput = document.getElementById("chatInput"), chatMessages = document.getElementById("chatMessages");
function addMessage(text, who) { const div = document.createElement("div"); div.className = `message ${who}`; div.textContent = text; chatMessages.appendChild(div); chatMessages.scrollTop = chatMessages.scrollHeight; }
function botReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hello") || t.includes("hi")) return "Hi there! Welcome to TechTopia ✨";
  if (t.includes("katie")) return "Katie Xiong is the creator of this TechTopia portfolio.";
  if (t.includes("math")) return "Try the Knowledge Quiz or Geometry Visualizer. A good math habit is: understand the idea, practice, then explain it back.";
  if (t.includes("geometry") || t.includes("circle")) return "For a circle: diameter = 2r, circumference = 2πr, and area = πr².";
  if (t.includes("study") || t.includes("homework")) return "Break your work into small tasks, use the Homework Tracker, then focus with the Timer.";
  if (t.includes("particle") || t.includes("gravity")) return "The particle simulator lets you compare Moon, Earth, Jupiter, and zero gravity.";
  if (t.includes("website") || t.includes("techtopia")) return "TechTopia is Katie's interactive portfolio built with HTML, CSS, and JavaScript.";
  return "Good question! I am a simple offline demo bot, so try asking about Katie, math, geometry, studying, gravity, or TechTopia.";
}
chatForm.addEventListener("submit", e => { e.preventDefault(); const text = chatInput.value.trim(); if (!text) return; addMessage(text, "user"); chatInput.value = ""; setTimeout(() => addMessage(botReply(text), "bot"), 250); });

// -------------------- GEOMETRY VISUALIZER --------------------
const gCanvas = document.getElementById("geometryCanvas"), g = gCanvas.getContext("2d"), radiusInput = document.getElementById("radiusInput"), roundValues = document.getElementById("roundValues");
function formatValue(n) { return roundValues.checked ? n.toFixed(2) : String(n); }
function drawGeometry() {
  const r = Number(radiusInput.value), scale = 18, pr = r * scale;
  g.clearRect(0,0,gCanvas.width,gCanvas.height);
  const cx = gCanvas.width/2, cy = gCanvas.height/2;
  const grad = g.createLinearGradient(cx-pr, cy-pr, cx+pr, cy+pr); grad.addColorStop(0,"#c4b5fd"); grad.addColorStop(1,"#7dd3fc");
  g.beginPath(); g.arc(cx,cy,pr,0,Math.PI*2); g.fillStyle=grad; g.globalAlpha=.42; g.fill(); g.globalAlpha=1; g.lineWidth=4; g.strokeStyle="#6d28d9"; g.stroke();
  g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+pr,cy); g.strokeStyle="#ec4899"; g.lineWidth=4; g.stroke();
  g.fillStyle="#172033"; g.font="700 18px system-ui"; g.fillText(`radius = ${r}`, cx+20, cy-12);
  g.beginPath(); g.arc(cx,cy,5,0,Math.PI*2); g.fillStyle="#172033"; g.fill();
  document.getElementById("radiusValue").textContent=r;
  document.getElementById("diameterOutput").textContent=formatValue(2*r);
  document.getElementById("circumferenceOutput").textContent=formatValue(2*Math.PI*r);
  document.getElementById("areaOutput").textContent=formatValue(Math.PI*r*r);
}
radiusInput.addEventListener("input", drawGeometry); roundValues.addEventListener("change", drawGeometry); drawGeometry();

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
