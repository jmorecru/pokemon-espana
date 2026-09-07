# Temas pendientes

Última revisión: **7 de septiembre de 2026**.

El juego se trajo de Netlify a GitHub sin tocar nada, se revisó, y después se arreglaron
las tres cosas que lo dejaban a medias: el fallo de las respuestas, las imágenes que
faltaban y la música. Aquí queda lo que sigue abierto, empezando por lo que se ha pedido
para las próximas versiones.

---

## 🎯 Lo siguiente: convertirlo en un Carmen Sandiego

La idea es que el juego deje de ser "visita monumentos y contesta" y pase a ser una
persecución contra el reloj, como en *¿Dónde está Carmen Sandiego?*. Son cuatro cambios
que van juntos y que, entre ellos, arreglan también el agujero de diseño que tiene ahora
el juego (ver más abajo, "el atajo de la ruta").

- [ ] **Un tiempo límite para atrapar al legendario.** Una bolsa de tiempo al empezar la
      partida (por ejemplo, días y horas como en Carmen Sandiego, que se entiende mejor
      que un contador de minutos reales). Si se agota, el Pokémon escapa y se pierde.

- [ ] **Cada investigación consume tiempo.** Entrar en un monumento y responder cuesta
      un rato. Así hay que elegir: investigar los tres lugares de una ciudad para estar
      seguro, o arriesgarse con una sola pista y salir corriendo.

- [ ] **Viajar cuesta tiempo, y equivocarse cuesta el doble.** Ir a una ciudad que no
      toca gasta el viaje de ida y además el de vuelta. Esto es lo que hace que las
      pistas importen: adivinar a lo loco sale carísimo.

- [ ] **Solo 3 destinos por ciudad, no las 13.** En cada ciudad se ofrece una lista corta
      de a dónde se puede volar (en Carmen Sandiego eran 3). La ciudad correcta tiene que
      estar siempre entre ellas, y las otras dos se sortean. Ahora mismo se muestran
      *todas* las ciudades del mapa, que es lo que permite ir probando una por una.

      Con esto hay que decidir además qué pasa si el jugador quiere volver atrás: o se
      incluye siempre la ciudad de origen entre las 3, o se acepta que la persecución es
      solo hacia delante.

**Por qué esto arregla el atajo de la ruta.** Hoy `travelTo()` sube `state.routeIndex`
solo por llegar a la ciudad correcta, sin exigir haber resuelto nada, y las ciudades
equivocadas contestan con el cartel de "¡Sin señal de energía!", que funciona como
chivato: probando las 13 se descubre la siguiente sin acertar una pregunta. En cuanto
viajar cuesta tiempo y solo hay 3 destinos, esa estrategia deja de ser gratis y las
pistas pasan a ser lo que de verdad hace avanzar. Al implementarlo, ojo con
`isCorrectNext` en `renderScreen()` y `openPlace()`: es código muerto (cuando se
comprueba, `routeIndex` ya se ha incrementado) y estorba para entender el flujo.

---

## 📚 El banco de preguntas: falta el temario

**La mecánica ya está hecha y probada.** Al entrar se elige entre **modo clásico**
(preguntas de los monumentos, el juego de siempre) y **modo repaso**; si se elige repaso,
se pide el curso y después el tema, y todas las preguntas de esa partida salen de ahí.
El resto del juego no cambia: mismas ciudades, misma ruta secreta, mismas pistas y mismos
Pokémon; el monumento pasa a ser solo el escenario.

Lo único que falta es el contenido:

- [ ] **Cargar los temas conforme avance el curso.** Van en la constante `BANCO_REPASO`
      del `index.html`, dentro de `"1"`, `"3"` o `"5"`. Justo encima hay un comentario con
      el formato y un ejemplo. Cada tema es una lista de preguntas con el mismo formato
      que las del `CITY_POOL`: tres opciones, la correcta la primera (el juego las baraja)
      y una explicación opcional.

Decisiones ya tomadas, por si hay que retomarlo:

- **Un solo tema por partida**, no varios mezclados: así se repasa un examen concreto.
- **Las 390 preguntas de geografía se quedan solo en modo clásico**, no aparecen como un
  tema de repaso.
- **Un tema funciona con las preguntas que tenga.** Una partida necesita 15 (5 ciudades ×
  3 monumentos); si el tema tiene menos, la bolsa se baraja y se encadena, igual que se
  hace con los Pokémon. Comprobado con un tema de 4 preguntas: rellena los 15 huecos sin
  dejar ninguno vacío.
- **Los cursos sin temas salen deshabilitados** y el menú avisa de que todavía no hay nada
  que repasar, para que la opción no lleve a una pantalla vacía.

---

## 💡 Explicaciones al fallar

El mecanismo **ya está hecho**: al fallar, el juego dice cuál era la respuesta correcta y,
si la pregunta trae explicación, la muestra con una bombilla. Lo que falta es el texto.

- [ ] **Escribir la explicación de las 330 preguntas de las once ciudades originales.**
      Las 60 de Cádiz y Huelva ya la tienen y sirven de ejemplo del tono: una frase, en
      lenguaje de niño, que dé el dato y el porqué. El campo es `exp` dentro de cada
      pregunta del `CITY_POOL`, y es opcional: sin él el juego solo dice cuál era la
      correcta, que ya es bastante.

- [ ] **Decidir si la explicación se muestra también al acertar.** Ahora solo sale al
      fallar. Para un juego de repaso quizá interese reforzar también el acierto, pero
      la pantalla de acierto ya lleva la pista de la siguiente ciudad y puede quedar
      cargada.

---

## 🟡 Jugabilidad que sigue pendiente

- [ ] **Fallar sigue sin costar nada.** Se puede reintentar la misma pregunta infinitas
      veces, y ahora además el juego dice cuál era la correcta, así que el segundo intento
      es seguro. Esto es deliberado —no frustrar al que se atasca, y que el fallo enseñe—
      pero deja de tener sentido en cuanto haya tiempo límite: ahí el coste natural es
      que reintentar consuma tiempo. Decidirlo junto con el punto de Carmen Sandiego.

- [ ] **Recargar la página pierde la partida.** Todo el estado vive en el objeto `state`
      en memoria. Un toque en recargar o que el móvil descarte la pestaña y se pierde la
      ruta, la Pokédex y todo lo resuelto. Con partidas de 5 ciudades jugadas en el móvil,
      esto va a pasar. Al guardarlo en `localStorage`, cuidado con `state.donePlaces`:
      usa objetos `Set`, que **no sobreviven a `JSON.stringify`** — hay que pasarlos a
      array al guardar y reconstruirlos al cargar.

- [ ] **Los huecos "???" de la Pokédex no significan nada.** `updatePokedex()` rellena
      hasta 6 huecos con los primeros Pokémon del pool que no se han visto, así que
      parece que faltan 6 concretos por encontrar cuando en realidad son decorativos.
      O se muestran tantos huecos como Pokémon queden de verdad en la ruta, o se quitan.

---

## 🔵 Limpieza y calidad

- [ ] **Los sprites de PokeAPI no tienen plan B.** Los `<img class="poke-img">` se cargan
      de `raw.githubusercontent.com` sin `onerror`, al contrario que las imágenes de
      escena. Sin red queda un hueco roto justo donde está el Pokémon, que es lo más
      llamativo de la pantalla. Poner al menos un emoji de recambio.

- [ ] **El `viewport` impide el zoom.** `maximum-scale=1.0, user-scalable=no` bloquea
      ampliar con los dedos. Se suele poner para que el móvil no haga zoom al tocar un
      campo de texto, pero aquí no hay ni un campo de texto: no aporta nada y estorba a
      quien necesite agrandar la letra.

- [ ] **Sin favicon.** La pestaña sale con el icono en blanco. Con una Poké Ball en SVG
      se arregla.

- [ ] **No es instalable como PasaporteLector.** No hay `manifest.json` ni service worker,
      así que no se puede "Añadir a pantalla de inicio" ni jugar sin conexión. Ahora que
      la música se sintetiza y las imágenes son locales, el juego **no necesita red para
      nada salvo los sprites**, así que como PWA funcionaría entero sin cobertura. Se
      puede copiar el enfoque de
      [pasaporte-lector](https://github.com/jmorecru/pasaporte-lector).

- [ ] **Un solo archivo de más de 2000 líneas.** La mayor parte son los datos del
      `CITY_POOL`. Editar o añadir preguntas obliga a navegar por un archivo enorme y hace
      los diffs de git ilegibles. Separar los datos a un `data/ciudades.js` y un
      `data/repaso.js` es el cambio que más facilita seguir añadiendo contenido, y va a
      notarse en cuanto el banco de repaso empiece a llenarse de temas.

- [ ] **Revisar las preguntas de Cádiz y Huelva en familia.** Las 60 se escribieron de una
      vez y, aunque están comprobadas, conviene que las lea alguien que conozca las dos
      ciudades: el primo Andrés y los abuelos son justo los expertos.

---

## ✅ Ya arreglado y verificado

### La respuesta correcta ya no es siempre el primer botón

Las 390 preguntas del `CITY_POOL` tienen `ans: 0`, y antes las opciones se pintaban en
ese orden: **se ganaba la partida pulsando siempre el primer botón**.
`setupPlacesForGame()` ahora baraja las opciones y recalcula el índice de la correcta
buscando su texto en el array barajado.

Se dejaron los datos con `ans: 0` a propósito: barajarlos a mano habría fijado para
siempre la posición de cada pregunta, y con 3 opciones eso se aprende rápido. Barajar en
tiempo de ejecución da una posición distinta en cada partida.

Verificado en Edge sin ventana, jugando **300 partidas completas**: la respuesta correcta
cae en la 1ª / 2ª / 3ª posición un 33,1% / 33,0% / 33,9% de las veces, con 3.900
preguntas respondidas y cero excepciones.

### Las 91 imágenes

Antes se referenciaban 77 imágenes y solo existían 2. Ahora están las 91 (13 ciudades ×
1 + 78 monumentos), todas de Wikimedia Commons y **todas con licencia libre**,
redimensionadas a 1200×800 como máximo y recomprimidas: 16,7 MB en total, unos 180 KB de
media. La atribución completa está en [CREDITOS.md](CREDITOS.md).

Un par de cosas aprendidas por el camino, por si hay que añadir más ciudades:

- La API de `pageimages` de Wikipedia devuelve para las ciudades **la bandera, el escudo
  o el mapa de situación**, no una foto. Para el Bernabéu llegó a bajar un mapa de Madrid.
  Lo que sí funciona es la propiedad **P18 de Wikidata**, que es la imagen representativa
  curada del sujeto.
- La búsqueda libre en Commons trae cosas muy raras: una maqueta de la catedral de Girona
  de un parque en miniatura, los planos de la Casa Batlló, una foto en sepia de barcas
  para el barrio de Triana. Las categorías de Commons (P373) son mejores, pero al final
  las últimas doce hubo que **elegirlas a mano mirándolas**.
- Se exige JPEG de al menos 1000 px y **orientación apaisada**: la escena del juego se
  recorta a 2,8:1 con `object-fit: cover`, así que una foto vertical de una torre se queda
  en una franja del centro y no se ve la torre.
- `images/madrid/retiro.jpg`, que venía con el proyecto, se sustituyó por una de Commons:
  no se sabía de dónde había salido ni con qué licencia, y el repositorio es público.

### La música

No había ningún mp3 y el botón solo servía para poner "⚠️ Sin audio". Ahora hay **tres
melodías originales de estilo 8 bits** —ciudad, combate y victoria— sintetizadas en el
navegador con la Web Audio API: melodía en onda cuadrada, bajo en triangular y percusión
de ruido filtrado en el tema de combate.

Se hizo así a propósito y no con ficheros: las bandas sonoras originales de Pokémon no se
pueden redistribuir en un repositorio público, y esto además no pesa nada, funciona sin
conexión y no hay que servir ningún archivo. La carpeta `audio/` se ha eliminado.

Verificado: afinación exacta (A4 = 440,00 Hz y C5 = 523,25 Hz), las dos voces de las tres
pistas están alineadas paso a paso, todas las notas son válidas, y al apagar la música no
queda ninguna voz sonando —hay que cortarlas a mano porque el planificador va medio
segundo por delante del reloj de audio—.

### Los botones de dos líneas ya no salen centrados

En pantallas estrechas, un botón cuyo nombre no cabe en una línea aparecía centrado
mientras los de al lado quedaban a la izquierda: se veía en Huelva con "Monumento a la Fe
Descubridora" y en Santiago con "Monasterio de San Martín Pinario".

La causa era que la regla base de `button` usa `display:flex` sin fijar `text-align`, así
que heredaba el `center` que los navegadores dan a los botones de fábrica. Con una sola
línea no se notaba, porque la caja del texto se ajusta al contenido y queda pegada a la
izquierda; en cuanto el texto se parte en dos, la caja pasa a ocupar todo el ancho y el
centrado sale a la luz. Arreglado con `text-align:left` en la regla base; los botones que
sí van centrados (`.sbtn`) ya lo pedían expresamente.

Medido en el navegador a un ancho en el que el texto se parte: antes las líneas de un
mismo botón empezaban en x=116 y x=173, y las de otro en x=110 y x=212, mientras el botón
de una sola línea empezaba en x=105. Ahora las tres empiezan en x=105.

### Los dos modos de juego

Al entrar se elige entre **modo clásico** y **modo repaso**, y si es repaso se pide curso
y tema. Está descrito arriba; lo único que falta es cargar el temario.

Verificado en Edge sin ventana: el flujo entero de tres pantallas, que con el banco vacío
los cursos salen deshabilitados y avisando, que las 15 preguntas de una partida de repaso
salen todas del tema elegido mientras los 15 monumentos siguen siendo los de sus ciudades,
que las opciones también se barajan en repaso, que un tema de 4 preguntas rellena los 15
huecos, y que el modo clásico sigue sacando sus 15 preguntas de los monumentos.

### La familia está repartida por el mapa

Cinco ciudades tienen familia, y **no se dice cuáles al empezar la partida**: aparecen por
sorpresa en el texto de bienvenida al llegar, y se les vuelve a mencionar en la pantalla de
victoria si la ruta pasó por allí. La pantalla de inicio solo suelta un aviso genérico de
que hay familia por ahí.

| Ciudad | Quién |
| --- | --- |
| Madrid | Los abuelos Elena y Juanchu |
| Sevilla | Los primos Sofía, Juan y Auxi |
| Cádiz | El primo Andrés |
| Huelva | Los abuelos Andrés y Felisa |
| Londres | Eduardo Jr. |

Están en la constante `FAMILIA` dentro de `showWin()` y en el `welcome` de cada ciudad;
añadir una más es tocar esos dos sitios. Hay una prueba que comprueba que ningún nombre ni
ninguna de esas ciudades se cuela en la pantalla de inicio.

Las pistas de `HINTS` tampoco mencionan a nadie, aunque las de Cádiz y Huelva llegaron a
hacerlo: si la pista dice quién vive allí, la sorpresa se destripa antes de llegar.

### Cádiz y Huelva

Añadidas con 6 monumentos y 5 preguntas cada uno (60 nuevas), sus dos pistas en `HINTS` y
sus 14 imágenes.

De paso mejora la variedad de las partidas: antes las ciudades intermedias se sorteaban
entre 4, así que salían casi siempre las mismas. Ahora se sortean entre 6. Medido en 300
partidas, Cádiz aparece en 139 y Huelva en 136.

### Otras comprobaciones que no hace falta repetir

- **Los datos están limpios**: 13 ciudades, 6 monumentos por ciudad, 5 preguntas por
  monumento (390), todas con 3 opciones, sin opciones repetidas dentro de una pregunta,
  sin monumentos duplicados dentro de una ciudad, ningún `ans` fuera de rango y ninguna
  ruta de imagen repetida. Las 91 imágenes referenciadas existen.
- **Todas las ciudades tienen pista en `HINTS`** menos Madrid, que no la necesita porque
  es siempre el punto de partida.
- **`generateRoute()` siempre devuelve 5 ciudades** distintas, con Londres o sin él.
- **No se repiten Pokémon** en una partida: se baraja un pool de 95 y solo se necesitan 15.
- **El modo repaso no filtra la pregunta ni la respuesta**: solo enseña el Pokémon que
  apareció y la pista que se consiguió.
- **Al fallar no se revela la pista** de la siguiente ciudad, solo la respuesta correcta.
- **No hay riesgo de inyección** al construir el HTML por concatenación: todo el texto que
  se pinta viene de constantes del propio archivo y no hay ninguna entrada de usuario.
