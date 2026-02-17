import { T } from './theme';

export function inject() {
  if (document.getElementById("du-s")) return;

  const s = document.createElement("style");
  s.id = "du-s";
  s.textContent = `
    *{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    body{background:${T.bg};margin:0;color:${T.text}}

    /* Minimal animations */
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .du-fade{animation:fadeIn .2s ease-in}

    ::placeholder{color:${T.textDim}}
    input[type=range]{accent-color:${T.primary};height:6px}
    ::-webkit-scrollbar{width:8px}
    ::-webkit-scrollbar-track{background:${T.surface}}
    ::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px}
    ::-webkit-scrollbar-thumb:hover{background:${T.textDim}}
  `;
  document.head.appendChild(s);
}
