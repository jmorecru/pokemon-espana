// Banco de pruebas del juego. Se pega al final del index.html y juega
// partidas enteras de verdad en el navegador.
//
// Se lanza con pruebas/correr.ps1, que lo inyecta, abre Edge sin ventana y
// muestra el resultado. Cada linea acaba en OK o en *** MAL ***.
(function(){
  const out = [];
  function log(s){ out.push(s); }
  function pantalla(){ return document.getElementById("screen").textContent; }
  function ok(cond){ return cond ? "OK" : "*** MAL ***"; }

  function responderBien(pregunta) {
    if (pregunta.tipo === "escribir") {
      document.getElementById("respuestaEscrita").value = pregunta.resp;
      checkEscrito();
    } else {
      checkAns(pregunta.ans);
    }
  }

  function partidaPerfecta() {
    let guard = 0;
    while (state.gameState === "explore" && guard++ < 30) {
      const ciudad = state.secretRoute[state.routeIndex];
      const sitios = state.activePlaces[ciudad];
      let resuelto = false;
      for (let i = 0; i < sitios.length && !resuelto; i++) {
        if (state.donePlaces[ciudad].has(i)) continue;
        openPlace(i);
        if (state.gameState !== "explore") return;
        responderBien(sitios[i]);
        closeModal();
        resuelto = true;
      }
      if (state.gameState !== "explore") return;
      const siguiente = getNextRouteCity();
      if (!siguiente) return;
      travelTo(siguiente);
    }
  }

  // Comprueba que un tema esta bien formado.
  function revisaTema(nombre, minimo) {
    const tema = BANCO_REPASO["5"][nombre];
    log("[" + nombre + "] cargado: " + (tema ? tema.length : 0) + " preguntas " + ok(!!tema && tema.length >= minimo));
    if (!tema) return;
    const tests = tema.filter(function(x){ return x.tipo !== "escribir"; });
    const escritas = tema.filter(function(x){ return x.tipo === "escribir"; });
    log("  de test " + tests.length + ", de escribir " + escritas.length);
    log("  las de test traen 3 opciones distintas y la buena primero: " +
        ok(tests.every(function(x){ return x.opts && x.opts.length === 3 && new Set(x.opts).size === 3 && x.ans === 0; })));
    log("  las de escribir traen respuesta e idioma: " +
        ok(escritas.every(function(x){ return !!x.resp && !!x.idioma; })));
    log("  todas traen explicación: " + ok(tema.every(function(x){ return !!x.exp; })));
    log("  ninguna repetida: " + ok(new Set(tema.map(function(x){ return x.q; })).size === tema.length));
    log("  ninguna lleva comillas dobles sueltas que rompan el HTML: " +
        ok(tema.every(function(x){ return (x.q + (x.exp||"")).indexOf('"') === -1; })));
  }

  function juegaTema(nombre, n) {
    let ganadas = 0, exc = 0, primera = "";
    for (let k = 0; k < n; k++) {
      try {
        restartGame();
        state.modo = "repaso"; state.curso = "5"; state.tema = nombre;
        startGame();
        partidaPerfecta();
        if (state.gameState === "win") ganadas++;
      } catch (e) { exc++; if (!primera) primera = e.message; }
    }
    log("[" + nombre + "] " + n + " partidas: ganadas=" + ganadas + " excepciones=" + exc +
        (primera ? " (" + primera + ")" : "") + " " + ok(ganadas === n && exc === 0));
  }

  try {
    // --- Los temas ----------------------------------------------------------
    log("temas de 5º: " + temasDelCurso("5").join(" | "));
    log("hay tres temas en 5º: " + ok(temasDelCurso("5").length === 3));
    revisaTema("Alemán: la casa y los muebles", 80);
    revisaTema("Alemán: los posesivos", 40);
    revisaTema("Science: Energy", 50);
    const ciencias = BANCO_REPASO["5"]["Science: Energy"];
    log("Science es todo tipo test, como pidió el usuario: " +
        ok(ciencias.every(function(x){ return x.tipo !== "escribir"; })));
    log("Science no pone kinetic y mechanical a competir en la misma pregunta: " +
        ok(ciencias.every(function(x){
          const o = x.opts.join(" ").toLowerCase();
          return !(o.indexOf("kinetic") > -1 && o.indexOf("mechanical") > -1);
        })));

    // --- Corrección de lo escrito -------------------------------------------
    log("alemán: Küche vale escrita sin diéresis: " + ok(respuestaEscritaCorrecta("die Kueche", "die Küche", [], "de")));
    log("alemán: gross vale por groß: " + ok(respuestaEscritaCorrecta("gross", "groß", [], "de")));
    log("alemán: otra palabra no cuela: " + ok(!respuestaEscritaCorrecta("das Bett", "die Küche", [], "de")));
    log("alemán: Whonzimmer se rechaza: " + ok(!respuestaEscritaCorrecta("das Whonzimmer", "das Wohnzimmer", [], "de")));
    log("posesivos: ihre no vale por ihr: " + ok(!respuestaEscritaCorrecta("ihre", "Ihr", [], "de")));
    log("posesivos: ihr vale aunque sea en minúscula: " + ok(respuestaEscritaCorrecta("ihr", "Ihr", [], "de")));
    log("se aceptan respuestas alternativas: " +
        ok(respuestaEscritaCorrecta("Chemical Energy", "chemical", ["chemical energy"], "en")));
    log("en inglés no se aplican las reglas del alemán (blue no es blu): " +
        ok(!respuestaEscritaCorrecta("blu", "blue", [], "en")));
    log("en alemán sí: " + ok(respuestaEscritaCorrecta("Tur", "Tür", [], "de")));

    // --- La pantalla de escribir y el aviso de grafía ------------------------
    BANCO_REPASO["5"]["Prueba"] = [
      { tipo:"escribir", idioma:"en", q:"PREGUNTA EN", resp:"chemical", acepta:["chemical energy"], pista:"P", exp:"E" }
    ];
    restartGame();
    state.modo = "repaso"; state.curso = "5"; state.tema = "Prueba";
    startGame();
    openPlace(0);
    const campo = document.getElementById("respuestaEscrita");
    log("en inglés el campo dice Type your answer here: " + ok(campo.placeholder === "Type your answer here"));
    log("y lleva lang=en: " + ok(campo.getAttribute("lang") === "en"));
    campo.value = "Chemical energy";
    checkEscrito();
    const txt = document.getElementById("mx").textContent;
    log("una alternativa válida en inglés no da la lata con 'Se escribe': " + ok(txt.indexOf("Se escribe") === -1));
    closeModal();
    delete BANCO_REPASO["5"]["Prueba"];

    BANCO_REPASO["5"]["Prueba"] = [
      { tipo:"escribir", idioma:"de", q:"PREGUNTA DE", resp:"der Tisch", pista:"P", exp:"E" }
    ];
    restartGame();
    state.modo = "repaso"; state.curso = "5"; state.tema = "Prueba";
    startGame();
    openPlace(0);
    log("en alemán el campo sigue en español: " + ok(document.getElementById("respuestaEscrita").placeholder === "Escribe aquí tu respuesta"));
    document.getElementById("respuestaEscrita").value = "der tisch";
    checkEscrito();
    log("en alemán sí avisa de la mayúscula del sustantivo: " +
        ok(document.getElementById("mx").textContent.indexOf("Se escribe der Tisch") !== -1));
    closeModal();
    delete BANCO_REPASO["5"]["Prueba"];

    // --- Partidas enteras con cada tema ----------------------------------------
    juegaTema("Alemán: la casa y los muebles", 25);
    juegaTema("Alemán: los posesivos", 25);
    juegaTema("Science: Energy", 25);

    // --- Lo de siempre no se ha roto -------------------------------------------
    let ganadasC = 0, excC = 0;
    for (let n = 0; n < 40; n++) {
      try {
        restartGame(); state.modo = "clasico"; startGame(); partidaPerfecta();
        if (state.gameState === "win") ganadasC++;
      } catch (e) { excC++; }
    }
    log("40 partidas clásicas: ganadas=" + ganadasC + " excepciones=" + excC + " " + ok(ganadasC === 40 && excC === 0));
    restartGame();
    log("el menú no destripa a la familia: " +
        ok(["Andrés","Eduardo","Sofía","Elena","Juanchu","Felisa"].every(function(n){ return pantalla().indexOf(n) === -1; })));
    document.getElementById("btnClasico").click();
    log("el mapa se dibuja: " + ok(!!document.querySelector("#mapa svg")));
    log("el reloj sigue en 96 h: " + ok(TIEMPO_TOTAL === 96));
    log("las pistas siguen siendo 6 por ciudad: " +
        ok(Object.keys(HINTS).every(function(c){ return HINTS[c].length === 6; })));
  } catch (e) {
    log("EXCEPCION GLOBAL: " + e.message + " | " + e.stack);
  }

  const div = document.createElement("div");
  div.id = "resultado-prueba";
  div.textContent = out.join("\n");
  document.body.appendChild(div);
})();
