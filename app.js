/* ============================================================
   PORTAL LUMORA — APP.JS (VERSÃO ESTÁVEL)
   ------------------------------------------------------------
   Sustenta um ambiente simbólico.
   Não interpreta o usuário.
============================================================ */

/* ===============================
   IMPORTS
================================ */
import { callHarmonyProtocol } from './harmony.js';

/* ===============================
   ESTADO DE CALIBRAÇÃO
================================ */
let calibrationState = {
  startedAt: null,
  interactions: 0,
  archetype: null,
  coherenceEstimate: 0.35
};

/* ===============================
   ESTADO GLOBAL DE TELAS
================================ */
let portalState = "portal";

function setState(state) {
  portalState = state;

  const portal = document.getElementById("portal-screen");
  const sint   = document.getElementById("sintonizacao-screen");
  const calib  = document.getElementById("calibration-screen");

  portal.style.display = "none";
  sint.style.display   = "none";
  calib.style.display  = "none";

  document.body.classList.remove("dark-mode");

  if (state === "portal") portal.style.display = "block";
  if (state === "sintonizacao") {
    sint.style.display = "block";
    document.body.classList.add("dark-mode");
  }
  if (state === "calibracao") {
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

function incline(field, intensity = 1) {
  fieldState[field] += intensity;
  Object.keys(fieldState).forEach(k => {
    if (k !== field) fieldState[k] *= 0.85;
  });
}

function getDominantField() {
  return Object.entries(fieldState)
    .sort((a, b) => b[1] - a[1])[0][0];
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

function pickSeed(field) {
  const arr = seeds[field] || seeds.transicao;
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===============================
   ELEMENTOS DE ÁUDIO (referência)
================================ */
let bg, soundExp, soundAlign, soundAct;

/* ===============================
   SENSORIAL
================================ */
function adjustSensory(field) {
  let delay = 3500;
  if (field === "pausa") delay = 6000;
  if (field === "acao")  delay = 2200;

  if (bg) {
    if (field === "pausa") bg.volume = 0.08;
    if (field === "expansao") bg.volume = 0.14;
    if (field === "acao") bg.volume = 0.18;
  }

  document.body.style.filter = "none";
  if (field === "pausa") document.body.style.filter = "brightness(0.92)";
  if (field === "expansao") document.body.style.filter = "brightness(1.05)";
  if (field === "acao") document.body.style.filter = "contrast(1.05)";

  return delay;
}

/* ===============================
   VISUAL
================================ */
function pulseByType(type) {
  const el = document.querySelector(`.symbol[data-type="${type}"]`);
  if (!el) return;
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

/* ===============================
   ATIVAÇÃO SIMBÓLICA
================================ */
function activate(type) {
  if (type === "equilibrio") type = "alinhamento";

  pulseByType(type);
  incline(type);

  calibrationState.interactions++;
  if (!calibrationState.archetype)
    calibrationState.archetype = type;

  if (type === "expansao" && soundExp) soundExp.play();
  if (type === "alinhamento" && soundAlign) soundAlign.play();
  if (type === "acao" && soundAct) soundAct.play();

  const dominant = getDominantField();
  const seed = pickSeed(dominant);
  const delay = adjustSensory(dominant);

  const msg = document.getElementById("message");
  msg.style.opacity = 0;

  setTimeout(() => {
    msg.innerText = seed;
    msg.style.opacity = 1;
  }, delay * 0.3);
}

/* ===============================
   TRAVESSIA
================================ */
function enterPortal() {
  document.getElementById("portal-screen")
    .classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    if (bg) bg.play();
    incline("transicao", 0.8);
  }, 900);
}

/* ===============================
   CALIBRAÇÃO
================================ */
function startCalibration() {
  calibrationState.startedAt = Date.now();
  calibrationState.interactions = 0;
  calibrationState.archetype = null;
  calibrationState.coherenceEstimate = 0.35;

  setState("calibracao");
  feedback("observe");
}

/* ===============================
   FEEDBACK
================================ */
function feedback(type) {
  const fb = document.getElementById("feedback");

  if (type === "observe") {
    incline("pausa", 0.4);
    adjustSensory("pausa");
    fb.innerText = "Talvez algo queira ser visto com mais calma.";
  }

  if (type === "ok") {
    incline("alinhamento", 0.4);
    adjustSensory("alinhamento");
    fb.innerText = "Algo se acomoda.";
  }

  if (type === "respire") {
    incline("transicao", 0.4);
    adjustSensory("transicao");
    fb.innerText = "O corpo sabe ajustar.";
  }
}

/* ===============================
   INICIALIZAÇÃO SEGURA
================================ */
document.addEventListener("DOMContentLoaded", () => {

  bg         = document.getElementById("bg");
  soundExp   = document.getElementById("sound-exp");
  soundAlign = document.getElementById("sound-align");
  soundAct   = document.getElementById("sound-act");

  document.querySelectorAll(".symbol").forEach(symbol => {
    symbol.addEventListener("mouseenter", () => {
      pulseByType(symbol.dataset.type);
      if (soundAlign) {
        const clone = soundAlign.cloneNode();
        clone.volume = 0.15;
        clone.play();
      }
    });
  });

  window.activate = activate;
  window.enterPortal = enterPortal;
  window.startCalibration = startCalibration;
  window.feedback = feedback;

  setState("portal");
});
