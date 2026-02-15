import { T } from './theme';

export function inject() {
  if (document.getElementById("du-s")) return;
  const lnk = document.createElement("link");
  lnk.id = "du-lnk";
  lnk.rel = "stylesheet";
  lnk.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(lnk);
  const s = document.createElement("style");
  s.id = "du-s";
  s.textContent = `*{box-sizing:border-box}body{background:${T.bg};margin:0}
@keyframes pr{0%{box-shadow:0 0 0 0 rgba(255,85,119,.5)}70%{box-shadow:0 0 0 16px rgba(255,85,119,0)}100%{box-shadow:0 0 0 0 rgba(255,85,119,0)}}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes bl{0%,100%{opacity:1}50%{opacity:.3}}
.du-fade{animation:fu .28s ease both}.du-pulse{animation:pr 1.3s ease infinite}.du-blink{animation:bl .9s ease infinite}
::placeholder{color:${T.textDim}}input[type=range]{accent-color:${T.green};height:4px}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}
.du-drop{border:2px dashed ${T.border};border-radius:10px;transition:border-color .2s,background .2s;cursor:pointer}
.du-drop:hover,.du-drop.over{border-color:${T.green};background:${T.greenDim}}`;
  document.head.appendChild(s);
}
