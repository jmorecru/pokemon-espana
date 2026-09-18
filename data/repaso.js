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
//
// REGLA IMPORTANTE al escribir un tema de idiomas: no se puede usar ni una
// palabra que no venga en los apuntes, ni siquiera como opcion equivocada. Si
// se cuela vocabulario sin estudiar, el juego deja de ser repaso y se convierte
// en un examen de algo que no han dado.

const CURSOS = [
  { id:"1", nombre:"1º de Primaria" },
  { id:"3", nombre:"3º de Primaria" },
  { id:"5", nombre:"5º de Primaria" }
];

const BANCO_REPASO = {
  "1": {},
  "3": {},

  "5": {
    // Alemán, unidad 7 (Mein Haus, meine Stadt). Salido de tres páginas de
    // apuntes: el vocabulario de la casa, las habitaciones con su preposicion,
    // los muebles y los textos de Ben, Daniel y Anna.
    //
    // Todo el aleman que aparece aqui esta en esas paginas. Las opciones
    // equivocadas tambien: no hay ni una palabra que no hayan dado.
    "Alemán: la casa y los muebles": [

      // --- Las partes de la casa -----------------------------------------
      { q:"¿Qué significa <strong>das Haus</strong>?",
        opts:["La casa","La habitación","El jardín"], ans:0,
        exp:"Das Haus es la casa entera. Una habitación suelta es das Zimmer." },
      { q:"¿Qué significa <strong>das Fenster</strong>?",
        opts:["La ventana","La puerta","El jardín"], ans:0,
        exp:"Das Fenster es la ventana. La puerta es die Tür." },
      { q:"¿Qué significa <strong>die Tür</strong>?",
        opts:["La puerta","La ventana","La casa"], ans:0,
        exp:"Die Tür es la puerta, y es de las pocas de esta unidad que llevan die." },
      { q:"¿Qué significa <strong>der Garten</strong>?",
        opts:["El jardín","El balcón","La casa"], ans:0,
        exp:"Der Garten es el jardín. El balcón es der Balkon, que se parece mucho al español." },
      { q:"¿Cómo se dice <strong>la ventana</strong> en alemán?",
        opts:["das Fenster","die Tür","das Bild"], ans:0,
        exp:"Das Fenster. Cuidado con das Bild, que es el cuadro y también se cuelga en la pared." },
      { q:"¿Cómo se dice <strong>el jardín</strong> en alemán?",
        opts:["der Garten","der Balkon","das Haus"], ans:0,
        exp:"Der Garten. En el libro los hobbits juegan a la pelota im Garten." },

      // --- Las habitaciones ----------------------------------------------
      { q:"¿Qué significa <strong>die Küche</strong>?",
        opts:["La cocina","El comedor","El cuarto de baño"], ans:0,
        exp:"Die Küche es la cocina, donde los hobbits kochen." },
      { q:"¿Qué significa <strong>das Wohnzimmer</strong>?",
        opts:["El salón","El dormitorio","La cocina"], ans:0,
        exp:"Das Wohnzimmer viene de wohnen, vivir: es el cuarto donde se hace vida." },
      { q:"¿Qué significa <strong>das Schlafzimmer</strong>?",
        opts:["El dormitorio","El salón","El comedor"], ans:0,
        exp:"Das Schlafzimmer viene de schlafen, dormir. Por eso los hobbits que schlafen están ahí." },
      { q:"¿Qué significa <strong>das Esszimmer</strong>?",
        opts:["El comedor","La cocina","El cuarto de baño"], ans:0,
        exp:"Das Esszimmer es el comedor: el cuarto donde se come. La cocina, donde se guisa, es die Küche." },
      { q:"¿Qué significa <strong>das Bad</strong>?",
        opts:["El cuarto de baño","El balcón","El dormitorio"], ans:0,
        exp:"Das Bad es el baño, donde los hobbits duschen. También se dice más largo: das Badezimmer." },
      { q:"¿Qué significa <strong>der Balkon</strong>?",
        opts:["El balcón","El jardín","La ventana"], ans:0,
        exp:"Der Balkon es el balcón. Se escribe casi igual que en español, pero con k." },
      { q:"¿Qué significa <strong>das Malzimmer</strong>?",
        opts:["El cuarto para pintar","El comedor","La cocina"], ans:0,
        exp:"Das Malzimmer viene de malen, pintar. Daniel dice ich male auch gern." },
      { q:"¿Qué significa <strong>das Sitzzimmer</strong>?",
        opts:["La sala de estar","El cuarto de baño","La cocina"], ans:0,
        exp:"Das Sitzzimmer es otra sala para estar sentado, parecida al Wohnzimmer. En el plano de la casa están las dos." },
      { q:"¿Cómo se dice <strong>la cocina</strong> en alemán?",
        opts:["die Küche","das Bad","das Esszimmer"], ans:0,
        exp:"Die Küche. Ojo con la diéresis: se escribe con ü, no con u." },
      { q:"¿Cómo se dice <strong>el dormitorio</strong> en alemán?",
        opts:["das Schlafzimmer","das Wohnzimmer","das Esszimmer"], ans:0,
        exp:"Das Schlafzimmer. Los tres acaban en -zimmer; lo que cambia es el principio." },
      { q:"¿Cómo se dice <strong>el cuarto de baño</strong> con la palabra corta?",
        opts:["das Bad","das Bett","der Balkon"], ans:0,
        exp:"Das Bad es la corta y das Badezimmer la larga. Cuidado con das Bett, que se parece pero es la cama." },

      // --- Los muebles ----------------------------------------------------
      { q:"¿Qué significa <strong>der Tisch</strong>?",
        opts:["La mesa","La silla","El armario"], ans:0,
        exp:"Der Tisch es la mesa. Anna dice que auf dem Tisch tiene sus lápices y una lámpara." },
      { q:"¿Qué significa <strong>der Stuhl</strong>?",
        opts:["La silla","La mesa","La cama"], ans:0,
        exp:"Der Stuhl es la silla. Va siempre con la mesa: der Tisch und der Stuhl." },
      { q:"¿Qué significa <strong>der Schrank</strong>?",
        opts:["El armario","La estantería","La cama"], ans:0,
        exp:"Der Schrank es el armario, el mueble cerrado. La estantería, con baldas a la vista, es das Regal." },
      { q:"¿Qué significa <strong>das Regal</strong>?",
        opts:["La estantería","El armario","La mesa"], ans:0,
        exp:"Das Regal es la estantería. En plural son die Regale." },
      { q:"¿Qué significa <strong>das Bett</strong>?",
        opts:["La cama","La lámpara","El cuadro"], ans:0,
        exp:"Das Bett es la cama. Ojo, que se parece a das Bad, el baño." },
      { q:"¿Qué significa <strong>die Lampe</strong>?",
        opts:["La lámpara","El cuadro","La silla"], ans:0,
        exp:"Die Lampe es la lámpara. La de leer es die Leselampe, de lesen, leer." },
      { q:"¿Qué significa <strong>das Bild</strong>?",
        opts:["El cuadro","La cama","La ventana"], ans:0,
        exp:"Das Bild es el cuadro o el dibujo. Daniel cuelga sus Bilder an der Wand, en la pared." },
      { q:"¿Qué significa <strong>der Computer</strong>?",
        opts:["El ordenador","El armario","La estantería"], ans:0,
        exp:"Der Computer es el ordenador, igual que en inglés. Ben dice ich spiele gern am Computer." },
      { q:"¿Qué significa <strong>der Schreibtisch</strong>?",
        opts:["El escritorio","El armario","La estantería"], ans:0,
        exp:"Der Schreibtisch es la mesa de estudio. Lleva dentro der Tisch, la mesa." },
      { q:"¿Qué significa <strong>der Teppich</strong>?",
        opts:["La alfombra","La lámpara","La pared"], ans:0,
        exp:"Der Teppich es la alfombra. En el libro sale una que es schön bunt, muy de colores." },
      { q:"¿Cómo se dice <strong>la cama</strong> en alemán?",
        opts:["das Bett","das Bild","das Regal"], ans:0,
        exp:"Das Bett. Los tres llevan das, así que hay que fijarse en la palabra entera." },
      { q:"¿Cómo se dice <strong>la silla</strong> en alemán?",
        opts:["der Stuhl","der Tisch","der Schrank"], ans:0,
        exp:"Der Stuhl. Los tres muebles llevan der." },
      { q:"¿Cómo se dice <strong>la estantería</strong> en alemán?",
        opts:["das Regal","der Schrank","der Tisch"], ans:0,
        exp:"Das Regal, con baldas a la vista. Der Schrank es el armario cerrado." },
      { q:"¿Cómo se dice <strong>la lámpara</strong> en alemán?",
        opts:["die Lampe","das Bild","der Stuhl"], ans:0,
        exp:"Die Lampe. Es de las pocas palabras de la unidad que llevan die." },

      // --- Der, die o das -------------------------------------------------
      { q:"¿Qué artículo lleva <strong>Haus</strong>?",
        opts:["das","der","die"], ans:0,
        exp:"Das Haus. En el libro viene subrayado junto a la foto de la casa." },
      { q:"¿Qué artículo lleva <strong>Tür</strong>?",
        opts:["die","der","das"], ans:0,
        exp:"Die Tür. En esta unidad solo llevan die la puerta y la lámpara." },
      { q:"¿Qué artículo lleva <strong>Garten</strong>?",
        opts:["der","die","das"], ans:0,
        exp:"Der Garten, igual que der Balkon: los dos sitios de fuera de la casa llevan der." },
      { q:"¿Qué artículo lleva <strong>Fenster</strong>?",
        opts:["das","der","die"], ans:0,
        exp:"Das Fenster, aunque la puerta que tiene al lado sea die Tür. No hay más remedio que aprendérselo." },
      { q:"¿Qué artículo lleva <strong>Lampe</strong>?",
        opts:["die","der","das"], ans:0,
        exp:"Die Lampe. Comparte el die con die Tür y die Küche." },
      { q:"¿Qué artículo lleva <strong>Bett</strong>?",
        opts:["das","der","die"], ans:0,
        exp:"Das Bett, igual que das Regal y das Bild." },
      { q:"¿Qué artículo lleva <strong>Stuhl</strong>?",
        opts:["der","die","das"], ans:0,
        exp:"Der Stuhl, como der Tisch y der Schrank." },
      { q:"¿Qué artículo lleva <strong>Regal</strong>?",
        opts:["das","der","die"], ans:0,
        exp:"Das Regal. En el libro los muebles vienen con el artículo subrayado justo por esto." },
      { q:"¿Qué artículo lleva <strong>Schrank</strong>?",
        opts:["der","die","das"], ans:0,
        exp:"Der Schrank." },
      { q:"¿Qué artículo llevan todas las habitaciones acabadas en <strong>-zimmer</strong>?",
        opts:["das","der","die"], ans:0,
        exp:"Todas das: das Wohnzimmer, das Schlafzimmer, das Esszimmer, das Malzimmer... porque das Zimmer es la habitación." },

      // --- Wo sind sie? Las preposiciones ---------------------------------
      { q:"<strong>Die Hobbits kochen. Wo sind sie?</strong>",
        opts:["in der Küche","im Bad","im Garten"], ans:0,
        exp:"Kochen es cocinar, así que están in der Küche. Ojo: la cocina lleva in der y no im." },
      { q:"<strong>Die Hobbits schlafen. Wo sind sie?</strong>",
        opts:["im Schlafzimmer","in der Küche","auf dem Balkon"], ans:0,
        exp:"Schlafen es dormir, y el cuarto de dormir es das Schlafzimmer: im Schlafzimmer." },
      { q:"<strong>Die Hobbits duschen. Wo sind sie?</strong>",
        opts:["im Bad","im Wohnzimmer","im Esszimmer"], ans:0,
        exp:"Duschen es ducharse, así que están im Bad." },
      { q:"<strong>Die Hobbits spielen Ball. Wo sind sie?</strong>",
        opts:["im Garten","im Bad","im Schlafzimmer"], ans:0,
        exp:"A la pelota se juega fuera: im Garten." },
      { q:"<strong>Die Hobbits machen Musik. Wo sind sie?</strong>",
        opts:["im Wohnzimmer","in der Küche","im Bad"], ans:0,
        exp:"Tocan música en el salón: im Wohnzimmer." },
      { q:"<strong>Die Hobbits lesen ein Buch. Wo sind sie?</strong>",
        opts:["auf dem Balkon","im Bad","in der Küche"], ans:0,
        exp:"Están leyendo fuera, en el balcón. El balcón es el único que lleva auf dem y no im." },
      { q:"¿Cuál de estas tres se dice de otra manera, sin <strong>im</strong>?",
        opts:["die Küche","das Bad","der Garten"], ans:0,
        exp:"Se dice in der Küche. Las otras dos van con im: im Bad e im Garten." },

      // --- Los verbos de la unidad ----------------------------------------
      { q:"¿Qué significa <strong>kochen</strong>?",
        opts:["Cocinar","Dormir","Leer"], ans:0,
        exp:"Kochen es cocinar, y se hace in der Küche." },
      { q:"¿Qué significa <strong>schlafen</strong>?",
        opts:["Dormir","Cocinar","Ducharse"], ans:0,
        exp:"Schlafen es dormir. Se ve en das Schlafzimmer, el cuarto de dormir." },
      { q:"¿Qué significa <strong>duschen</strong>?",
        opts:["Ducharse","Dormir","Jugar"], ans:0,
        exp:"Duschen es ducharse, y se hace im Bad." },
      { q:"¿Qué significa <strong>lesen</strong>?",
        opts:["Leer","Cocinar","Pintar"], ans:0,
        exp:"Lesen es leer. Daniel dice ich lese sehr gern: leo muy a gusto." },
      { q:"¿Qué significa <strong>malen</strong>?",
        opts:["Pintar","Leer","Dormir"], ans:0,
        exp:"Malen es pintar. De ahí sale das Malzimmer, y Daniel dice ich male auch gern." },
      { q:"¿Qué significa <strong>wohnen</strong>?",
        opts:["Vivir","Cocinar","Jugar"], ans:0,
        exp:"Wohnen es vivir. De ahí salen das Wohnzimmer y la pregunta del libro Wer wohnt hier?" },

      // --- Cómo es la casa: los adjetivos ---------------------------------
      { q:"¿Qué significa <strong>groß</strong>?",
        opts:["Grande","Pequeño","Bonito"], ans:0,
        exp:"Groß es grande. Se escribe con ß, una letra que en español no existe." },
      { q:"¿Qué significa <strong>klein</strong>?",
        opts:["Pequeño","Grande","Redondo"], ans:0,
        exp:"Klein es pequeño. Ben dice que Tim es su kleiner Bruder, su hermano pequeño." },
      { q:"¿Qué significa <strong>rund</strong>?",
        opts:["Redondo","Marrón","Grande"], ans:0,
        exp:"Rund es redondo, como la puerta de la casa de los hobbits." },
      { q:"¿Qué significa <strong>schön</strong>?",
        opts:["Bonito","Pequeño","Verde"], ans:0,
        exp:"Schön es bonito. Anna dice que su cuarto es groß und schön." },
      { q:"¿Qué significa <strong>grün</strong>?",
        opts:["Verde","Marrón","Redondo"], ans:0,
        exp:"Grün es verde, con diéresis en la u." },
      { q:"¿Qué significa <strong>braun</strong>?",
        opts:["Marrón","Verde","Bonito"], ans:0,
        exp:"Braun es marrón. Se parece al brown del inglés." },
      { q:"¿Qué significa <strong>hell</strong>?",
        opts:["Claro","Oscuro","Grande"], ans:0,
        exp:"Hell es claro, con mucha luz. Lo contrario es dunkel." },
      { q:"¿Qué significa <strong>dunkel</strong>?",
        opts:["Oscuro","Claro","Bonito"], ans:0,
        exp:"Dunkel es oscuro. Daniel dice que su cuarto es ziemlich dunkel, bastante oscuro." },
      { q:"¿Qué significa <strong>bunt</strong>?",
        opts:["De colores","Oscuro","Pequeño"], ans:0,
        exp:"Bunt es de muchos colores. Anna lo dice de su alfombra: schön bunt." },

      // --- Lo que trae la página de apuntes escrita a mano -----------------
      { q:"¿Qué significa <strong>das Badezimmer</strong>?",
        opts:["El cuarto de baño","El comedor","El dormitorio"], ans:0,
        exp:"Das Badezimmer es el cuarto de baño. En el libro también sale más corto: das Bad." },
      { q:"¿Cómo se dice <strong>el cuarto de baño</strong> con la palabra larga?",
        opts:["das Badezimmer","das Schlafzimmer","das Esszimmer"], ans:0,
        exp:"Das Badezimmer, que acaba en -zimmer como los demás cuartos de la casa." },
      { q:"¿Qué significa <strong>das Zimmer</strong>?",
        opts:["La habitación","La casa","El jardín"], ans:0,
        exp:"Das Zimmer es la habitación. Por eso todos los cuartos acaban en -zimmer." },
      { q:"¿Cuál de estas dos maneras de decir <strong>el cuarto de baño</strong> es la larga?",
        opts:["das Badezimmer","das Bad","das Zimmer"], ans:0,
        exp:"Las dos valen: das Bad es la corta y das Badezimmer la larga." },

      // --- Escribir la palabra --------------------------------------------
      // Reconocer una palabra en una lista de tres es mucho mas facil que
      // saber escribirla. Estas obligan a teclearla.
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la cama</strong>, con su artículo.",
        resp:"das Bett", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Das Bett. Es la única cosa que tienen los tres niños del libro." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la mesa</strong>, con su artículo.",
        resp:"der Tisch", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Der Tisch. Y la silla que va con ella es der Stuhl." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la puerta</strong>, con su artículo.",
        resp:"die Tür", pista:"Lleva diéresis. Si no la tienes en el teclado, escribe Tuer o Tur.",
        exp:"Die Tür, con diéresis en la u." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la cocina</strong>, con su artículo.",
        resp:"die Küche", pista:"Lleva diéresis. Si no la tienes en el teclado, escribe Kueche o Kuche.",
        exp:"Die Küche, con diéresis en la u." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el jardín</strong>, con su artículo.",
        resp:"der Garten", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Der Garten, donde los hobbits spielen Ball." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la ventana</strong>, con su artículo.",
        resp:"das Fenster", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Das Fenster, aunque la puerta de al lado sea die Tür." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el armario</strong>, con su artículo.",
        resp:"der Schrank", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Der Schrank. La estantería, con las baldas a la vista, es das Regal." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la lámpara</strong>, con su artículo.",
        resp:"die Lampe", pista:"Primero el artículo (der, die o das) y luego la palabra.",
        exp:"Die Lampe. La de leer es die Leselampe." },

      // --- Completar la frase ---------------------------------------------
      // Es el ejercicio 2b del libro, tal cual: la frase a medias y hay que
      // poner donde estan los hobbits.
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits kochen. Sie sind ...</strong>",
        resp:"in der Küche", pista:"Tres palabras. Ojo: la cocina no lleva im.",
        exp:"In der Küche. Es la única de las seis que no lleva im ni auf dem." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits schlafen. Sie sind ...</strong>",
        resp:"im Schlafzimmer", pista:"Dos palabras.",
        exp:"Im Schlafzimmer, el cuarto de schlafen, dormir." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits duschen. Sie sind ...</strong>",
        resp:"im Bad", pista:"Dos palabras.",
        exp:"Im Bad, que es donde uno se ducha." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits spielen Ball. Sie sind ...</strong>",
        resp:"im Garten", pista:"Dos palabras. A la pelota se juega fuera.",
        exp:"Im Garten." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits machen Musik. Sie sind ...</strong>",
        resp:"im Wohnzimmer", pista:"Dos palabras.",
        exp:"Im Wohnzimmer, el salón." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Die Hobbits lesen ein Buch. Sie sind ...</strong>",
        resp:"auf dem Balkon", pista:"Tres palabras. El balcón es el único que no lleva im.",
        exp:"Auf dem Balkon. El balcón lleva auf dem y no im." },
      { tipo:"escribir", idioma:"de", q:"Completa lo que dice Anna: <strong>Mein Zimmer ist ... und schön.</strong>",
        resp:"groß", pista:"Una palabra, lo contrario de klein. Si no tienes la ß, escribe gross.",
        exp:"Groß, grande. Se escribe con ß, que en español no existe." },
      { tipo:"escribir", idioma:"de", q:"Completa lo que dice Daniel: <strong>Mein Zimmer ist ziemlich ...</strong>",
        resp:"dunkel", pista:"Una palabra, lo contrario de hell.",
        exp:"Dunkel, oscuro. Por eso pide una Leselampe." }

    ]
  }
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
