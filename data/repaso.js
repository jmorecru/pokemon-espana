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
        exp:"Dunkel, oscuro. Por eso pide una Leselampe." },

      // --- Ortografía: donde se cae todo el mundo --------------------------
      // Dos salen de errores vistos en el cuaderno (Whonzimmer, y la b/d de
      // Badezimmer). El resto son las trampas clasicas para un hispanohablante
      // con este vocabulario: el grupo sch, que en espanol no existe; las
      // consonantes dobles, que aqui casi no se usan; la h que no se oye pero
      // se escribe; y el Balkon con k.
      //
      // Ojo: la dieresis y la ss alemana NO se pueden examinar asi, porque la
      // correccion las acepta a proposito para no castigar al teclado espanol.
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el salón</strong>, con su artículo.",
        resp:"das Wohnzimmer", pista:"Fíjate bien en el orden de las letras del principio.",
        exp:"Das Wohnzimmer. Viene de wohnen, vivir: va wohn-, con la o antes que la h." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el cuarto de baño</strong>, con la palabra larga y su artículo.",
        resp:"das Badezimmer", pista:"La letra del medio: ¿b o d?",
        exp:"Das Badezimmer, con d, porque sale de das Bad." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el comedor</strong>, con su artículo.",
        resp:"das Esszimmer", pista:"Una letra va doble.",
        exp:"Das Esszimmer, con doble s. En alemán las consonantes dobles son de lo más normal; en español casi no las usamos." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la habitación</strong>, con su artículo.",
        resp:"das Zimmer", pista:"Una letra va doble.",
        exp:"Das Zimmer, con doble m. Todos los cuartos de la casa acaban igual: -zimmer." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el dormitorio</strong>, con su artículo.",
        resp:"das Schlafzimmer", pista:"Empieza con un grupo de tres letras que en español no existe.",
        exp:"Das Schlafzimmer. Empieza por sch-, y detrás va la l: schlaf-, de schlafen, dormir." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la silla</strong>, con su artículo.",
        resp:"der Stuhl", pista:"Lleva una letra que no se pronuncia.",
        exp:"Der Stuhl. Esa h no se oye, pero se escribe: sirve para alargar la u." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>la alfombra</strong>, con su artículo.",
        resp:"der Teppich", pista:"Una letra va doble, y el final no se escribe como suena.",
        exp:"Der Teppich, con doble p y acabado en -ch." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el escritorio</strong>, con su artículo.",
        resp:"der Schreibtisch", pista:"Empieza y acaba con el mismo grupo de tres letras.",
        exp:"Der Schreibtisch: sch al principio y sch al final. Lleva dentro der Tisch, la mesa." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el balcón</strong>, con su artículo.",
        resp:"der Balkon", pista:"Se parece mucho al español, pero una letra cambia.",
        exp:"Der Balkon, con k. En español lo escribimos con c: balcón." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>el cuadro</strong>, con su artículo.",
        resp:"das Bild", pista:"Acaba en una letra que casi no se oye.",
        exp:"Das Bild. Al final suena casi como una t, pero se escribe con d." }


    ],

    // Alemán: los posesivos. Dos páginas del cuaderno: la tabla de mein, dein,
    // sein e ihr con Kuli, Buch, Schwester y Katzen, y dos frases sobre el
    // padre y la madre.
    //
    // Ademas de esas palabras se usan las de la casa y los muebles, que ya
    // estan dadas en el tema anterior. No es ampliar vocabulario: los
    // posesivos obligan a saber si cada palabra es der, die o das, y eso es
    // justo lo que hay que repasar con ellos.
    "Alemán: los posesivos": [

      // --- Las palabras de la tabla -----------------------------------------
      { q:"¿Qué significa <strong>der Kuli</strong>?",
        opts:["El boli","El libro","La hermana"], ans:0,
        exp:"Der Kuli es el boli. Es masculino, así que mein Kuli, sin -e." },
      { q:"¿Qué significa <strong>die Schwester</strong>?",
        opts:["La hermana","La madre","El gato"], ans:0,
        exp:"Die Schwester es la hermana. Es femenino, así que meine Schwester, con -e." },
      { q:"¿Qué significa <strong>die Katzen</strong>?",
        opts:["Los gatos","Las hermanas","Los libros"], ans:0,
        exp:"Die Katzen son los gatos. Es plural, así que meine Katzen, con -e." },

      // --- Qué significa cada posesivo --------------------------------------
      { q:"¿Qué significa <strong>mein</strong>?",
        opts:["Mi","Tu","Su"], ans:0,
        exp:"Mein es mi: Das ist mein Buch, este es mi libro." },
      { q:"¿Qué significa <strong>dein</strong>?",
        opts:["Tu","Mi","Su"], ans:0,
        exp:"Dein es tu: Das ist dein Buch, este es tu libro." },
      { q:"¿Qué significa <strong>sein</strong>?",
        opts:["Su, de él","Su, de ella","Tu"], ans:0,
        exp:"Sein es su, pero solo si es de un chico o de un hombre: sein Buch." },
      { q:"¿Qué significa <strong>ihr</strong> en <strong>Das ist ihr Buch</strong>?",
        opts:["Su, de ella","Su, de él","Mi"], ans:0,
        exp:"Ihr es su, pero solo si es de una chica o de una mujer: ihr Buch." },

      // --- Su de él y su de ella: lo que el español no distingue -------------
      { q:"En español decimos <strong>su libro</strong> tanto si es de un chico como de una chica. Si es de un chico, ¿cómo se dice en alemán?",
        opts:["sein Buch","ihr Buch","dein Buch"], ans:0,
        exp:"Sein Buch. El alemán sí lo distingue: sein si es de él, ihr si es de ella." },
      { q:"¿Y si el libro es de una chica?",
        opts:["ihr Buch","sein Buch","mein Buch"], ans:0,
        exp:"Ihr Buch. Para el español es el mismo su; para el alemán, no." },
      { q:"<strong>Mein Vater</strong> tiene un cuarto. ¿Cómo se dice <strong>su cuarto</strong>?",
        opts:["sein Zimmer","ihr Zimmer","seine Zimmer"], ans:0,
        exp:"Sein Zimmer: es del padre, de él. Y sin -e, porque das Zimmer es neutro." },
      { q:"<strong>Meine Mutter</strong> tiene un cuarto. ¿Cómo se dice <strong>su cuarto</strong>?",
        opts:["ihr Zimmer","ihre Zimmer","sein Zimmer"], ans:0,
        exp:"Ihr Zimmer, sin -e, porque das Zimmer es neutro. Es muy fácil liarse y poner ihre." },

      // --- La regla de la -e ------------------------------------------------
      { q:"¿Cuándo lleva <strong>-e</strong> al final el posesivo, como en <strong>meine</strong>?",
        opts:["Con palabras femeninas y en plural","Con palabras masculinas","Siempre"], ans:0,
        exp:"Con femeninas y en plural: meine Schwester, meine Katzen. Con masculinas y neutras va sin -e: mein Kuli, mein Buch." },
      { q:"¿Y cuándo va <strong>sin -e</strong>, como en <strong>mein</strong>?",
        opts:["Con palabras masculinas y neutras","Con palabras femeninas","En plural"], ans:0,
        exp:"Con las que llevan der y das: mein Kuli, mein Buch. Con die y en plural, con -e." },

      // --- Mi, tu, su ----------------------------------------------------------
      { q:"Completa (mi): <strong>Das ist ___ Kuli.</strong>",
        opts:["mein","meine","sein"], ans:0,
        exp:"Mein Kuli: der Kuli es masculino, así que sin -e." },
      { q:"Completa (mi): <strong>Das ist ___ Buch.</strong>",
        opts:["mein","meine","dein"], ans:0,
        exp:"Mein Buch: das Buch es neutro, así que sin -e." },
      { q:"Completa (mi): <strong>Das ist ___ Schwester.</strong>",
        opts:["meine","mein","deine"], ans:0,
        exp:"Meine Schwester: die Schwester es femenino, así que con -e." },
      { q:"Completa (mis): <strong>Das sind ___ Katzen.</strong>",
        opts:["meine","mein","sein"], ans:0,
        exp:"Meine Katzen: en plural, siempre con -e." },
      { q:"Completa (tu): <strong>Das ist ___ Buch.</strong>",
        opts:["dein","deine","mein"], ans:0,
        exp:"Dein Buch: das Buch es neutro, sin -e." },
      { q:"Completa (tu): <strong>Das ist ___ Schwester.</strong>",
        opts:["deine","dein","meine"], ans:0,
        exp:"Deine Schwester: femenino, con -e." },
      { q:"Completa (tus): <strong>Das sind ___ Katzen.</strong>",
        opts:["deine","dein","seine"], ans:0,
        exp:"Deine Katzen: plural, con -e." },
      { q:"Completa (su, de él): <strong>Das ist ___ Buch.</strong>",
        opts:["sein","seine","ihr"], ans:0,
        exp:"Sein Buch: es de él, y das Buch es neutro, sin -e." },
      { q:"Completa (su, de él): <strong>Das ist ___ Schwester.</strong>",
        opts:["seine","sein","ihre"], ans:0,
        exp:"Seine Schwester: es de él, y die Schwester es femenino, con -e." },
      { q:"Completa (su, de ella): <strong>Das ist ___ Buch.</strong>",
        opts:["ihr","ihre","sein"], ans:0,
        exp:"Ihr Buch: es de ella, y das Buch es neutro, sin -e." },
      { q:"Completa (su, de ella): <strong>Das ist ___ Schwester.</strong>",
        opts:["ihre","ihr","seine"], ans:0,
        exp:"Ihre Schwester: es de ella, y die Schwester es femenino, con -e." },
      { q:"Completa (sus, de ella): <strong>Das sind ___ Katzen.</strong>",
        opts:["ihre","ihr","seine"], ans:0,
        exp:"Ihre Katzen: de ella, y en plural, con -e." },

      // --- Ist o sind -----------------------------------------------------------
      { q:"Completa: <strong>Das ___ meine Katzen.</strong>",
        opts:["sind","ist","bin"], ans:0,
        exp:"Das sind, porque son varios gatos. Das ist es para una sola cosa: Das ist mein Buch." },
      { q:"Completa: <strong>Das ___ meine Schwester.</strong>",
        opts:["ist","sind","bin"], ans:0,
        exp:"Das ist, porque es una sola persona. Con varias sería das sind." },

      // --- El padre y la madre --------------------------------------------------
      { q:"¿Cómo se dice <strong>mi padre</strong>?",
        opts:["mein Vater","meine Vater","sein Vater"], ans:0,
        exp:"Mein Vater: der Vater es masculino, sin -e." },
      { q:"¿Cómo se dice <strong>mi madre</strong>?",
        opts:["meine Mutter","mein Mutter","ihre Mutter"], ans:0,
        exp:"Meine Mutter: die Mutter es femenino, con -e." },
      { q:"Completa: <strong>Mein Vater ___ 44 Jahre alt.</strong>",
        opts:["ist","heißt","sind"], ans:0,
        exp:"Ist: para decir la edad se usa ist. Heißt es para el nombre, como en Wie heißt du?" },
      { q:"¿Qué significa <strong>Meine Mutter ist 40 Jahre alt</strong>?",
        opts:["Mi madre tiene 40 años","Mi madre se llama 40","Mi madre tiene 40 gatos"], ans:0,
        exp:"Ist ... Jahre alt es tener tantos años." },

      // --- Con las cosas de la casa: hay que acordarse del der, die, das -------
      { q:"Completa (mi): <strong>Das ist ___ Lampe.</strong>",
        opts:["meine","mein","seine"], ans:0,
        exp:"Meine Lampe, porque es die Lampe: femenino, con -e." },
      { q:"Completa (tu): <strong>Das ist ___ Tisch.</strong>",
        opts:["dein","deine","mein"], ans:0,
        exp:"Dein Tisch, porque es der Tisch: masculino, sin -e." },
      { q:"Completa (su, de él): <strong>Das ist ___ Haus.</strong>",
        opts:["sein","seine","ihr"], ans:0,
        exp:"Sein Haus, porque es das Haus: neutro, sin -e." },
      { q:"Completa (su, de ella): <strong>Das ist ___ Küche.</strong>",
        opts:["ihre","ihr","seine"], ans:0,
        exp:"Ihre Küche, porque es die Küche: femenino, con -e." },
      { q:"Completa (su, de ella): <strong>Das ist ___ Stuhl.</strong>",
        opts:["ihr","ihre","sein"], ans:0,
        exp:"Ihr Stuhl, porque es der Stuhl: masculino, sin -e." },
      { q:"Completa (mi): <strong>Das ist ___ Bett.</strong>",
        opts:["mein","meine","dein"], ans:0,
        exp:"Mein Bett, porque es das Bett: neutro, sin -e." },
      { q:"Completa (tu): <strong>Das ist ___ Tür.</strong>",
        opts:["deine","dein","meine"], ans:0,
        exp:"Deine Tür, porque es die Tür: femenino, con -e." },
      { q:"Completa (su, de él): <strong>Das ist ___ Schrank.</strong>",
        opts:["sein","seine","ihre"], ans:0,
        exp:"Sein Schrank, porque es der Schrank: masculino, sin -e." },

      // --- Escribir --------------------------------------------------------------
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (mi): <strong>Das ist ___ Schwester.</strong>",
        resp:"meine", pista:"Una palabra. Schwester lleva die.",
        exp:"Meine: die Schwester es femenino, así que con -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (su, de él): <strong>Das ist ___ Buch.</strong>",
        resp:"sein", pista:"Una palabra. Buch lleva das.",
        exp:"Sein: es de él, y das Buch es neutro, sin -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (su, de ella): <strong>Das ist ___ Schwester.</strong>",
        resp:"ihre", pista:"Una palabra. Es de ella, y Schwester lleva die.",
        exp:"Ihre: de ella, y femenino, con -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (tus): <strong>Das sind ___ Katzen.</strong>",
        resp:"deine", pista:"Una palabra. Katzen es plural.",
        exp:"Deine: en plural, con -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (sus, de él): <strong>Das sind ___ Katzen.</strong>",
        resp:"seine", pista:"Una palabra. Katzen es plural.",
        exp:"Seine: de él, y en plural, con -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe el posesivo (su, de ella): <strong>Das ist ___ Tisch.</strong>",
        resp:"ihr", pista:"Una palabra. Tisch lleva der.",
        exp:"Ihr: de ella, y der Tisch es masculino, sin -e." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Meine Mutter ist 40 Jahre alt. ___ Zimmer ist groß.</strong>",
        resp:"Ihr", pista:"Una palabra. El cuarto es de la madre, y Zimmer lleva das.",
        exp:"Ihr Zimmer: de ella, y das Zimmer es neutro, así que sin -e. No ihre." },
      { tipo:"escribir", idioma:"de", q:"Completa: <strong>Mein Vater ist 44 Jahre alt. ___ Zimmer ist groß.</strong>",
        resp:"Sein", pista:"Una palabra. El cuarto es del padre.",
        exp:"Sein Zimmer: de él, y neutro, sin -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>mi madre</strong>.",
        resp:"meine Mutter", pista:"Dos palabras. Mutter lleva die.",
        exp:"Meine Mutter: femenino, con -e." },
      { tipo:"escribir", idioma:"de", q:"Escribe en alemán <strong>su libro</strong>, si el libro es de una chica.",
        resp:"ihr Buch", pista:"Dos palabras. Es de ella, y Buch lleva das.",
        exp:"Ihr Buch: de ella, y neutro, sin -e." },
      { tipo:"escribir", idioma:"de", q:"Completa con el verbo: <strong>Das ___ meine Katzen.</strong>",
        resp:"sind", pista:"Una palabra. Katzen es plural.",
        exp:"Das sind, porque son varios. Con una sola cosa sería das ist." }
    ],

    // Science: Energy. La asignatura se da entera en ingles, asi que aqui todo
    // va en ingles: pregunta, opciones, pista y explicacion. Sale de diez
    // paginas: que es la energia, sus tipos, la energia mecanica (cinetica y
    // potencial), la conservacion y las transformaciones, y la conduccion, la
    // conveccion y la radiacion.
    //
    // Dos cuidados con las opciones equivocadas, para no ensenar algo falso:
    // - Kinetic y mechanical no compiten nunca en la misma pregunta. La
    //   cinetica es un tipo de mecanica, y en las fichas el profesor da por
    //   buena kinetic: ponerlas juntas ensenaria que una de las dos esta mal.
    // - Cuando el Sol es la fuente, heat no va de opcion mala: la primera
    //   pagina dice que el Sol da luz y calor. En las fichas lo esperado es
    //   light, asi que se pregunta sin que heat compita.
    // Tambien se evita cualquier opcion mala que en realidad sea medio verdad:
    // un despertador tambien da luz, un coche tambien hace ruido.
    "Science: Energy": [

      // --- What is energy? ---------------------------------------------------
      { q:"What is energy?",
        opts:["The ability to do work","Something only batteries have","A type of weather"], ans:0,
        exp:"Energy is the ability to do work. It makes things move, change and carry out work." },
      { q:"Energy is what makes things move, change and carry out...",
        opts:["work","waves","wires"], ans:0,
        exp:"Energy makes things move, change and carry out work." },
      { q:"What is the most important energy source?",
        opts:["The Sun","A battery","A fridge"], ans:0,
        exp:"The Sun. Its light and heat let plants and animals grow and live on Earth." },
      { q:"Which two kinds of energy does the Sun produce?",
        opts:["Light and heat","Sound and electrical","Chemical and elastic"], ans:0,
        exp:"The Sun produces radiant (light) energy and heat energy." },
      { q:"Why does the human body need energy?",
        opts:["To run, play, eat and keep our organs working","To make electricity for the house","To produce x-rays"], ans:0,
        exp:"Energy in the body lets us run, play sports, eat and keep our organs working." },
      { q:"Which of these needs electrical energy to work?",
        opts:["A fridge","A rubber band","The Sun"], ans:0,
        exp:"A fridge. Computers, televisions, lightbulbs and fridges all run on electrical energy." },

      // --- Types of energy ------------------------------------------------------
      { q:"Electrical energy is the movement of...",
        opts:["electrons, usually through a wire","molecules in food","sound waves in the air"], ans:0,
        exp:"Electrical energy is electrons moving, usually through a wire." },
      { q:"Which of these is a natural example of electrical energy?",
        opts:["Lightning","A rubber band","A book on a shelf"], ans:0,
        exp:"Lightning is electrons moving through the air: electrical energy." },
      { q:"A form of energy that comes from moving electric charges is...",
        opts:["electrical energy","chemical energy","elastic potential energy"], ans:0,
        exp:"Moving electric charges are electrical energy. Don't mix it up with chemical energy, which is stored in the bonds of atoms and molecules." },
      { q:"Energy stored in the bonds that connect atoms and molecules is...",
        opts:["chemical energy","electrical energy","sound energy"], ans:0,
        exp:"Chemical energy is stored in bonds, like in food or batteries. Electrical energy is electrons moving." },
      { q:"Which of these stores chemical energy?",
        opts:["Food","A plug in the wall","A rolling ball"], ans:0,
        exp:"Food stores chemical energy. So do batteries and fuel." },
      { q:"Heat energy flows...",
        opts:["from hotter objects to cooler ones","from cooler objects to hotter ones","only through wires"], ans:0,
        exp:"Heat always moves from the hotter object to the cooler one." },
      { q:"Thermal (heat) energy comes from the...",
        opts:["temperature of matter","movement of electrons in a wire","bonds of atoms"], ans:0,
        exp:"Thermal energy comes from the temperature of matter." },
      { q:"Sound is produced when a force makes an object or substance...",
        opts:["vibrate","melt","shine"], ans:0,
        exp:"Sound happens when something vibrates, and it travels in waves." },
      { q:"How do sound and light travel?",
        opts:["In waves","Through wires","In the bonds of atoms"], ans:0,
        exp:"Both sound and light travel in waves." },
      { q:"Which form of energy can our eyes detect?",
        opts:["Light energy","Sound energy","Chemical energy"], ans:0,
        exp:"Our eyes detect light energy." },
      { q:"Visible light and x-rays are both examples of...",
        opts:["light energy","sound energy","elastic potential energy"], ans:0,
        exp:"Visible light and x-rays are both light energy, travelling in waves." },
      { q:"Mechanical energy is related to the...",
        opts:["movement and position of objects","temperature of matter","electrons in a wire"], ans:0,
        exp:"Mechanical energy is about how objects move and where they are." },

      // --- Kinetic and potential ------------------------------------------------
      { q:"The energy an object has because it is moving is called...",
        opts:["kinetic energy","elastic potential energy","chemical energy"], ans:0,
        exp:"Kinetic energy: a moving car, a flying bird or a rolling ball all have it." },
      { q:"Which of these has kinetic energy?",
        opts:["A rolling ball","A book resting on a shelf","A stretched rubber band"], ans:0,
        exp:"The ball is moving, so it has kinetic energy. The other two are still: their energy is potential." },
      { q:"Kinetic and potential energy are two types of...",
        opts:["mechanical energy","chemical energy","electrical energy"], ans:0,
        exp:"Both are mechanical energy: kinetic because something moves, potential because of its position or condition." },
      { q:"Potential energy is energy an object has stored because of its...",
        opts:["position or condition","colour","sound"], ans:0,
        exp:"Potential energy is stored because of where the object is or the state it is in." },
      { q:"A book on a shelf has more ___ than a book on the floor.",
        opts:["gravitational potential energy","kinetic energy","sound energy"], ans:0,
        exp:"The higher the object, the more gravitational potential energy it stores." },
      { q:"Energy stored in an object because of its height above the ground is...",
        opts:["gravitational potential energy","elastic potential energy","kinetic energy"], ans:0,
        exp:"Height above the ground means gravitational potential energy." },
      { q:"Energy stored in stretched or squashed materials is...",
        opts:["elastic potential energy","gravitational potential energy","heat energy"], ans:0,
        exp:"Stretching or squashing something, like a spring or a rubber band, stores elastic potential energy." },
      { q:"A squashed spring stores...",
        opts:["elastic potential energy","chemical energy","light energy"], ans:0,
        exp:"A squashed spring stores elastic potential energy, and lets it go when you release it." },

      // --- Conservation and transformation -------------------------------------
      { q:"The law of conservation of energy says that energy...",
        opts:["can't be created or destroyed, only changed","can be created from nothing","disappears when we use it"], ans:0,
        exp:"Energy can neither be created nor destroyed: it can only be transferred or transformed into another form." },
      { q:"When energy changes from one form to another, it is called...",
        opts:["energy transformation","energy conduction","energy radiation"], ans:0,
        exp:"That is energy transformation. Conduction and radiation are ways heat moves." },
      { q:"Another name for energy transformation is energy...",
        opts:["conversion","convection","creation"], ans:0,
        exp:"Conversion. Don't mix it up with convection, which is how heat moves through liquids and gases." },
      { q:"When does energy change form?",
        opts:["Whenever it is used to do work","Only at night","Never"], ans:0,
        exp:"Energy changes form whenever it is used to do work." },

      // --- Transformations -------------------------------------------------------
      { q:"A battery makes a flashlight shine. <strong>Chemical</strong> energy changes into...",
        opts:["light energy","sound energy","kinetic energy"], ans:0,
        exp:"The battery's chemical energy becomes light." },
      { q:"A toaster is plugged into the wall. <strong>Electrical</strong> energy changes into...",
        opts:["heat energy","sound energy","chemical energy"], ans:0,
        exp:"The toaster turns electrical energy into heat." },
      { q:"A lamp is plugged into the wall. <strong>Electrical</strong> energy changes into...",
        opts:["light energy","chemical energy","elastic potential energy"], ans:0,
        exp:"The lamp turns electrical energy into light." },
      { q:"A fan is plugged into the wall and its blades turn. <strong>Electrical</strong> energy changes into...",
        opts:["energy of motion (kinetic)","chemical energy","light energy"], ans:0,
        exp:"The blades turn and make a breeze, so the electricity becomes energy of motion. It is movement, not heat." },
      { q:"Solar panels capture sunlight. <strong>Light</strong> energy changes into...",
        opts:["electrical energy","sound energy","chemical energy"], ans:0,
        exp:"Solar panels turn light into electrical energy to power the house." },
      { q:"An alarm clock plugged into the wall rings. <strong>Electrical</strong> energy changes into...",
        opts:["sound energy","chemical energy","elastic potential energy"], ans:0,
        exp:"The alarm clock turns electrical energy into sound." },
      { q:"You clap your hands to make a noise. <strong>Energy of motion</strong> changes into...",
        opts:["sound energy","chemical energy","electrical energy"], ans:0,
        exp:"Your moving hands make the air vibrate: energy of motion becomes sound." },
      { q:"Batteries make a radio play music. <strong>Chemical</strong> energy changes into...",
        opts:["sound energy","elastic potential energy","gravitational potential energy"], ans:0,
        exp:"The batteries' chemical energy becomes sound." },
      { q:"You eat food and then go for a run. <strong>Chemical</strong> energy changes into...",
        opts:["kinetic energy","electrical energy","light energy"], ans:0,
        exp:"Food stores chemical energy, and your body turns it into movement: kinetic energy." },
      { q:"A car uses fuel to move. <strong>Chemical</strong> energy changes into...",
        opts:["kinetic energy","chemical energy","elastic potential energy"], ans:0,
        exp:"The fuel's chemical energy becomes movement, kinetic energy." },
      { q:"A car runs on fuel. What kind of energy is stored in the fuel?",
        opts:["chemical energy","kinetic energy","electrical energy"], ans:0,
        exp:"Fuel stores chemical energy. The movement, kinetic energy, comes afterwards." },
      { q:"When riding a bike you begin to sweat. <strong>Energy of motion</strong> changes into...",
        opts:["heat energy","light energy","sound energy"], ans:0,
        exp:"Moving makes you warm: energy of motion becomes heat. That is why you sweat." },
      { q:"A plant grows using sunlight. <strong>Light</strong> energy changes into...",
        opts:["chemical energy","kinetic energy","sound energy"], ans:0,
        exp:"The plant stores the sunlight as chemical energy. The plant doesn't move, so it isn't kinetic." },
      { q:"A plant grows thanks to the Sun. Which energy does the plant take from the Sun?",
        opts:["light energy","electrical energy","sound energy"], ans:0,
        exp:"Plants use the Sun's light energy and store it as chemical energy." },
      { q:"An ice cream melts in the sun. <strong>Light</strong> energy changes into...",
        opts:["heat energy","kinetic energy","sound energy"], ans:0,
        exp:"The sunlight turns into heat, and the heat melts the ice cream. Nothing is moving, so it isn't kinetic." },

      // --- Conduction, convection, radiation ------------------------------------
      { q:"Conduction is heat transfer through...",
        opts:["direct contact between objects","moving liquids or gases","electromagnetic waves"], ans:0,
        exp:"Conduction needs touching: heat passes through direct contact." },
      { q:"Convection transfers heat by...",
        opts:["moving fluids (liquids or gases)","direct contact","electromagnetic waves"], ans:0,
        exp:"Convection is heat carried by moving liquids or gases." },
      { q:"Radiation is the transfer of heat through...",
        opts:["electromagnetic waves","direct contact","moving liquids or gases"], ans:0,
        exp:"Radiation travels as electromagnetic waves, so it needs no touching and no liquid." },
      { q:"Liquids and gases are also called...",
        opts:["fluids","solids","waves"], ans:0,
        exp:"Liquids and gases are fluids: they can flow." },
      { q:"Touching a hot pan is an example of...",
        opts:["conduction","convection","radiation"], ans:0,
        exp:"You touch it, so the heat passes by conduction." },
      { q:"You heat a metal rod at one end and the other end gets hot too. This is...",
        opts:["conduction","convection","radiation"], ans:0,
        exp:"Heat moves through the solid rod: conduction." },
      { q:"Holding a hot cup of tea to warm your hands is...",
        opts:["conduction","convection","radiation"], ans:0,
        exp:"Your hands touch the cup: conduction." },
      { q:"Using an electric blanket to get warm is...",
        opts:["conduction","radiation","convection"], ans:0,
        exp:"The blanket touches your body, so the heat passes by conduction. It is electric, but the heat reaches you by contact." },
      { q:"Heat moving from warmer to colder parts of a solid object is...",
        opts:["conduction","convection","radiation"], ans:0,
        exp:"Inside solids, heat moves by conduction." },
      { q:"Boiling water: the cold water sinks and the warm water rises. This is...",
        opts:["convection","conduction","radiation"], ans:0,
        exp:"The water moves and carries the heat: convection." },
      { q:"Warm air rising in a hot air balloon is...",
        opts:["convection","conduction","radiation"], ans:0,
        exp:"Moving warm air carries the heat: convection." },
      { q:"Sea breezes at the coast are an example of...",
        opts:["convection","conduction","radiation"], ans:0,
        exp:"Moving air carries the heat: convection." },
      { q:"Ocean currents carrying heat are an example of...",
        opts:["convection","conduction","radiation"], ans:0,
        exp:"Moving water carries the heat: convection." },
      { q:"A heater warms the air and the air moves around the room. This is...",
        opts:["convection","conduction","radiation"], ans:0,
        exp:"The warm air circulates around the room: convection." },
      { q:"Feeling the warmth of the Sun is an example of...",
        opts:["radiation","conduction","convection"], ans:0,
        exp:"The Sun's heat crosses space as electromagnetic waves: radiation." },
      { q:"Warming your hands near a fire, without touching it, is...",
        opts:["radiation","conduction","convection"], ans:0,
        exp:"You don't touch the fire, so the heat reaches you by radiation." },
      { q:"The sand on the beach gets hot on a sunny day. This is...",
        opts:["radiation","conduction","convection"], ans:0,
        exp:"The Sun heats the sand from far away: radiation." },
      { q:"Standing near a light bulb that has been on for a long time warms you by...",
        opts:["radiation","conduction","convection"], ans:0,
        exp:"You don't touch the bulb: the heat reaches you by radiation." },
      { q:"An infrared camera picks up heat that travels by...",
        opts:["radiation","conduction","convection"], ans:0,
        exp:"Infrared rays are radiation." },

      // --- Como en sus fichas: las dos cajas con la flecha -------------------
      // Es el formato de los ejercicios de Energy Transformations: un dibujo a
      // cada lado y hay que poner de que energia a que energia se pasa.
      { q:"An apple gives a cyclist energy to pedal. Which pair is right?",
        opts:["chemical → kinetic","kinetic → chemical","light → heat"], ans:0,
        exp:"The apple stores chemical energy, and the cyclist turns it into movement: chemical → kinetic." },
      { q:"A battery powers a flashlight. Which pair is right?",
        opts:["chemical → light","light → chemical","electrical → sound"], ans:0,
        exp:"The battery stores chemical energy and the flashlight gives light: chemical → light." },
      { q:"A plug powers a toaster. Which pair is right?",
        opts:["electrical → heat","heat → electrical","chemical → sound"], ans:0,
        exp:"Electricity from the plug becomes heat in the toaster: electrical → heat." },
      { q:"Fuel makes a car move. Which pair is right?",
        opts:["chemical → kinetic","kinetic → chemical","electrical → light"], ans:0,
        exp:"Fuel stores chemical energy and the car moves: chemical → kinetic." },
      { q:"The Sun helps a plant grow. Which pair is right?",
        opts:["light → chemical","sound → kinetic","electrical → heat"], ans:0,
        exp:"The plant takes the Sun's light and stores it as chemical energy: light → chemical." },
      { q:"Batteries make a radio play music. Which pair is right?",
        opts:["chemical → sound","sound → chemical","light → heat"], ans:0,
        exp:"The batteries' chemical energy becomes sound: chemical → sound." },
      { q:"Solar panels power a house. Which pair is right?",
        opts:["light → electrical","electrical → light","sound → chemical"], ans:0,
        exp:"The panels catch light and make electricity: light → electrical." }
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
