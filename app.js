// Som ambiente
const bg = document.getElementById("bg");
bg.volume = 0.15;
bg.play();

// Tocar som por símbolo
function playSound(type){
  if(type === "expansao") document.getElementById("sound-exp").play();
  if(type === "equilibrio") document.getElementById("sound-align").play();
  if(type === "acao") document.getElementById("sound-act").play();
}

// Ativação principal
function activate(type) {
  const msg = document.getElementById("message");
  const portal = document.getElementById("portal");
  const portalVisual = document.getElementById("portal-visual");

  playSound(type);

  if (type === "expansao") {
    document.body.style.background = "#eef3ff";
    msg.innerText =
      "Você entrou no fluxo da expansão. Padrões começam a se revelar.";
  }
  if (type === "equilibrio") {
    document.body.style.background = "#f1fff5";
    msg.innerText =
      "Você acessou a frequência de alinhamento. Tudo tende a se organizar.";
  }
  if (type === "acao") {
    document.body.style.background = "#fff6e8";
    msg.innerText =
      "Você ativou a energia de precisão. Intenção e ação convergem.";
  }

  msg.style.opacity = 1;
  portal.style.display = "block";
  portalVisual.style.display = "block";
}

// Travessia do portal
function enterPortal() {
  document.getElementById("portal-screen").style.display = "none";
  document.getElementById("module").style.display = "block";
}

// Mostrar calibração
function startCalibration() {
  document.getElementById("calibration").style.display = "block";
}

// Feedback do teste
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
