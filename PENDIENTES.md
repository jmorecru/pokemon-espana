# Temas pendientes

Revisión del juego hecha el **7 de septiembre de 2026**, al traerlo de Netlify a GitHub.
El código se ha subido **tal cual estaba**, sin tocar nada: aquí queda escrito todo lo
que se encontró, ordenado por gravedad, para decidir qué arreglar y en qué orden.

Referencias por línea sobre el `index.html` de ese primer commit.

---

## 🔴 Crítico

### La respuesta correcta es siempre el primer botón

- [ ] **Barajar las opciones de cada pregunta.**

  Las **330 preguntas** del `CITY_POOL` tienen `ans: 0` — comprobado una por una, sin
  una sola excepción. Y `setupPlacesForGame()` copia las opciones y el índice correcto
  tal cual (`index.html:1793-1794`), mientras que `openPlace()` las pinta en el orden
  del array (`index.html:1693`). Resultado: **un niño que pulse siempre el primer botón
  gana la partida entera sin leer ninguna pregunta.**

  Esto vacía de sentido el juego, así que es lo primero que hay que tocar. El arreglo es
  pequeño y va todo en un sitio: en `setupPlacesForGame()`, barajar `opts` y recalcular
  `ans` con la nueva posición de la opción correcta. No hay que tocar los datos.

  Se descartó barajar los datos a mano (mover el `ans` a un índice aleatorio en las 330
  preguntas) porque entonces cada partida repetiría siempre la misma posición para la
  misma pregunta, y con 3 opciones se aprende rápido.

---

## 🟠 Falta casi todo el contenido visual y sonoro

### 75 de las 77 imágenes no existen

- [ ] **Conseguir las imágenes de ciudades y monumentos.**

  El juego referencia **77 imágenes** (11 de ciudad + 66 de monumento) y en el
  repositorio solo hay **2**: `images/madrid/madrid.jpg` y `images/madrid/retiro.jpg`.
  Las carpetas de las otras 10 ciudades están creadas y vacías, con un `.gitkeep`, para
  que se vea dónde va cada cosa.

  No se nota como un error porque `buildSceneHtml()` pone un `onerror` que esconde la
  imagen que falla (`index.html:1519`): la escena se queda con el degradado de fondo y
  la etiqueta del sitio. Es decir, **el juego parece funcionar pero se juega casi a
  ciegas**, sin ver ni la ciudad ni el monumento del que se pregunta.

  Los nombres de fichero que espera cada ciudad están en el `CITY_POOL`
  (`index.html:447-1284`), en los campos `cityImg` e `img`. Ojo al buscarlas: tienen que
  ser imágenes libres o de licencia compatible (Wikimedia Commons, Unsplash), no
  cualquier cosa de una búsqueda de imágenes, porque el repositorio es público.

### No hay música

- [ ] **Conseguir las tres pistas de audio, o quitar el botón.**

  `AUDIO_TRACKS` (`index.html:441`) apunta a `audio/city.mp3`, `audio/battle.mp3` y
  `audio/legend.mp3`, y ninguno existe. Al pulsar el botón de música, `audio.play()`
  falla y el botón se queda en **"⚠️ Sin audio"** — que al menos avisa, pero deja un
  botón inútil a la vista.

  Decidir: o se buscan tres pistas libres (ciudad / combate / victoria) o se esconde el
  botón mientras no haya audio. Igual que con las imágenes, tiene que ser música de
  licencia libre; las bandas sonoras originales de Pokémon no se pueden subir a un
  repositorio público.

---

## 🟡 Jugabilidad

### Se puede resolver la ruta sin contestar una sola pregunta

- [ ] **Exigir resolver la ciudad antes de poder avanzar.**

  `travelTo()` (`index.html:1607`) incrementa `state.routeIndex` por el simple hecho de
  llegar a la ciudad correcta, sin comprobar si se ha investigado nada en la anterior.
  Y las ciudades equivocadas responden con el cartel de **"¡Sin señal de energía!"**
  (`index.html:1557`), que funciona como chivato: probando las 10 ciudades del mapa se
  descubre cuál es la siguiente de la ruta sin acertar ninguna pregunta.

  Encadenando eso, se llega a la ciudad final habiendo respondido cero preguntas, y allí
  **basta un acierto en cualquiera de los 3 monumentos** para ganar
  (`isFinalRouteCity()`, `index.html:1373`).

  Las pistas, que son el corazón del juego, quedan de adorno. Hay dos formas de cerrarlo
  y conviene elegir una a conciencia, porque cambian el tono del juego:

  1. **Bloquear el avance**: no dejar viajar hasta haber resuelto los 3 monumentos de la
     ciudad actual. Es lo más directo, pero castiga a quien se atasca en una pregunta.
  2. **Quitar el chivato**: que todas las ciudades no visitadas se vean igual, sin decir
     si el legendario pasó por allí, y que la única fuente de información sea la pista.
     Mantiene la libertad de moverse pero obliga a jugar.

### Fallar no cuesta nada

- [ ] **Decidir si un fallo tiene consecuencia.**

  `checkAns()` (`index.html:1709`) ante un fallo solo muestra "¡Pensadlo de nuevo!" y
  deja reintentar infinitas veces sobre la misma pregunta. Con 3 opciones, se acierta a
  la segunda o la tercera siempre.

  Puede estar bien así siendo un juego para niños — no frustrar es un objetivo legítimo —
  pero conviene que sea una decisión tomada y no un descuido. Alternativa suave: al
  fallar, volver a la pantalla de la ciudad y sortear otra pregunta del mismo monumento
  al reintentar (hay 5 por monumento, dan de sobra).

### Recargar la página pierde la partida

- [ ] **Guardar la partida en `localStorage`.**

  Todo el estado vive en el objeto `state` en memoria (`index.html:1286`). Un toque en
  recargar, un cierre de pestaña por accidente o que el móvil descarte la pestaña, y se
  pierde la ruta, la Pokédex y todo lo resuelto.

  Con un juego de 5 ciudades que dura un rato y que se juega en el móvil, esto va a
  pasar. Hay un detalle a tener en cuenta al implementarlo: `state.donePlaces` usa
  objetos `Set`, que **no sobreviven a `JSON.stringify`** — hay que convertirlos a array
  al guardar y reconstruirlos al cargar.

---

## 🔵 Limpieza y calidad

- [ ] **Código muerto: `isCorrectNext` nunca es cierto.** En `renderScreen()`
      (`index.html:1544`) y `openPlace()` (`index.html:1657`) se calcula si la ciudad
      actual es la *siguiente* de la ruta, pero `travelTo()` ya incrementó `routeIndex`
      al llegar, así que en ese momento `isCurrent` siempre es `true` y la rama de
      `isCorrectNext` no se ejecuta jamás. Confunde al leer el código y hace pensar que
      hay un caso contemplado que no existe. Quitarlo, y tenerlo en cuenta si se toca lo
      del avance obligatorio, más arriba.

- [ ] **Los sprites de PokeAPI no tienen plan B.** Los `<img class="poke-img">`
      (`index.html:1631` y `index.html:1686`) se cargan de `raw.githubusercontent.com`
      sin `onerror`, al contrario que las imágenes de escena. Sin red o con el
      repositorio caído, queda un hueco roto justo donde está el Pokémon, que es lo más
      llamativo de la pantalla. Poner al menos un emoji de recambio.

- [ ] **El `viewport` impide el zoom.** `maximum-scale=1.0, user-scalable=no`
      (`index.html:5`) bloquea ampliar con los dedos. Se suele poner para que el móvil
      no haga zoom automático al tocar un campo de texto, pero **aquí no hay ni un campo
      de texto**, así que no aporta nada y estorba a quien necesite agrandar la letra.
      Quitar `maximum-scale` y `user-scalable`.

- [ ] **Los huecos "???" de la Pokédex no significan nada.** `updatePokedex()`
      (`index.html:1473`) rellena hasta 6 huecos con los primeros Pokémon del pool que
      aún no se han visto. Da la impresión de que faltan 6 concretos por encontrar,
      cuando en realidad son decorativos y no tienen relación con la partida en curso.
      O se enseñan tantos huecos como Pokémon queden de verdad por descubrir en la ruta,
      o se quitan.

- [ ] **Sin favicon.** La pestaña sale con el icono en blanco. Con una Poké Ball en SVG
      o un `.ico` pequeño se arregla.

- [ ] **No es instalable como PasaporteLector.** No hay `manifest.json` ni service
      worker, así que no se puede "Añadir a pantalla de inicio" y abrir a pantalla
      completa, ni jugar sin conexión. Siendo un juego para el móvil y sin backend,
      encaja especialmente bien como PWA: se puede copiar el enfoque de
      [pasaporte-lector](https://github.com/jmorecru/pasaporte-lector).

- [ ] **Un solo archivo de 1884 líneas.** De ellas, **921 son solo datos** del
      `CITY_POOL` (`index.html:447-1284`), más 318 de CSS y el resto de lógica. Editar o
      añadir preguntas obliga a navegar por un archivo enorme y hace los diffs de git
      difíciles de leer. Separar los datos a un `data/ciudades.js` (o un `.json` cargado
      con `fetch`) sería el cambio que más facilita seguir añadiendo contenido. No urge:
      el juego funciona y el archivo único no da problemas al desplegar.

---

## ✅ Comprobado y correcto (no hace falta volver a mirarlo)

Para no repetir trabajo, esto se verificó en la revisión del 7/9/2026 y está bien:

- **Los datos del `CITY_POOL` están limpios**: 11 ciudades, 6 monumentos por ciudad,
  5 preguntas por monumento (330), todas con 3 opciones, sin opciones repetidas dentro
  de una pregunta, sin nombres de monumento duplicados dentro de una ciudad y sin ningún
  `ans` fuera de rango. Ninguna ruta de imagen se repite.
- **`generateRoute()` siempre devuelve 5 ciudades**, con Londres o sin él, y nunca
  repite ciudad. Madrid siempre primero, la final siempre de la lista de 5 finales.
- **No se repiten Pokémon** dentro de una partida: `assignRandomPokemonToPlaces()`
  baraja un pool de 95 y solo necesita 15.
- **Las pistas no se repiten** dentro de la misma ciudad mientras queden sin usar
  (`getHintForCurrentCity()`), y hay 2 por cada ciudad de destino.
- **El modo repaso no filtra la pregunta ni la respuesta**: solo enseña el Pokémon y la
  pista ya conseguida.
- **No hay riesgo de inyección** al construir el HTML con concatenación: todo el texto
  que se pinta viene de constantes del propio archivo, no hay ninguna entrada de usuario
  en todo el juego.
