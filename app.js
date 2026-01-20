
const bg = document.getElementById("bg");
bg.volume = 0.15;   // bem sutil
bg.play();

function playSound(type){
  if(type === "expansao") document.getElementById("sound-exp").play();
  if(type === "equilibrio") document.getElementById("sound-align").play();
  if(type === "acao") document.getElementById("sound-act").play();
}
