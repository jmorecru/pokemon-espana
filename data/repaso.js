// El banco de preguntas del modo repaso, por curso y tema. Este es el
// fichero que se toca para anadir temario.

// ---------------------------------------------------------------------------
// Modo repaso: el mismo juego de siempre —mismas ciudades, misma ruta secreta,
// mismas pistas— pero las preguntas salen del temario del colegio en vez de
// los monumentos. El monumento pasa a ser solo el escenario.
//
// Para anadir un tema basta con pegarlo aqui dentro del curso que toque, con
// el mismo formato que las preguntas del CITY_POOL: tres opciones, la correcta
// siempre en primer lugar (el juego las baraja al empezar cada partida) y una
// explicacion opcional que se muestra al fallar. Por ejemplo:
//
//   "5": {
//     "El sistema solar": [
//       { q:"¿Cuál es el planeta más cercano al Sol?",
//         opts:["Mercurio","Venus","La Tierra"], ans:0,
//         exp:"Mercurio es el primero de los ocho planetas y también el más pequeño." }
//     ]
//   }
//
// Un tema funciona con las preguntas que tenga: si son menos de las 15 que
// pide una partida, se repiten barajadas.

const CURSOS = [
  { id:"1", nombre:"1º de Primaria" },
  { id:"3", nombre:"3º de Primaria" },
  { id:"5", nombre:"5º de Primaria" }
];

const BANCO_REPASO = {
  "1": {},
  "3": {},
  "5": {}
};

function temasDelCurso(cursoId) {
  const temas = BANCO_REPASO[cursoId] || {};
  return Object.keys(temas).filter(function(t){
    return temas[t] && temas[t].length > 0;
  });
}

function hayAlgoQueRepasar() {
  return CURSOS.some(function(c){ return temasDelCurso(c.id).length > 0; });
}

function nombreCurso(cursoId) {
  const c = CURSOS.filter(function(x){ return x.id === cursoId; })[0];
  return c ? c.nombre : cursoId;
}

function preguntasDelTema() {
  const curso = BANCO_REPASO[state.curso];
  if (!curso) return [];
  return curso[state.tema] || [];
}
