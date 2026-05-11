const formulas = {
  A: ["dv/dt", "πr²","v²/r","v · w"],
  B: ["F/qv","5 u","d·V·g","μI/2πr","L/(4π · (d²))"],
  C: ["Q/V", "Q/mΔT", "12 u" ,"2π · r","3·10⁸","λ · f"],
  D: ["m/V"],
  E: ["mv²/2", "p²/2m", "m · g · h", "P · V", "h · f","m · c²","√h1/h0"],
  F: ["m · a", "-GmM/r²", "dp/dt", "-k(delta)x","19 u","mv²/r"],
  G: ["-GM/(r²)", "H - (delta)T · S","9,81"],
  H: ["E/f", "-1/2·(at²)","1 u","λ · p"],
  I: ["m · r²", "Q/t","127 u","F·t","P/4πr"],
  J: ["Pa·atm","I/A"],
  K: ["°C + 273","39 u"],
  L: ["r x p","I · w","Q/m"],
  M: ["F/a","F/g","p/v","M · n","m/n"],
  N: ["PV/RT","14 u", "c/v"],
  O: ["16 u","a⁰"],
  P: ["F · v", "W/t", "m · v", "F/A","31 u","I · V"],
  Q: ["mcΔT","I² Rt"],
  R: ["PV/nT", "V · I", "C/2π"],
  S: ["v · t","32 u","ut+vt/2"],
  T: ["1/f","2π· √L/g","2π/w","2π · √m/k"],
  U: ["Q - W"],
  V: ["ds/dt", "p/m", "I · R","w · r","E/B","E/q"],
  W: ["2πf","2π/T", "F · d"],
  X: ["(-b±√(b²-4ac))/2a"],
  Y: ["mx+n","89 u"],
  Z: ["a+ib"]
};

// ===== PALABRAS POSIBLES =====
const palabras = [
  "WATER", "LIGHT", "POWER", "MOTOR", "LASER", 
  "BRAIN", "EARTH", "SOUND", "SPACE", "PLANE", 
  "TRAIN", "FIELD", "FORCE", "ATOMS", "SOLAR", 
  "ROBOT", "STORM", "CLOUD", "PLANT", "BASIC",
  "STONE", "SMILE", "SHOCK", "WAVES", "RIVER",
  "METAL", "FLUID", "SPEED", "PULSE", "MAGIC",
  "GLASS", "NERVE", "EXPEL", "MOUSE", "APPLE",
  "CHAIR", "EXTRA", "PHONE", "MUSIC", "VIDEO",
  "RADIO", "GREEN", "BLACK", "WHITE", "BROWN",
  "HOUSE", "BRICK", "LEVEL", "SMOKE", "FLAME",
  "WHEEL", "CABLE", "PIXEL", "QUARK", "BOOST", 
  "PHASE", "SOLID", "PRESS", "SHARP", "COACH",
  "NIGHT", "ALPHA", "GAMMA", "DELTA", "SNEAK",
  "OMEGA", "SIGMA", "THETA", "UNITY", "VALUE",
  "MIXED", "LOGIC", "ARRAY", "GRAPH", "SHAME",
  "MODEL", "STATE", "FORMS", "LINES", "POINT",
  "RATIO", "ANGLE", "CLOCK", "NOTES", "MARKS",
  "SMART", "TRACK", "WORLD", "CYCLE", "FRAME",
  "DRIVE", "SHAPE", "FLOAT", "STACK", "PRAWN",
];

// ===== CONVERTIR TEXTO A FORMATO MATEMÁTICO =====
function renderFormula(formula) {
  return formula
    .replace(/\(delta\)/g, "Δ")
    .replace(/²/g, "<sup>2</sup>")
    .replace(/±/g, " ± ")
    .replace(/√\((.*?)\)/g, "√($1)")

    // Fórmula cuadrática (caso especial)
    .replace(
      /\(-b ± √\(b<sup>2<\/sup>-4ac\)\)\/2a/g,
      '<span class="frac">' +
        '<span class="top">-b ± √(b<sup>2</sup> - 4ac)</span>' +
        '<span class="bottom">2a</span>' +
      '</span>'
    )

    // Fracciones simples
    .replace(
      /([A-Za-z0-9πΔ°+\-]+)\/([A-Za-z0-9πΔ°+\-]+)/g,
      '<span class="frac">' +
        '<span class="top">$1</span>' +
        '<span class="bottom">$2</span>' +
      '</span>'
    );
}

// ===== INICIO DEL JUEGO =====
document.addEventListener("DOMContentLoaded", () => {

  // Elegir palabra aleatoria
  const palabra =
    palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();

  // Elementos del HTML
  const ecuacionesDiv = document.getElementById("ecuaciones");
  const entrada = document.getElementById("entrada");
  const boton = document.getElementById("probar");
  const resultado = document.getElementById("resultado");

  // Configurar input según la longitud de la palabra
  entrada.maxLength = palabra.length;
  entrada.placeholder = `Five-letter word`;

  // Mostrar pista inicial
  resultado.textContent = `Five-letter word`;
  resultado.style.color = "#94a3b8";

  // ===== CREAR UNA ECUACIÓN POR CADA LETRA =====
  palabra.split("").forEach((letra, index) => {

    // Buscar fórmulas asociadas a la letra
    const opciones = formulas[letra];

    // Si no existe ninguna fórmula, saltar
    if (!opciones || opciones.length === 0) {
      return;
    }

    // Elegir una fórmula aleatoria de esa letra
    const formula =
      opciones[Math.floor(Math.random() * opciones.length)];

    // Crear tarjeta visual
    const div = document.createElement("div");
    div.className = "ecuacion";

    // Mostrar número y fórmula
    div.innerHTML = `
      <span class="numero">${index + 1}.</span>
      <span class="formula">${renderFormula(formula)}</span>
    `;

    // Añadir al contenedor
    ecuacionesDiv.appendChild(div);
  });

  // ===== COMPROBAR RESPUESTA =====
  function comprobar() {
    const intento = entrada.value.toUpperCase().trim();

    // Comprobar longitud
    if (intento.length !== palabra.length) {
      resultado.textContent =
        `Five-letter word`;
      resultado.style.color = "#f59e0b";
      return;
    }

    // Comprobar si es correcta
    if (intento === palabra) {
      resultado.textContent = "¡Correct!";
      resultado.style.color = "#22c55e";
    } else {
      resultado.textContent = "Incorrect...";
      resultado.style.color = "#ef4444";
    }
  }

  // Eventos
  boton.addEventListener("click", comprobar);

  entrada.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      comprobar();
    }
  });

});