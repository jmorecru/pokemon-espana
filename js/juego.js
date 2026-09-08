// Toda la logica del juego: el reloj de la semana, la ruta secreta, las
// pantallas y el reparto de preguntas. Los datos estan en data/ y la musica
// en js/musica.js.

// ---------------------------------------------------------------------------
// El reloj, al estilo Carmen Sandiego: se dispone de la semana entera, de lunes
// a domingo, parando a dormir. Se esta despierto de 08:00 a 22:00 —catorce
// horas utiles al dia— y el domingo la busqueda se acaba a las 20:00. Salen
// 96 horas en total.
//
// Con esos numeros, una partida perfecta (cuatro viajes y una investigacion por
// ciudad) cuesta 47 h y sobran unas 49. Da de sobra para investigar de mas, para
// fallar alguna pregunta y para equivocarse de ciudad un par de veces, pero no
// para ir probando ciudades a lo tonto: cada error cuesta la ida y la vuelta.

const TIEMPO = {
  investigar: 3,
  viaje: 8,
  viajeLondres: 12,
  amanecer: 8,
  anochecer: 22,
  finDelDomingo: 20
};

const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

function horasUtilesDe(indiceDia) {
  return indiceDia < 6
    ? TIEMPO.anochecer - TIEMPO.amanecer
    : TIEMPO.finDelDomingo - TIEMPO.amanecer;
}

const TIEMPO_TOTAL = DIAS.reduce(function(acc, _, i){ return acc + horasUtilesDe(i); }, 0);

function relojDesdeHoras(gastadas) {
  let resto = gastadas;
  for (let d = 0; d < DIAS.length; d++) {
    const cupo = horasUtilesDe(d);
    if (resto < cupo) {
      const h = TIEMPO.amanecer + resto;
      return { dia: DIAS[d], hora: (h < 10 ? "0" : "") + h + ":00" };
    }
    resto -= cupo;
  }
  return { dia: "Domingo", hora: TIEMPO.finDelDomingo + ":00" };
}

function horasRestantes() {
  return Math.max(0, TIEMPO_TOTAL - state.horasGastadas);
}

function costeViaje(desde, hasta) {
  return (desde === "Londres" || hasta === "Londres") ? TIEMPO.viajeLondres : TIEMPO.viaje;
}

function pintarReloj() {
  const barra = document.getElementById("reloj");
  if (state.gameState === "start") {
    barra.classList.add("hidden");
    return;
  }
  barra.classList.remove("hidden");
  const r = relojDesdeHoras(state.horasGastadas);
  const quedan = horasRestantes();
  barra.innerHTML =
    '<span>🕗 ' + r.dia + ', ' + r.hora + '</span>' +
    '<span class="reloj-resto' + (quedan <= 16 ? ' apurado' : '') + '">Quedan ' + quedan + ' h</span>';
}

// Devuelve true si con este gasto se acaba el tiempo.
function gastarTiempo(horas) {
  state.horasGastadas += horas;
  pintarReloj();
  if (state.horasGastadas >= TIEMPO_TOTAL) {
    state.gameState = "perdido";
    return true;
  }
  return false;
}

const state = {
  currentCity: "Madrid",
  discovered: [],
  secretRoute: [],
  routeIndex: 0,
  activePlaces: {},
  donePlaces: {},
  legendario: null,
  gameState: "start",
  placePokemon: {},
  usedHintsByCity: {},
  horasGastadas: 0,
  destinos: [],
  pistasCiudad: {},
  volverA: null,
  costeVuelta: 0,
  musicEnabled: false,
  modo: "clasico",
  curso: null,
  tema: null
};

let activePlace = null;
let activePI = null;

function shuffle(arr){
  const copy = arr.slice();
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function pick3Places(cityKey) {
  return shuffle(CITY_POOL[cityKey].places).slice(0, 3);
}

function chooseQuestion(place) {
  if (!place.questions || !place.questions.length) return null;
  return place.questions[Math.floor(Math.random() * place.questions.length)];
}

function generateRoute() {
  const finals = ["Barcelona","Santiago de Compostela","Salamanca","Girona","Valencia"];
  const others = Object.keys(CITY_POOL).filter(function(c){
    return c !== "Madrid" && c !== "Londres" && finals.indexOf(c) === -1;
  });
  const finalCity = finals[Math.floor(Math.random() * finals.length)];
  const includeLondon = Math.random() < 0.35;
  let middle = shuffle(others).slice(0, includeLondon ? 2 : 3);
  if (includeLondon) {
    middle.splice(Math.floor(Math.random() * (middle.length + 1)), 0, "Londres");
  }
  return ["Madrid"].concat(middle).concat([finalCity]);
}

function placeKey(cityKey, placeIndex) {
  return cityKey + "__" + placeIndex;
}

function assignRandomPokemonToPlaces() {
  state.placePokemon = {};
  const needed = state.secretRoute.reduce(function(acc, cityKey){
    return acc + state.activePlaces[cityKey].length;
  }, 0);

  let pool = shuffle(RANDOM_POKEMON_POOL);
  while (pool.length < needed) {
    pool = pool.concat(shuffle(RANDOM_POKEMON_POOL));
  }

  let cursor = 0;
  state.secretRoute.forEach(function(cityKey){
    state.activePlaces[cityKey].forEach(function(_, i){
      state.placePokemon[placeKey(cityKey, i)] = pool[cursor++];
    });
  });
}

function getAssignedPokemon(cityKey, placeIndex) {
  return state.placePokemon[placeKey(cityKey, placeIndex)];
}

// Tres destinos y solo tres, como en Carmen Sandiego: el bueno y dos senuelos.
// No se cuelan las ciudades por las que ya se ha pasado, porque encontrarse un
// "sin senal" en una de ellas seria confuso.
function calcularDestinos() {
  const correcta = getNextRouteCity();
  if (!correcta) {
    state.destinos = [];
    return;
  }
  const yaVistas = state.secretRoute.slice(0, state.routeIndex + 1);
  const senuelos = shuffle(Object.keys(CITY_POOL).filter(function(c){
    return c !== correcta && yaVistas.indexOf(c) === -1;
  })).slice(0, 2);
  state.destinos = shuffle([correcta].concat(senuelos));
}

function getNextRouteCity() {
  return state.secretRoute[state.routeIndex + 1] || null;
}

function isFinalRouteCity(cityKey) {
  return cityKey === state.secretRoute[state.secretRoute.length - 1] &&
         cityKey === state.secretRoute[state.routeIndex];
}

function getHintForCurrentCity() {
  const nextCity = getNextRouteCity();
  if (!nextCity) return "El rastro se vuelve difuso por un instante...";
  const clues = HINTS[nextCity] || ["El rastro se mueve a una ciudad desconocida..."];

  if (!state.usedHintsByCity[state.currentCity]) {
    state.usedHintsByCity[state.currentCity] = [];
  }

  const used = state.usedHintsByCity[state.currentCity];
  const available = clues.filter(function(clue){
    return used.indexOf(clue) === -1;
  });

  const source = available.length > 0 ? available : clues;
  const chosen = source[Math.floor(Math.random() * source.length)];
  used.push(chosen);
  return chosen;
}

function playTrack(trackKey, loop) {
  const btn = document.getElementById("musicBtn");
  const track = CHIPTUNE[trackKey];

  if (!track) return;
  if (!state.musicEnabled) return;
  if (musicTrackKey === trackKey && musicTimer) return;

  if (!ensureAudioCtx()) {
    btn.textContent = "⚠️ Sin audio";
    return;
  }

  stopMusic();
  musicTrackKey = trackKey;
  musicLooping = (typeof loop === "boolean") ? loop : track.loop;
  musicStep = 0;
  musicNextTime = audioCtx.currentTime + 0.08;
  musicScheduler();
  musicTimer = window.setInterval(musicScheduler, 120);
  btn.textContent = "🔊 Música ON";
}

function stopMusic() {
  if (musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  }
  musicTrackKey = null;
  musicStep = 0;
  // Quedan notas programadas por delante del reloj de audio, asi que hay que
  // cortarlas a mano o se seguirian oyendo medio segundo despues de parar.
  killVoices();
}

function getCurrentMusicContext() {
  if (state.gameState === "win") return "legend";
  if (activePlace) return "battle";
  return "city";
}

function updateRouteBar() {
  const bar = document.getElementById("rp");
  if (state.gameState === "start") {
    bar.style.display = "none";
    return;
  }

  bar.style.display = "flex";
  bar.innerHTML = '<span style="color:rgba(255,255,255,.45);font-size:.6rem;font-weight:900;flex-shrink:0;margin-right:3px">RUTA:</span>';

  state.secretRoute.forEach(function(c, i){
    if (i > 0) {
      const a = document.createElement("span");
      a.className = "rarr";
      a.textContent = "▶";
      bar.appendChild(a);
    }

    const d = document.createElement("div");
    if (i < state.routeIndex) {
      d.className = "rdot visited";
      d.textContent = CITY_POOL[c].emoji;
    } else if (i === state.routeIndex) {
      d.className = "rdot current";
      d.textContent = CITY_POOL[c].emoji;
    } else {
      d.className = "rdot unknown";
      d.textContent = "?";
    }
    d.title = c;
    bar.appendChild(d);
  });
}

// Cuantos Pokemon quedan de verdad por encontrar en esta ruta: uno por cada
// monumento sin resolver, y en la ciudad final solo el legendario, porque basta
// resolver un sitio para acabar la partida.
function pokemonPorDescubrir() {
  if (!state.secretRoute.length) return 6;
  let quedan = 0;
  state.secretRoute.forEach(function(c, i){
    const sitios = state.activePlaces[c] || [];
    const hechos = state.donePlaces[c] ? state.donePlaces[c].size : 0;
    if (i === state.secretRoute.length - 1) {
      quedan += hechos > 0 ? 0 : 1;
    } else {
      quedan += Math.max(0, sitios.length - hechos);
    }
  });
  return quedan;
}

function updatePokedex() {
  const dex = document.getElementById("pdx");
  dex.innerHTML = "";

  state.discovered.forEach(function(name){
    const s = document.createElement("div");
    s.className = "pslot found";
    s.textContent = "🔴 " + name;
    dex.appendChild(s);
  });

  // Antes los huecos se rellenaban con los primeros Pokemon del catalogo que
  // no se hubieran visto, asi que siempre salian seis y parecia que faltaban
  // seis concretos. Ahora hay tantos huecos como Pokemon queden de verdad.
  const quedan = pokemonPorDescubrir();
  for (let i = 0; i < quedan; i++) {
    const s = document.createElement("div");
    s.className = "pslot";
    s.textContent = "❓ ???";
    dex.appendChild(s);
  }
}

// Los sprites son lo unico que el juego pide por red. Si no llegan, en vez de
// dejar un hueco roto justo donde va el Pokemon se pone una Poke Ball dibujada
// aqui mismo. Se cuelga de window porque la llama un onerror del HTML.
const SPRITE_RESERVA = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Ccircle%20cx='50'%20cy='50'%20r='46'%20fill='%23fff'%20stroke='%230A285F'%20stroke-width='5'/%3E%3Cpath%20d='M4%2050a46%2046%200%200%201%2092%200z'%20fill='%23CC0000'/%3E%3Crect%20x='4'%20y='45'%20width='92'%20height='10'%20fill='%230A285F'/%3E%3Ccircle%20cx='50'%20cy='50'%20r='16'%20fill='%23fff'%20stroke='%230A285F'%20stroke-width='5'/%3E%3Ccircle%20cx='50'%20cy='50'%20r='7'%20fill='%23FFDE00'%20stroke='%230A285F'%20stroke-width='3'/%3E%3C/svg%3E";

window.spriteDeReserva = function(img) {
  img.onerror = null;
  img.src = SPRITE_RESERVA;
};

function getCityImage(cityKey) {
  const city = CITY_POOL[cityKey];
  if (city && city.cityImg) return city.cityImg;
  return "";
}

function getPlaceImage(cityKey, placeName) {
  const city = CITY_POOL[cityKey];
  if (!city || !city.places) return "";
  const place = city.places.find(function(p){ return p.name === placeName; });
  if (place && place.img) return place.img;
  return "";
}

function buildSceneHtml(label, imageUrl, extraHtml) {
  let html = '';
  html += '<div class="scene">';
  if (imageUrl) {
    html += '<img class="scene-bg" src="' + imageUrl + '" alt="' + label + '" onerror="this.style.display=\'none\'">';
  }
  html += '<div class="scene-pattern"></div>';
  if (extraHtml) html += extraHtml;
  html += '<div class="scene-label">📍 ' + label + '</div>';
  html += '</div>';
  return html;
}

function renderScreen() {
  const screen = document.getElementById("screen");
  const city = CITY_POOL[state.currentCity];

  activePlace = null;
  activePI = null;
  playTrack("city", true);
  pintarReloj();

  document.getElementById("cb").textContent = city.country + " " + city.label;

  // La persecucion va solo hacia delante: o estas en la ciudad donde el rastro
  // esta caliente, o te has equivocado y solo cabe volver.
  const enLaPista = state.currentCity === state.secretRoute[state.routeIndex];

  let html = '';
  const citySceneLabel = city.label.replace(/\(.*\)/,'').trim();
  html += buildSceneHtml(citySceneLabel, getCityImage(state.currentCity), '');
  html += '<div class="stext">' + city.welcome + '</div>';

  if (!enLaPista) {
    html += '<div class="wbox">';
    html += '<div style="font-size:1.3rem">🔍</div>';
    html += '<div style="font-weight:900;color:var(--red);font-size:.95rem;margin:5px 0">¡Sin señal de energía!</div>';
    html += '<div style="font-size:.88rem">La Smart-Rotom está en silencio. El legendario no ha pasado por aquí. Podéis dar una vuelta si queréis, pero el rastro bueno se enfría mientras tanto.</div>';
    html += '</div>';
    html += '<div class="opts">';
    state.activePlaces[state.currentCity].forEach(function(pl, i){
      html += '<button class="abtn" data-place="' + i + '">🔍 Investigar: ' + pl.name + '<span class="coste">' + TIEMPO.investigar + ' h</span></button>';
    });
    html += '</div>';
    html += '<span class="slbl">🛬 Aquí no hay nada que hacer:</span>';
    html += '<button class="sbtn" id="volverBtn">⬅️ Volver a ' + state.volverA + ' (' + state.costeVuelta + ' h)</button>';
  } else {
    const pistas = state.pistasCiudad[state.currentCity] || [];
    if (pistas.length) {
      html += '<div class="hbox">📡 <strong>' + (pistas.length === 1 ? "Pista conseguida aquí" : "Pistas conseguidas aquí") + ':</strong><br>' + pistas.join("<br><br>") + '</div>';
    }

    html += '<div class="opts">';
    state.activePlaces[state.currentCity].forEach(function(pl, i){
      const done = state.donePlaces[state.currentCity] && state.donePlaces[state.currentCity].has(i);
      if (done) {
        html += '<button class="abtn" disabled style="opacity:.5">✅ ' + pl.name + '</button>';
      } else {
        html += '<button class="abtn" data-place="' + i + '">🔍 Investigar: ' + pl.name + '<span class="coste">' + TIEMPO.investigar + ' h</span></button>';
      }
    });
    html += '</div>';

    if (!isFinalRouteCity(state.currentCity)) {
      html += '<span class="slbl">🛫 El rastro sigue. ¿Hacia dónde vamos?</span><div class="opts">';
      state.destinos.forEach(function(ck){
        const clase = (ck === "Londres") ? "lbtn" : "tbtn";
        html += '<button class="' + clase + '" data-city="' + ck + '">' + CITY_POOL[ck].emoji + ' ' + ck + '<span class="coste">' + costeViaje(state.currentCity, ck) + ' h</span></button>';
      });
      html += '</div>';
    }
  }

  screen.innerHTML = html;

  screen.querySelectorAll("[data-place]").forEach(function(btn){
    btn.addEventListener("click", function(){
      openPlace(Number(btn.getAttribute("data-place")));
    });
  });

  screen.querySelectorAll("[data-city]").forEach(function(btn){
    btn.addEventListener("click", function(){
      travelTo(btn.getAttribute("data-city"));
    });
  });

  const volver = document.getElementById("volverBtn");
  if (volver) volver.addEventListener("click", volverAtras);
}

function travelTo(city) {
  const origen = state.currentCity;
  const coste = costeViaje(origen, city);
  if (gastarTiempo(coste)) { showGameOver(); return; }

  const correcta = getNextRouteCity();
  state.currentCity = city;

  if (city === correcta) {
    state.routeIndex++;
    state.volverA = null;
    state.costeVuelta = 0;
    calcularDestinos();
    updateRouteBar();
  } else {
    // Ciudad equivocada: desde aqui no se sigue a ningun sitio, solo se vuelve,
    // y la vuelta cuesta lo mismo que costo venir.
    state.volverA = origen;
    state.costeVuelta = coste;
    // Los lugares de una ciudad fuera de ruta no se crean al empezar la
    // partida, asi que se preparan ahora: solo hacen falta los nombres.
    if (!state.activePlaces[city]) {
      state.activePlaces[city] = pick3Places(city).map(function(p){ return { name: p.name }; });
      state.donePlaces[city] = new Set();
    }
  }
  renderScreen();
}

function volverAtras() {
  if (gastarTiempo(state.costeVuelta)) { showGameOver(); return; }
  state.currentCity = state.volverA;
  state.volverA = null;
  state.costeVuelta = 0;
  renderScreen();
}

function openPlace(i) {
  const places = state.activePlaces[state.currentCity];
  if (!places || !places[i]) {
    renderScreen();
    return;
  }

  const pl = places[i];
  const yaResuelto = state.donePlaces[state.currentCity] && state.donePlaces[state.currentCity].has(i);
  if (yaResuelto) {
    renderScreen();
    return;
  }

  // Investigar cuesta lo mismo se encuentre algo o no.
  if (gastarTiempo(TIEMPO.investigar)) { showGameOver(); return; }

  const enLaPista = state.currentCity === state.secretRoute[state.routeIndex];
  if (!enLaPista) {
    // En una ciudad fuera de ruta no hay ni pregunta ni pista: solo se pierde
    // el rato, que es justo el castigo por no hacer caso a la pista.
    const scr = document.getElementById("screen");
    let html = '';
    html += buildSceneHtml(pl.name, getPlaceImage(state.currentCity, pl.name), '');
    html += '<div class="stext">Recorréis <strong>' + pl.name + '</strong> de arriba abajo y la Smart-Rotom no hace ni un ruido. Aquí no hay ni rastro del legendario.</div>';
    html += '<div class="hbox">⏳ Se os han ido ' + TIEMPO.investigar + ' horas y no habéis sacado nada en claro.</div>';
    html += '<button class="tbtn" id="backBtn">⬅️ Volver</button>';
    scr.innerHTML = html;
    document.getElementById("backBtn").addEventListener("click", renderScreen);
    return;
  }

  activePlace = pl;
  activePI = i;
  playTrack("battle", true);

  const finalBattle = isFinalRouteCity(state.currentCity);
  const assignedPokemon = getAssignedPokemon(state.currentCity, i);
  const pokeName = finalBattle ? state.legendario.name : assignedPokemon.name;
  const pokePid = finalBattle ? state.legendario.id : assignedPokemon.id;
  const pokeUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokePid + ".png";

  const scr = document.getElementById("screen");

  let html = '';
  const placeImage = getPlaceImage(state.currentCity, pl.name);
  html += buildSceneHtml(
    pl.name,
    placeImage,
    '<img class="poke-img" src="' + pokeUrl + '" alt="' + pokeName + '" onerror="spriteDeReserva(this)">' +
    '<div class="poke-badge">⚡ ' + pokeName + '</div>'
  );
  html += '<div class="stext">¡En el monumento <strong>' + pl.name + '</strong> divisáis movimiento!<br>¡Ha aparecido un <strong>' + pokeName + '</strong> salvaje! Demostrad vuestra sabiduría:</div>';
  html += '<div class="stext" style="background:#e6f0ff;border-color:var(--yellow)">❓ ' + pl.q + '</div>';
  html += '<div class="opts">';
  pl.opts.forEach(function(opt, idx){
    html += '<button data-answer="' + idx + '">' + opt + '</button>';
  });
  html += '<button class="tbtn" id="backBtn" style="margin-top:5px">⬅️ Volver</button>';
  html += '</div>';

  scr.innerHTML = html;

  scr.querySelectorAll("[data-answer]").forEach(function(btn){
    btn.addEventListener("click", function(){
      checkAns(Number(btn.getAttribute("data-answer")));
    });
  });

  document.getElementById("backBtn").addEventListener("click", renderScreen);
}

function checkAns(idx) {
  const mo = document.getElementById("modal");
  const mt = document.getElementById("mt");
  const mx = document.getElementById("mx");
  const finalBattle = isFinalRouteCity(state.currentCity);

  if (idx === activePlace.ans) {
    mt.textContent = "¡CORRECTO! 🎉";
    mt.className = "mt ok";

    if (!state.donePlaces[state.currentCity]) state.donePlaces[state.currentCity] = new Set();
    state.donePlaces[state.currentCity].add(activePI);

    const assignedPokemon = getAssignedPokemon(state.currentCity, activePI);
    const pokeName = finalBattle ? state.legendario.name : assignedPokemon.name;

    if (state.discovered.indexOf(pokeName) === -1) state.discovered.push(pokeName);
    updatePokedex();

    if (finalBattle) {
      mx.innerHTML = "🌟 ¡El imponente <strong>" + state.legendario.name + "</strong> desciende ante vosotros!<br><br>Asombrado por vuestra impecable cultura y conocimiento geográfico por toda España, ¡decide unirse voluntariamente a vuestro equipo!";
      state.gameState = "win";
    } else {
      // Se guarda el texto pelado: el rotulo "Pista" lo pone quien la muestra.
      // Las pistas se quedan luego a la vista en la pantalla de la ciudad, que
      // es lo que sustituye a poder volver a consultarlas mas tarde.
      const pista = getHintForCurrentCity();
      if (!state.pistasCiudad[state.currentCity]) state.pistasCiudad[state.currentCity] = [];
      state.pistasCiudad[state.currentCity].push(pista);
      mx.innerHTML = "📡 <strong>Pista:</strong> " + pista;
    }
  } else {
    mt.textContent = "¡FALLO! ❌";
    mt.className = "mt ko";
    // Fallar tiene que ensenar algo: se dice cual era la correcta y, cuando la
    // pregunta trae explicacion, tambien el por que. El castigo no es una multa
    // aparte: es que el monumento se queda sin resolver y volver a entrar
    // cuesta otra investigacion entera.
    let fallo = "Esa no era. La respuesta correcta es <strong>" + activePlace.opts[activePlace.ans] + "</strong>.";
    if (activePlace.exp) fallo += "<br><br>💡 " + activePlace.exp;
    fallo += "<br><br>El Pokémon se ha escapado sin soltar la pista. Podéis volver a investigar este monumento, pero os costará otras <strong>" + TIEMPO.investigar + " horas</strong>.";
    mx.innerHTML = fallo;
  }

  mo.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  if (state.gameState === "win") {
    showWin();
  } else if (state.gameState === "perdido") {
    showGameOver();
  } else {
    renderScreen();
  }
}

function showGameOver() {
  stopMusic();
  document.getElementById("modal").classList.add("hidden");
  pintarReloj();

  const scr = document.getElementById("screen");
  const ruta = state.secretRoute.map(function(c){
    return CITY_POOL[c].emoji + " <strong>" + c + "</strong>";
  }).join(" → ");

  let html = '';
  html += '<div class="stext" style="text-align:center;background:#fff5f5;border:3px solid var(--red);border-left:3px solid var(--red)">';
  html += '<div style="font-size:.95rem;color:var(--red);margin-bottom:12px;line-height:1.6;font-weight:900">⏰ ¡SE ACABÓ LA SEMANA!</div>';
  html += '<p>Ha llegado el domingo por la tarde y <strong>' + state.legendario.name + '</strong> ha vuelto a escapar. La Smart-Rotom se queda sin batería.</p>';
  html += '<div style="background:#fff;border-radius:10px;padding:11px;margin:10px 0;font-size:.82rem;line-height:2.1">La ruta que estaba siguiendo era:<br>' + ruta + '</div>';
  html += '<p style="font-size:.85rem">Con las pistas da tiempo de sobra: cada una dice a qué ciudad hay que ir. Lo que se come el reloj es viajar a la ciudad equivocada.</p>';
  html += '</div>';
  html += '<button class="sbtn" id="restartBtn">🔄 INTENTARLO OTRA VEZ</button>';

  scr.innerHTML = html;
  document.getElementById("cb").textContent = "⏰ Se acabó el tiempo";
  document.getElementById("restartBtn").addEventListener("click", restartGame);
}

function showWin() {
  playTrack("legend", false);

  const scr = document.getElementById("screen");
  const routeStr = state.secretRoute.map(function(c){
    return CITY_POOL[c].emoji + " <strong>" + c + "</strong>";
  }).join(" → ");
  // La familia esta repartida por el mapa, pero no se anuncia al empezar la
  // partida a proposito: la gracia es encontrarselos al llegar a su ciudad.
  // Aqui, ya ganada, se celebra con los que estaban en la ruta.
  const FAMILIA = [
    { ciudad:"Madrid",  texto:"👵👴 ¡Los abuelos Elena y Juanchu os esperan en Madrid con la merienda preparada!" },
    { ciudad:"Sevilla", texto:"💃 ¡Sofía, Juan y Auxi lo celebran por todo lo alto en Sevilla!" },
    { ciudad:"Cádiz",   texto:"⚓ ¡El primo Andrés dice que ya se lo olía, desde Cádiz!" },
    { ciudad:"Huelva",  texto:"⛵ ¡Los abuelos Andrés y Felisa lo celebran en Huelva como se merece!" },
    { ciudad:"Londres", texto:"🇬🇧 ¡Eduardo Jr. celebra vuestro triunfo transfronterizo desde Londres!" }
  ];

  let html = '';
  html += '<div class="stext" style="text-align:center;background:#fff9db;border:3px solid var(--yellow);border-left:3px solid var(--yellow)">';
  html += '<div style="font-size:.95rem;color:var(--red);margin-bottom:12px;line-height:1.6;font-weight:900">🏆 ¡MAESTROS DE LA GEOGRAFÍA! 🏆</div>';
  html += '<p>¡Habéis descubierto la ruta secreta y capturado a <strong>' + state.legendario.name + '</strong>!</p>';
  html += '<div style="background:#fff;border-radius:10px;padding:11px;margin:10px 0;font-size:.82rem;line-height:2.1">La ruta aleatoria resuelta ha sido:<br>' + routeStr + '</div>';
  const fin = relojDesdeHoras(Math.min(state.horasGastadas, TIEMPO_TOTAL - 1));
  html += '<p style="font-size:.85rem">🕗 Le echasteis <strong>' + state.horasGastadas + ' horas</strong>: cazado el <strong>' + fin.dia.toLowerCase() + ' a las ' + fin.hora + '</strong>, con ' + horasRestantes() + ' h de margen.</p>';
  FAMILIA.forEach(function(f){
    if (state.secretRoute.indexOf(f.ciudad) !== -1) {
      html += '<p style="color:#1a237e;font-weight:900">' + f.texto + '</p>';
    }
  });
  html += '<br><strong style="font-size:1rem">¡Enhorabuena, vuestro mapa está completo!</strong>';
  html += '</div>';
  html += '<button class="sbtn" id="restartBtn">🔄 NUEVA RUTA ALEATORIA</button>';

  scr.innerHTML = html;
  document.getElementById("cb").textContent = "🏆 ¡VICTORIA!";
  document.getElementById("restartBtn").addEventListener("click", restartGame);
}

// Todas las preguntas, vengan del monumento o del temario, traen la respuesta
// correcta en la posicion 0, asi que hay que barajar las opciones aqui: si no,
// se gana la partida entera pulsando siempre el primer boton.
function prepararPregunta(pregunta, nombreLugar) {
  const correctText = pregunta.opts[pregunta.ans];
  const mixedOpts = shuffle(pregunta.opts);
  return {
    name: nombreLugar,
    q: pregunta.q,
    opts: mixedOpts,
    ans: mixedOpts.indexOf(correctText),
    exp: pregunta.exp || ""
  };
}

// En modo repaso las preguntas salen del tema elegido, no del monumento. Se
// prepara una bolsa barajada y se va repartiendo; si el tema tiene menos
// preguntas de las que pide la partida, se encadenan barajadas otra vez, que
// es lo mismo que se hace con los Pokemon.
function construirBolsaRepaso(necesarias) {
  const preguntas = preguntasDelTema();
  if (!preguntas.length) return [];
  let bolsa = shuffle(preguntas);
  while (bolsa.length < necesarias) {
    bolsa = bolsa.concat(shuffle(preguntas));
  }
  return bolsa;
}

function setupPlacesForGame() {
  const esRepaso = state.modo === "repaso";
  const necesarias = state.secretRoute.length * 3;
  const bolsa = esRepaso ? construirBolsaRepaso(necesarias) : [];
  let cursor = 0;

  state.secretRoute.forEach(function(c){
    const selectedPlaces = pick3Places(c).map(function(place){
      const origen = esRepaso ? bolsa[cursor++] : chooseQuestion(place);
      return prepararPregunta(origen, place.name);
    });
    state.activePlaces[c] = selectedPlaces;
    state.donePlaces[c] = new Set();
  });
}

function startGame() {
  // La pantalla de temas solo ofrece los que tienen preguntas, pero si aun asi
  // el tema elegido se quedara vacio se juega en clasico antes que reventar.
  if (state.modo === "repaso" && preguntasDelTema().length === 0) {
    state.modo = "clasico";
    state.curso = null;
    state.tema = null;
  }

  state.secretRoute = generateRoute();
  state.routeIndex = 0;
  state.currentCity = "Madrid";
  state.discovered = [];
  state.donePlaces = {};
  state.activePlaces = {};
  state.placePokemon = {};
  state.usedHintsByCity = {};
  state.horasGastadas = 0;
  state.pistasCiudad = {};
  state.volverA = null;
  state.costeVuelta = 0;
  state.gameState = "explore";

  setupPlacesForGame();
  assignRandomPokemonToPlaces();
  calcularDestinos();
  state.legendario = LEGENDARIOS[Math.floor(Math.random() * LEGENDARIOS.length)];
  updatePokedex();
  updateRouteBar();
  actualizarBadgeModo();
  pintarReloj();
  renderScreen();
}

function restartGame() {
  state.secretRoute = [];
  state.routeIndex = 0;
  state.currentCity = "Madrid";
  state.discovered = [];
  state.activePlaces = {};
  state.donePlaces = {};
  state.placePokemon = {};
  state.usedHintsByCity = {};
  state.horasGastadas = 0;
  state.destinos = [];
  state.pistasCiudad = {};
  state.volverA = null;
  state.costeVuelta = 0;
  state.gameState = "start";
  state.legendario = null;
  activePlace = null;
  activePI = null;

  stopMusic();
  pintarReloj();

  document.getElementById("rp").style.display = "none";
  document.getElementById("cb").textContent = "—";
  document.getElementById("musicBtn").textContent = state.musicEnabled ? "🔊 Música ON" : "🔇 Música OFF";
  updatePokedex();

  state.modo = "clasico";
  state.curso = null;
  state.tema = null;
  actualizarBadgeModo();

  renderMenuInicio();
}

// Pantalla 1: a que se juega.
//
// A proposito NO se dice aqui quien vive en cada ciudad: la gracia es que
// aparezcan por sorpresa al llegar. Solo se avisa de que hay familia por ahi.
function renderMenuInicio() {
  const scr = document.getElementById("screen");
  let html = '';
  html += '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:8px">';
  html += '<h2 style="font-size:.95rem;color:var(--blue);margin-bottom:12px;line-height:1.6">🔴 ¡AVENTURA GEOGRÁFICA v' + VERSION + '!</h2>';
  html += '<div class="tcard">🧳 <strong>Un Pokémon Clandestino huye de nuevo</strong>. La Smart-Rotom ha detectado una ruta encriptada de <strong>5 ciudades</strong>. Tendréis que seguir pistas, visitar monumentos, responder preguntas y descubrir dónde se esconde el legendario antes de que vuelva a escapar.</div>';
  html += '<div class="tcard">⏰ <strong>Tenéis una semana</strong>, de lunes a domingo, parando a dormir: ' + TIEMPO_TOTAL + ' horas para atraparlo. Investigar un monumento cuesta <strong>' + TIEMPO.investigar + ' h</strong> y cada viaje <strong>' + TIEMPO.viaje + ' h</strong>, más si hay que cruzar el mar. Equivocarse de ciudad se paga a la ida <em>y</em> a la vuelta, así que haced caso a las pistas.</div>';
  html += '<div class="tcard dark">👀 Atentos por el camino: <strong style="color:#ffcc00">hay familia repartida por el mapa</strong>, y no os vamos a decir dónde. Ya aparecerán.</div>';
  html += '<span class="slbl">¿A qué jugamos?</span>';
  html += '<button class="sbtn" id="btnClasico">🗺️ MODO CLÁSICO</button>';
  html += '<div class="submenu-nota">Preguntas sobre los monumentos de cada ciudad.</div>';
  html += '<button class="sbtn" id="btnRepaso">📚 MODO REPASO</button>';
  html += '<div class="submenu-nota">La misma aventura, con las mismas ciudades y las mismas pistas, pero las preguntas son del temario del colegio.</div>';
  if (!hayAlgoQueRepasar()) {
    html += '<div class="hbox" style="margin-top:4px">De momento no hay ningún tema cargado para repasar. En cuanto se añadan aparecerán aquí, ordenados por curso.</div>';
  }
  html += '</div>';
  scr.innerHTML = html;

  document.getElementById("btnClasico").addEventListener("click", function(){
    state.modo = "clasico";
    state.curso = null;
    state.tema = null;
    startGame();
  });
  document.getElementById("btnRepaso").addEventListener("click", renderSeleccionCurso);
}

// Pantalla 2: de que curso.
function renderSeleccionCurso() {
  const scr = document.getElementById("screen");
  let html = '';
  html += '<div style="padding:8px">';
  html += '<div class="tcard">📚 <strong>Modo repaso.</strong> Elegid primero el curso y después el tema. Todas las preguntas de la partida saldrán de ese tema.</div>';
  html += '<span class="slbl">¿De qué curso?</span>';
  html += '<div class="opts">';
  CURSOS.forEach(function(c){
    const n = temasDelCurso(c.id).length;
    if (n > 0) {
      html += '<button class="abtn" data-curso="' + c.id + '">' + c.nombre + ' · ' + n + (n === 1 ? ' tema' : ' temas') + '</button>';
    } else {
      html += '<button class="tbtn" disabled style="opacity:.5">' + c.nombre + ' · sin temas todavía</button>';
    }
  });
  html += '</div>';
  html += '<button class="tbtn" id="btnVolver" style="margin-top:8px">⬅️ Volver</button>';
  html += '</div>';
  scr.innerHTML = html;

  scr.querySelectorAll("[data-curso]").forEach(function(btn){
    btn.addEventListener("click", function(){
      renderSeleccionTema(btn.getAttribute("data-curso"));
    });
  });
  document.getElementById("btnVolver").addEventListener("click", renderMenuInicio);
}

// Pantalla 3: que tema. Los botones guardan la posicion en la lista, no el
// nombre, para que un tema con comillas en el titulo no rompa el HTML.
function renderSeleccionTema(cursoId) {
  const scr = document.getElementById("screen");
  const temas = temasDelCurso(cursoId);
  let html = '';
  html += '<div style="padding:8px">';
  html += '<div class="tcard">📚 <strong>' + nombreCurso(cursoId) + '.</strong> ¿Qué toca repasar hoy?</div>';
  html += '<div class="opts">';
  temas.forEach(function(t, i){
    const n = BANCO_REPASO[cursoId][t].length;
    html += '<button class="abtn" data-tema="' + i + '">' + t + ' · ' + n + (n === 1 ? ' pregunta' : ' preguntas') + '</button>';
  });
  html += '</div>';
  html += '<button class="tbtn" id="btnVolver" style="margin-top:8px">⬅️ Volver</button>';
  html += '</div>';
  scr.innerHTML = html;

  scr.querySelectorAll("[data-tema]").forEach(function(btn){
    btn.addEventListener("click", function(){
      state.modo = "repaso";
      state.curso = cursoId;
      state.tema = temas[Number(btn.getAttribute("data-tema"))];
      startGame();
    });
  });
  document.getElementById("btnVolver").addEventListener("click", renderSeleccionCurso);
}

function actualizarBadgeModo() {
  const badge = document.getElementById("modo-badge");
  if (state.modo === "repaso" && state.tema) {
    badge.textContent = "📚 " + nombreCurso(state.curso) + " · " + state.tema;
    badge.classList.remove("hidden");
  } else {
    badge.textContent = "";
    badge.classList.add("hidden");
  }
}

function toggleMusic() {
  const btn = document.getElementById("musicBtn");

  if (!state.musicEnabled) {
    // El navegador solo deja crear el contexto de audio a partir de un gesto
    // del usuario, y pulsar este boton lo es. Las dos llamadas tienen que
    // salir de aqui: el promotor de sesion solo cuenta si arranca en el gesto.
    promoverSesionAudio();
    if (!ensureAudioCtx()) {
      btn.textContent = "⚠️ Sin audio";
      return;
    }
    state.musicEnabled = true;
    btn.textContent = "🔊 Música ON";

    const ctx = getCurrentMusicContext();
    playTrack(ctx, ctx !== "legend");
  } else {
    state.musicEnabled = false;
    stopMusic();
    pararPromotorSesion();
    btn.textContent = "🔇 Música OFF";
  }
}

// El sello de version, siempre a la vista: si no coincide con lo ultimo que se
// publico, el movil esta tirando de cache.
document.getElementById("ver").textContent = "v" + VERSION + " · " + VERSION_FECHA;

document.getElementById("modalBtn").addEventListener("click", closeModal);
document.getElementById("musicBtn").addEventListener("click", toggleMusic);
restartGame();
