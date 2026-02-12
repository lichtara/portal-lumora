/* ===============================
   ESTADO GLOBAL DO PORTAL
================================ */
let portalState = "portal";

function enterPortal() {
  setState("sintonizacao");
}

function startCalibration() {
  setState("calibracao");
}

function setState(state) {
  portalState = state;

  document.getElementById("portal-screen").style.display = "none";
  document.getElementById("sintonizacao-screen").style.display = "none";
  document.getElementById("calibration-screen").style.display = "none";

  if (state === "portal") {
    document.getElementById("portal-screen").style.display = "block";
  }

  if (state === "sintonizacao") {
    document.getElementById("sintonizacao-screen").style.display = "block";
    document.body.className = "estado-sintonizacao";
  }

  if (state === "calibracao") {
    document.getElementById("calibration-screen").style.display = "block";
    document.body.className = "estado-calibracao";
  }
}


/* ===============================
   SOM AMBIENTE
================================ */
const bg = document.getElementById("bg");
bg.volume = 0.12;
bg.play();

/* ===============================
   SONS DOS SÍMBOLOS
================================ */
const soundExp = document.getElementById("sound-exp");
const soundAlign = document.getElementById("sound-align");
const soundAct = document.getElementById("sound-act");

/* ===============================
   PULSO VISUAL (CONTAINER)
================================ */
function pulseByType(type) {
  const el = document.querySelector(`.symbol[data-type="${type}"]`);
  if (!el) return;

  el.classList.remove("pulse");
  void el.offsetWidth; // força reflow
  el.classList.add("pulse");
}

/* ===============================
   HOVER → MICRO-EVENTO (CRISTAL)
================================ */
document.querySelectorAll(".symbol").forEach(symbol => {
  symbol.addEventListener("mouseenter", () => {
    const type = symbol.dataset.type;

    pulseByType(type);

    // micro som cristalino (baixo)
    const clone = soundAlign.cloneNode();
    clone.volume = 0.15;
    clone.play();
  });
});

/* ===============================
   CLIQUE → ATIVAÇÃO PRINCIPAL
================================ */
function activate(type) {
  const msg = document.getElementById("message");
  const portal = document.getElementById("portal");
  const portalVisual = document.getElementById("portal-visual");

  pulseByType(type);

  if (type === "expansao") {
    soundExp.volume = 0.35;
    soundExp.play();
    document.body.style.background = "#eef3ff";
    msg.innerText =
      "Você entrou no fluxo da expansão. Padrões começam a se revelar.";
  }

  if (type === "equilibrio") {
    soundAlign.volume = 0.35;
    soundAlign.play();
    document.body.style.background = "#f1fff5";
    msg.innerText =
      "Você acessou a frequência de alinhamento. Tudo tende a se organizar.";
  }

  if (type === "acao") {
    soundAct.volume = 0.35;
    soundAct.play();
    document.body.style.background = "#fff6e8";
    msg.innerText =
      "Você ativou a energia de precisão. Intenção e ação convergem.";
  }

  msg.style.opacity = 1;
  portal.style.display = "block";
  portalVisual.style.display = "block";
}

/* ===============================
   TRAVESSIA DO PORTAL
================================ */
function enterPortal() {

  const portalScreen = document.getElementById("portal-screen");

  portalScreen.classList.add("fade-out");

  setTimeout(() => {
    setState("sintonizacao");
    document.getElementById("bg").play();
  }, 900);
}

/* ===============================
   MÓDULO PILOTO
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

function feedback(type) {
  const fb = document.getElementById("feedback");

  if (type === "ok") {
    fb.innerText =
      "Você percebeu: sua escolha reflete a ativação que já está em curso.";
  }
  if (type === "observe") {
    fb.innerText =
      "Observe novamente. Pequenas diferenças também são informação.";
  }
  if (type === "respire") {
    fb.innerText =
      "Respire e volte ao corpo. O ajuste continua em segundo plano.";
  }
}
/* ===============================
   INICIALIZAÇÃO
================================ */
setState("portal");
