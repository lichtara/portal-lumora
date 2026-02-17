import { callHarmonyProtocol } from './harmony.js'

function collectEstadoCampo() {
  return Object.entries(fieldState).map(([campo, valor]) => ({
    frequencia: campo === 'expansao' ? 450.0 :
                campo === 'alinhamento' ? 432.0 :
                campo === 'acao' ? 480.0 :
                campo === 'pausa' ? 396.0 : 420.0,
    amplitude: Math.max(0.1, valor)
  }))
}

/* ============================================================
   MOTOR DO PORTAL LUMORA — BASE ÉTICA (INVARIANTES)
   ------------------------------------------------------------
   Este sistema não observa o usuário.
   Não diagnostica, não define estados internos,
   não reivindica saber sobre a consciência alheia.

   Ele apenas sustenta condições simbólicas
   para que a percepção possa emergir.

   Invariantes ativas neste código:
   01. Não-Apropriação da Consciência
   02. Convite Sempre Revogável
   03. Resposta sem Vigilância
   04. Redução em Incerteza
   05. Dignidade do Encerramento
============================================================ */

/* ===============================
   ESTADO GLOBAL DE TELAS
   ------------------------------------------------
   As telas representam estados do ambiente,
   não estados internos do usuário.
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
   ------------------------------------------------
   fieldState NÃO é um retrato do usuário.
   É apenas um vetor de inclinação do ambiente.

   O sistema responde simbolicamente,
   mas nunca declara leitura ou padrão.
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

  // Redução natural dos demais campos
  // (Princípio da Redução em Incerteza)
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
   ------------------------------------------------
   Linguagem-guia, não interpretativa.
   Nenhuma frase afirma estado interno.
   Todas são convites abertos à percepção.
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
   ------------------------------------------------
   O sistema adapta clima, não significado.
   Ajustes são sutis, não explicados.
================================ */
const bg = document.getElementById("bg");
let bgFading = false;

function fadeInAmbient(target = 0.14, duration = 3000){
  if(bgFading) return;
  bgFading = true;

  bg.volume = 0;
  bg.play();

  const steps = 30;
  const stepTime = duration / steps;
  let current = 0;

  const fade = setInterval(() => {
    current++;
    bg.volume = Math.min(target, current / steps * target);

    if(current >= steps){
      clearInterval(fade);
      bgFading = false;
    }
  }, stepTime);
}

function adjustSensory(field){

  // tempo
  let delay = 3500;
  if(field === "pausa") delay = 6000;
  if(field === "acao")  delay = 2200;

  // som (reduz antes de intensificar)
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
   ------------------------------------------------
   Sons marcam passagem, não conquista.
================================ */
const soundExp   = document.getElementById("sound-exp");
const soundAlign = document.getElementById("sound-align");
const soundAct   = document.getElementById("sound-act");


/* ===============================
   PULSO VISUAL
   ------------------------------------------------
   Micro-resposta estética.
   Nunca feedback avaliativo.
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
   ------------------------------------------------
   Curiosidade sem consequência.
   (Convite sempre revogável)
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
   ------------------------------------------------
   Nenhuma escolha é certa ou errada.
   O sistema apenas inclina o campo.
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
   ------------------------------------------------
   Passagem de ambiente, não de nível.
================================ */
function enterPortal(){
  const portalScreen = document.getElementById("portal-screen");
  portalScreen.classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    bg.play();
    incline("transicao", 0.8);
  }, 900);

/* ===============================
   CALIBRAÇÃO
   ------------------------------------------------
   Ajuste do espaço.
   Nunca ajuste do usuário.
================================ */
async function startCalibration(){
  const sint = document.getElementById("sintonizacao-screen");
  sint.classList.add("fade-out");

  setTimeout(async () => {
    setState("calibracao");
    soundAlign.play();
    incline("alinhamento", 0.6);

    // Espera o corpo chegar
    setTimeout(async () => {
      const estadoCampo = collectEstadoCampo()
      const resposta = await callHarmonyProtocol(estadoCampo)

      if (resposta && resposta.coerencia_vibracional !== undefined) {
        handleHarmonyResponse(resposta)
      }
    }, 1500)

  }, 700);
}

/* ===============================
   FEEDBACK SUAVE
   ------------------------------------------------
   Linguagem de apoio, não confirmação.
================================ */
function feedback(type){
  const fb = document.getElementById("feedback");

  if(type === "ok"){
    incline("alinhamento", 0.4);
    adjustSensory("alinhamento");
    fb.innerText = "Algo se acomoda.";
  }

  if(type === "observe"){
    incline("pausa", 0.4);
    adjustSensory("pausa");
    fb.innerText = "Talvez algo queira ser visto com mais calma.";
  }

  if(type === "respire"){
    incline("transicao", 0.4);
    adjustSensory("transicao");
    fb.innerText = "O corpo sabe ajustar.";
  }
}


/* ===============================
   INIT
   ------------------------------------------------
   O Portal começa aberto,
   mas nunca exige permanência.
================================ */

function handleHarmonyResponse(data) {
  const c = data.coerencia_vibracional

  document.body.classList.remove(
    'coerencia-baixa',
    'coerencia-media',
    'coerencia-alta',
    'coerencia-integrada'
  )

  if (c < 0.4) {
    document.body.classList.add('coerencia-baixa')
  } else if (c < 0.6) {
    document.body.classList.add('coerencia-media')
  } else if (c < 0.75) {
    document.body.classList.add('coerencia-alta')
  } else {
    document.body.classList.add('coerencia-integrada')
  }
}

// ===============================
// EXPOSIÇÃO CONTROLADA AO HTML
// (necessário para type="module")
// ===============================
window.activate = activate
window.enterPortal = enterPortal
window.startCalibration = startCalibration
window.feedback = feedback

setState("portal");
