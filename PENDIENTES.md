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

## 📚 El banco de preguntas: repaso del colegio

Ahora las 390 preguntas son de geografía y monumentos. La idea es que el juego sirva
además para repasar lo que estudian los niños.

- [ ] **Preguntas por curso y tema, no por monumento.** El temario lo irás pasando tú
      (primero, tercero y quinto), y de ahí se sacan las preguntas de repaso.

- [ ] **Elegir curso y temas al empezar la partida.** Una pantalla de selección antes de
      encender la Smart-Rotom, y las preguntas de esa partida salen solo de lo elegido.

**Lo que hay que replantear al hacerlo.** Hoy cada pregunta vive *dentro* de su monumento
en el `CITY_POOL`, y eso deja de valer: hará falta un banco aparte, indexado por curso y
tema, y que el monumento solo aporte el escenario. Es exactamente el motivo por el que
merece la pena separar los datos del `index.html` (ver más abajo). Hay que decidir
también si las preguntas de monumentos se conservan como un "tema" más —geografía de
España— para no perder las 390 que ya están escritas y comprobadas.

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
      los diffs de git ilegibles. Separar los datos a un `data/ciudades.js` es el cambio
      que más facilita seguir añadiendo contenido, y es **requisito práctico** para el
      banco de preguntas por temario.

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

### Cádiz y Huelva

Añadidas con 6 monumentos y 5 preguntas cada uno (60 nuevas), sus dos pistas en `HINTS` y
sus 14 imágenes. Cádiz es la ciudad del **primo Andrés** y Huelva la de **los abuelos**,
igual que Londres es la de Eduardo Jr.: se les menciona en el texto de bienvenida de su
ciudad, en la pantalla de inicio y en la de victoria si la ruta pasó por allí.

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
