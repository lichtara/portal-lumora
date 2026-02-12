/* ===============================
   ESTADO GLOBAL
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
   SOM AMBIENTE
================================ */
const bg = document.getElementById("bg");
bg.volume = 0.12;

/* ===============================
   SONS
================================ */
const soundExp   = document.getElementById("sound-exp");
const soundAlign = document.getElementById("sound-align");
const soundAct   = document.getElementById("sound-act");

/* ===============================
   PULSO
================================ */
function pulseByType(type) {
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
    const type = symbol.dataset.type;
    pulseByType(type);
    const clone = soundAlign.cloneNode();
    clone.volume = 0.15;
    clone.play();
  });
});

/* ===============================
   ATIVAÇÃO
================================ */
function activate(type) {

  const msg = document.getElementById("message");
  const portal = document.getElementById("portal");
  const portalVisual = document.getElementById("portal-visual");

  pulseByType(type);

  if (type === "expansao") {
    soundExp.volume = 0.35;
    soundExp.play();
    msg.innerText = "Você entrou no fluxo da expansão.";
  }

  if (type === "equilibrio") {
    soundAlign.volume = 0.35;
    soundAlign.play();
    msg.innerText = "Você acessou a frequência de alinhamento.";
  }

  if (type === "acao") {
    soundAct.volume = 0.35;
    soundAct.play();
    msg.innerText = "Você ativou a energia de precisão.";
  }

  msg.style.opacity = 1;
  portal.style.display = "block";
  portalVisual.style.display = "block";
}

/* ===============================
   TRAVESSIA
================================ */
function enterPortal() {

  const portalScreen = document.getElementById("portal-screen");
  portalScreen.classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    bg.play();
  }, 900);
}

/* ===============================
   CALIBRAÇÃO
================================ */
function startCalibration() {

  const sint = document.getElementById("sintonizacao-screen");
  sint.classList.add("fade-out");

  setTimeout(() => {
    setState("calibracao");
    soundAlign.volume = 0.35;
    soundAlign.play();
  }, 700);
}

/* ===============================
   FEEDBACK
================================ */
function feedback(type) {

  const fb = document.getElementById("feedback");

  if (type === "ok")
    fb.innerText = "Sua escolha reflete a ativação em curso.";

  if (type === "observe")
    fb.innerText = "Observe novamente. Pequenas diferenças também são informação.";

  if (type === "respire")
    fb.innerText = "Respire e volte ao corpo. O ajuste continua em segundo plano.";
}

/* ===============================
   INIT
================================ */
setState("portal");
