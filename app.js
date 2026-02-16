/* ===============================
   ESTADO GLOBAL DE TELAS
================================ */
let portalState = "portal";

function setState(state){
  portalState = state;

  const portal = document.getElementById("portal-screen");
  const sint   = document.getElementById("sintonizacao-screen");
  const calib  = document.getElementById("calibration-screen");

  portal.style.display = "none";
  sint.style.display   = "none";
  calib.style.display  = "none";

  document.body.classList.remove("dark-mode");

  if(state === "portal"){
    portal.style.display = "block";
  }

  if(state === "sintonizacao"){
    sint.style.display = "block";
    document.body.classList.add("dark-mode");
  }

  if(state === "calibracao"){
    calib.style.display = "block";
    document.body.classList.add("dark-mode");
  }
}

/* ===============================
   MOTOR SIMBÓLICO (LICHTARA)
================================ */
const fieldState = {
  expansao: 0,
  alinhamento: 0,
  acao: 0,
  pausa: 0,
  transicao: 0
};

function incline(field, intensity = 1){
  fieldState[field] += intensity;
  Object.keys(fieldState).forEach(k => {
    if(k !== field) fieldState[k] *= 0.85;
  });
}

function getDominantField(){
  return Object.entries(fieldState)
    .sort((a,b) => b[1] - a[1])[0][0];
}

/* ===============================
   FRASES-SEMENTE
================================ */
const seeds = {
  expansao: [
    "Algo se abre sem pressa.",
    "Há mais espaço do que parece.",
    "O campo respira contigo."
  ],
  alinhamento: [
    "Algo encontra lugar.",
    "O centro se reconhece.",
    "Não há urgência."
  ],
  acao: [
    "Agora.",
    "Escolhe um gesto simples.",
    "O movimento é suficiente."
  ],
  pausa: [
    "Permanece.",
    "Nada precisa acontecer.",
    "O silêncio sustenta."
  ],
  transicao: [
    "Algo muda.",
    "Talvez percebas…",
    "Quando estiver pronto."
  ]
};

function pickSeed(field){
  const arr = seeds[field];
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===============================
   MICROVARIAÇÕES SENSORIAIS
================================ */
const bg = document.getElementById("bg");
bg.volume = 0.12;

function adjustSensory(field){
  // tempo
  let delay = 3500;
  if(field === "pausa") delay = 6000;
  if(field === "acao")  delay = 2200;

  // som
  if(field === "pausa") bg.volume = 0.08;
  if(field === "expansao") bg.volume = 0.14;
  if(field === "acao") bg.volume = 0.18;

  // visual
  document.body.style.filter = "none";
  if(field === "pausa")
    document.body.style.filter = "brightness(0.92)";
  if(field === "expansao")
    document.body.style.filter = "brightness(1.05)";
  if(field === "acao")
    document.body.style.filter = "contrast(1.05)";

  return delay;
}

/* ===============================
   SONS DE ATIVAÇÃO
================================ */
const soundExp   = document.getElementById("sound-exp");
const soundAlign = document.getElementById("sound-align");
const soundAct   = document.getElementById("sound-act");

/* ===============================
   PULSO VISUAL
================================ */
function pulseByType(type){
  const el = document.querySelector(`.symbol[data-type="${type}"]`);
  if (!el) return;
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

/* ===============================
   HOVER → MICROEVENTO
================================ */
document.querySelectorAll(".symbol").forEach(symbol => {
  symbol.addEventListener("mouseenter", () => {
    const type = symbol.dataset.type;
    pulseByType(type);
    const clone = soundAlign.cloneNode();
    clone.volume = 0.15;
    clone.play();
  });
});

/* ===============================
   ATIVAÇÃO SIMBÓLICA
================================ */
function activate(type){

  const msg = document.getElementById("message");
  const portal = document.getElementById("portal");
  const portalVisual = document.getElementById("portal-visual");

  pulseByType(type);
  incline(type);

  if(type === "expansao") soundExp.play();
  if(type === "equilibrio"){
    soundAlign.play();
    type = "alinhamento";
  }
  if(type === "acao") soundAct.play();

  const dominant = getDominantField();
  const seed = pickSeed(dominant);
  const delay = adjustSensory(dominant);

  msg.style.opacity = 0;

  setTimeout(() => {
    msg.innerText = seed;
    msg.style.opacity = 1;
  }, delay * 0.3);

  portal.style.display = "block";
  portalVisual.style.display = "block";
}

/* ===============================
   TRAVESSIA
================================ */
function enterPortal(){
  const portalScreen = document.getElementById("portal-screen");
  portalScreen.classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    bg.play();
    incline("transicao", 0.8);
  }, 900);
}

/* ===============================
   CALIBRAÇÃO
================================ */
function startCalibration(){
  const sint = document.getElementById("sintonizacao-screen");
  sint.classList.add("fade-out");

  setTimeout(() => {
    setState("calibracao");
    soundAlign.play();
    incline("alinhamento", 0.6);
  }, 700);
}

/* ===============================
   FEEDBACK SUAVE
================================ */
function feedback(type){
  const fb = document.getElementById("feedback");

  if(type === "ok")
    fb.innerText = pickSeed("integracao") || "Algo se acomoda.";

  if(type === "observe")
    fb.innerText = "Talvez algo queira ser visto com mais calma.";

  if(type === "respire")
    fb.innerText = "O corpo sabe ajustar.";
}

/* ===============================
   INIT
================================ */
setState("portal");
