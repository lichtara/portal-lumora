/* ============================================================
   PORTAL LUMORA — APP.JS (VERSÃO CANÔNICA)
   ------------------------------------------------------------
   Este código sustenta um ambiente simbólico.
   Não observa, não interpreta, não conclui.
============================================================ */

/* ===============================
   IMPORTS
================================ */
import { callHarmonyProtocol } from './harmony.js'

/* ===============================
   ESTADO DE CALIBRAÇÃO
   ------------------------------------------------
   Não representa o usuário.
   Apenas a prontidão do ambiente.
================================ */
let calibrationState = {
  startedAt: null,
  interactions: 0,
  archetype: null,
  coherenceEstimate: 0.35
}

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

  if(state === "portal") portal.style.display = "block";
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
   SENSORIAL
================================ */
const bg = document.getElementById("bg");

function adjustSensory(field){
  let delay = 3500;
  if(field === "pausa") delay = 6000;
  if(field === "acao")  delay = 2200;

  if(field === "pausa") bg.volume = 0.08;
  if(field === "expansao") bg.volume = 0.14;
  if(field === "acao") bg.volume = 0.18;

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
   SONS
================================ */
const soundExp   = document.getElementById("sound-exp");
const soundAlign = document.getElementById("sound-align");
const soundAct   = document.getElementById("sound-act");

/* ===============================
   VISUAL
================================ */
function pulseByType(type){
  const el = document.querySelector(`.symbol[data-type="${type}"]`);
  if (!el) return;
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

/* ===============================
   HOVER
================================ */
document.querySelectorAll(".symbol").forEach(symbol => {
  symbol.addEventListener("mouseenter", () => {
    pulseByType(symbol.dataset.type);
    const clone = soundAlign.cloneNode();
    clone.volume = 0.15;
    clone.play();
  });
});

/* ===============================
   ATIVAÇÃO SIMBÓLICA
================================ */
function activate(type){
   
  if (type === "equilibrio") type = "alinhamento";
   
  pulseByType(type);
  incline(type);

  calibrationState.interactions++;
  calibrationState.archetype ??= type;

  if(type === "expansao") soundExp.play();
  if(type === "alinhamento") soundAlign.play();
  if(type === "acao") soundAct.play();

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
function enterPortal(){
  document.getElementById("portal-screen")
    .classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    bg.play();
    incline("transicao", 0.8);
  }, 900);
}

/* ===============================
   CALIBRAÇÃO (SEM BACKEND)
================================ */
function startCalibration(){
  calibrationState.startedAt = Date.now();
  calibrationState.interactions = 0;
  calibrationState.archetype = null;
  calibrationState.coherenceEstimate = 0.35;

  setState("calibracao");
  feedback("observe");
}

/* ===============================
   GUARDIÃO
================================ */
function shouldCallBackend(){
  const elapsed =
    (Date.now() - calibrationState.startedAt) / 1000;

  return (
    calibrationState.interactions >= 2 &&
    calibrationState.archetype !== null &&
    elapsed >= 5 &&
    calibrationState.coherenceEstimate >= 0.6
  );
}

/* ===============================
   FEEDBACK
================================ */
function feedback(type){
  const fb = document.getElementById("feedback");

  if(type === "observe"){
    incline("pausa", 0.4);
    adjustSensory("pausa");
    fb.innerText =
      "Talvez algo queira ser visto com mais calma.";
  }

  if(type === "ok"){
    incline("alinhamento", 0.4);
    adjustSensory("alinhamento");
    fb.innerText = "Algo se acomoda.";
  }

  if(type === "respire"){
    incline("transicao", 0.4);
    adjustSensory("transicao");
    fb.innerText = "O corpo sabe ajustar.";
  }
}

/* ===============================
   BACKEND (QUANDO CHAMADO)
================================ */
async function maybeCallBackend(){
  if(!shouldCallBackend()) return;

  const estadoCampo = Object.entries(fieldState).map(
    ([campo, valor]) => ({
      frequencia:
        campo === 'expansao' ? 450 :
        campo === 'alinhamento' ? 432 :
        campo === 'acao' ? 480 :
        campo === 'pausa' ? 396 : 420,
      amplitude: Math.max(0.1, valor)
    })
  );

  const resposta =
    await callHarmonyProtocol(estadoCampo);

  if(resposta?.coerencia_vibracional !== undefined){
    calibrationState.coherenceEstimate =
      resposta.coerencia_vibracional;
    handleHarmonyResponse(resposta);
  }
}

/* ===============================
   VISUALIZAÇÃO DE COERÊNCIA
================================ */
function handleHarmonyResponse(data){
  const c = data.coerencia_vibracional;
  document.body.classList.remove(
    'coerencia-baixa',
    'coerencia-media',
    'coerencia-alta',
    'coerencia-integrada'
  );

  if (c < 0.4)
    document.body.classList.add('coerencia-baixa');
  else if (c < 0.6)
    document.body.classList.add('coerencia-media');
  else if (c < 0.75)
    document.body.classList.add('coerencia-alta');
  else
    document.body.classList.add('coerencia-integrada');
}

/* ===============================
   EXPOSIÇÃO AO HTML
================================ */
document.addEventListener("DOMContentLoaded", () => {

  bg = document.getElementById("bg");
  soundExp   = document.getElementById("sound-exp");
  soundAlign = document.getElementById("sound-align");
  soundAct   = document.getElementById("sound-act");

  window.activate = activate;
  window.enterPortal = enterPortal;
  window.startCalibration = startCalibration;
  window.feedback = feedback;

  setState("portal");
});
