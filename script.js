const formulas = {
  A: ["dv/dt", "πr²","v²/r","v · w","l²"],
  B: ["F/qv","5 u","d·V·g","(μ · I)/2πr","L/(4π · (d²))"],
  C: ["Q/V", "Q/mΔT", "12 u" ,"2π · r","3·10⁸","λ · f"],
  D: ["m/V","C/π", "W/F"],
  E: ["h · f","m · c²","√h1/h0"],
  F: ["m · a", "-GmM/r²", "dp/dt", "-k(delta)x","19 u","mv²/r"],
  G: ["-GM/(r²)", "H - (delta)T · S","9,81"],
  H: ["E/f", "-1/2·(at²)","1 u","λ · p"],
  I: ["m · r²", "Q/t","127 u","F·t","P/(4π · (r²)"],
  J: ["Pa·m³","N·m"],
  K: ["°C + 273","39 u","mv²/2", "p²/2m"],
  L: ["r x p","I · w","Q/m","F/(I · B)","(R· A)/ρ"],
  M: ["F/g","p/v","p²/2K"],
  N: ["PV/RT","14 u", "c/v","_ ~ (μ,σ)"],
  O: ["16 u","a⁰" ],
  P: ["F · v", "W/t","31 u","I · V"],
  Q: ["mcΔT","I² Rt"],
  R: ["PV/nT", "V/I", "C/2π","-G(m · M)/U"],
  S: ["v · t","32 u","ut+vt/2","J/W"],
  T: ["1/f","2π· √L/g","2π/w","2π · √m/k"],
  U: ["Q + W", "3 · n · R · T / 2","m · g · h", ],
  V: ["ds/dt", "p/m", "I · R","w · r","E/B","E/q"],
  W: ["2πf","2π/T", "F · d"],
  X: ["(-b±√(b²-4ac))/2a ","∫ dx = _ + c"],
  Y: ["mx+n","89 u"],
  Z: ["a+ib"]
};
const palabras = [
  "WATER", "LIGHT", "POWER", "MOTOR", "LASER",
  "BRAIN", "EARTH", "SOUND", "SPACE", "PLANE",
  "TRAIN", "FIELD", "FORCE", "ATOMS", "SOLAR",
  "ROBOT", "STORM", "CLOUD", "PLANT", "BASIC",
  "STONE", "SMILE", "SHOCK", "WAVES", "RIVER",
  "METAL", "FLUID", "SPEED", "PULSE", "MAGIC",
  "GLASS", "NERVE", "EXPEL", "ZEBRA", "APPLE",
  "CHAIR", "EXTRA", "PHONE", "MUSIC", "VIDEO",
  "RADIO", "GREEN", "BLACK", "STARS", "BROWN",
  "HOUSE", "BRICK", "LEVEL", "SMOKE", "FLAME",
  "WHEEL", "CABLE", "PIXEL", "QUARK", "BOOST",
  "PHASE", "SOLID", "PRESS", "SHARP", "COACH",
  "NIGHT", "ALPHA", "GAMMA", "DELTA", "SNEAK",
  "OMEGA", "SIGMA", "THETA", "UNITY", "VALUE",
  "MIXED", "LOGIC", "ARRAY", "GRAPH", "SHAME",
  "MODEL", "STATE", "FORMS", "LINES", "POINT",
  "RATIO", "ANGLE", "CLOCK", "NOTES", "MARKS",
  "SMART", "TRACK", "WORLD", "CYCLE", "FRAME",
  "DRIVE", "SHAPE", "FLOAT", "STACK", "FLUTE"
];

function renderFormula(formula) {

  return formula

    .replace(/\(delta\)/g, "Δ")

    .replace(/²/g, "<sup>2</sup>")

    .replace(
      /([A-Za-z0-9πΔ°+\-]+)\/([A-Za-z0-9πΔ°+\-]+)/g,

      '<span class="frac">' +
      '<span class="top">$1</span>' +
      '<span class="bottom">$2</span>' +
      '</span>'
    );

}

document.addEventListener("DOMContentLoaded", () => {

  const palabra =
    palabras[Math.floor(Math.random() * palabras.length)];

  const ecuacionesDiv =
    document.getElementById("ecuaciones");

  const entrada =
    document.getElementById("entrada");

  const boton =
    document.getElementById("probar");

  const resultado =
    document.getElementById("resultado");

  entrada.maxLength = palabra.length;

  entrada.placeholder =
    `${palabra.length}-letter word`;

  palabra.split("").forEach((letra, index) => {

    const opciones = formulas[letra];

    if (!opciones) return;

    const formula =
      opciones[Math.floor(Math.random() * opciones.length)];

    const div = document.createElement("div");

    div.className = "ecuacion";

    div.innerHTML = `
      <span class="numero">${index + 1}.</span>
      <span class="formula">${renderFormula(formula)}</span>
    `;

    ecuacionesDiv.appendChild(div);

  });

  function lanzarConfeti() {

    confetti({
      particleCount: 220,
      spread: 140,
      startVelocity: 65,
      origin: {
        y: 1
      }
    });

    confetti({
      particleCount: 120,
      angle: 60,
      spread: 90,
      origin: {
        x: 0,
        y: 1
      }
    });

    confetti({
      particleCount: 120,
      angle: 120,
      spread: 90,
      origin: {
        x: 1,
        y: 1
      }
    });

  }

  function comprobar() {

    const intento =
      entrada.value.toUpperCase().trim();

    if (intento === palabra) {

      resultado.textContent = "Correct!";

      resultado.style.color = "#22c55e";

      lanzarConfeti();

    } else {

      resultado.textContent = "Incorrect...";

      resultado.style.color = "#ef4444";

    }

  }

  boton.addEventListener("click", comprobar);

  entrada.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

      comprobar();

    }

  });

});
