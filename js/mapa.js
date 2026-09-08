// El mapa de la persecucion.
//
// Todas las pistas del juego hablan de direcciones —sube al norte, va al
// levante, baja al sur profundo— y sin un mapa delante eso no significa nada
// para un nino. Aqui se dibuja la peninsula con las ciudades colocadas por sus
// coordenadas reales, se marca donde estais, por donde habeis pasado y los tres
// destinos posibles, para que la pista se pueda razonar en vez de adivinar.
//
// Se dibuja en SVG a mano, sin ninguna libreria: son cuatro trazos y no merece
// la pena cargar un mapa de verdad ni depender de la red.

// Marco de la peninsula, en grados. Da un poco de aire por los cuatro lados
// para que ninguna ciudad quede pegada al borde.
const MAPA_MARCO = { oesteLon: -9.9, esteLon: 3.7, surLat: 35.7, norteLat: 44.2 };

// Lienzo del SVG. El alto sale de la proporcion real del marco, no a ojo.
const MAPA_ANCHO = 300;

// A esta latitud un grado de longitud mide bastante menos que uno de latitud.
// Sin corregirlo, Espana sale estirada a lo ancho.
const MAPA_ACHATAMIENTO = Math.cos(40 * Math.PI / 180);

function mapaAlto() {
  const gradosLon = (MAPA_MARCO.esteLon - MAPA_MARCO.oesteLon) * MAPA_ACHATAMIENTO;
  const gradosLat = MAPA_MARCO.norteLat - MAPA_MARCO.surLat;
  return Math.round(MAPA_ANCHO * gradosLat / gradosLon);
}

// La unica funcion que convierte coordenadas del mundo en coordenadas del
// dibujo. Anadir una ciudad es darle su lat y su lon: se coloca sola.
function mapaProyecta(lat, lon) {
  const x = (lon - MAPA_MARCO.oesteLon) / (MAPA_MARCO.esteLon - MAPA_MARCO.oesteLon);
  const y = (MAPA_MARCO.norteLat - lat) / (MAPA_MARCO.norteLat - MAPA_MARCO.surLat);
  return { x: x * MAPA_ANCHO, y: y * mapaAlto() };
}

// En el mapa el sitio es justo y los nombres largos se salen del dibujo, asi
// que unos pocos van abreviados. En el resto del juego se sigue usando el
// nombre completo.
const MAPA_NOMBRE_CORTO = {
  "Santiago de Compostela": "Santiago"
};

function mapaNombre(ciudad) {
  return MAPA_NOMBRE_CORTO[ciudad] || ciudad;
}

function mapaCabeEnElMarco(lat, lon) {
  return lat >= MAPA_MARCO.surLat && lat <= MAPA_MARCO.norteLat &&
         lon >= MAPA_MARCO.oesteLon && lon <= MAPA_MARCO.esteLon;
}

function mapaCamino(puntos, cerrado) {
  const trozos = puntos.map(function(p, i){
    const q = mapaProyecta(p[1], p[0]);
    return (i === 0 ? "M" : "L") + q.x.toFixed(1) + " " + q.y.toFixed(1);
  });
  return trozos.join(" ") + (cerrado ? " Z" : "");
}

// Como se pinta cada ciudad segun donde ande la partida.
function mapaEstadoDe(ciudad) {
  if (ciudad === state.currentCity) return "aqui";
  const pos = state.secretRoute.indexOf(ciudad);
  if (pos > -1 && pos < state.routeIndex) return "visitada";
  if (state.destinos.indexOf(ciudad) > -1) return "destino";
  return "otra";
}

function pintarMapa() {
  const caja = document.getElementById("mapa");
  if (!caja) return;

  if (state.gameState === "start" || !state.mapaVisible) {
    caja.classList.add("hidden");
    return;
  }
  caja.classList.remove("hidden");

  const alto = mapaAlto();
  let svg = '<svg viewBox="0 0 ' + MAPA_ANCHO + ' ' + alto + '" class="mapa-svg" ' +
            'role="img" aria-label="Mapa de la ruta">';

  // Norte marcado a la vista: las pistas hablan todo el rato de subir al norte
  // o bajar al sur, y conviene que se pueda comprobar en el dibujo.
  svg += '<g class="mapa-norte">' +
         '<path d="M10 26 L10 8 M6 12 L10 8 L14 12"/>' +
         '<text x="10" y="36">N</text>' +
         '</g>';

  svg += '<path d="' + mapaCamino(SILUETA, true) + '" class="mapa-tierra"/>';
  svg += '<path d="' + mapaCamino(FRONTERA_PT, false) + '" class="mapa-frontera"/>';

  // Primero las ciudades que no son noticia, para que las importantes queden
  // dibujadas por encima y no las tape nadie.
  const orden = { otra: 0, visitada: 1, destino: 2, aqui: 3 };
  const ciudades = Object.keys(CITY_POOL).filter(function(c){
    return mapaCabeEnElMarco(CITY_POOL[c].lat, CITY_POOL[c].lon);
  }).sort(function(a, b){
    return orden[mapaEstadoDe(a)] - orden[mapaEstadoDe(b)];
  });

  ciudades.forEach(function(c){
    const p = mapaProyecta(CITY_POOL[c].lat, CITY_POOL[c].lon);
    const estado = mapaEstadoDe(c);
    const radio = (estado === "aqui") ? 5 : (estado === "destino" ? 4.5 : 3);
    svg += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + radio +
           '" class="mapa-punto mapa-' + estado + '"/>';
    // Solo se rotula lo que hace falta decidir: donde estas y adonde puedes ir.
    if (estado === "aqui" || estado === "destino" || estado === "visitada") {
      const aLaIzquierda = p.x > MAPA_ANCHO * 0.62;
      svg += '<text x="' + (aLaIzquierda ? p.x - radio - 3 : p.x + radio + 3).toFixed(1) +
             '" y="' + (p.y + 3.2).toFixed(1) +
             '" class="mapa-nombre mapa-nombre-' + estado + '"' +
             (aLaIzquierda ? ' text-anchor="end"' : '') + '>' + mapaNombre(c) + '</text>';
    }
  });

  svg += '</svg>';

  // Cartucho para lo que no cabe en el marco. Londres queda al norte, al otro
  // lado del mar; el dia que se anadan las Canarias iran aqui igual.
  let fuera = '';
  Object.keys(FUERA_DE_MARCO).forEach(function(c){
    if (!CITY_POOL[c]) return;
    const estado = mapaEstadoDe(c);
    if (estado === "otra") return;
    const flecha = FUERA_DE_MARCO[c].direccion === "norte" ? "⬆" : "⬇";
    fuera += '<div class="mapa-fuera mapa-fuera-' + estado + '">' + flecha + ' ' +
             CITY_POOL[c].emoji + ' <strong>' + c + '</strong>' +
             '<span>' + FUERA_DE_MARCO[c].nota + '</span></div>';
  });

  caja.innerHTML = svg + fuera;
}
