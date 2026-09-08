# Temas pendientes

Última revisión: **7 de septiembre de 2026**. Versión publicada: **8.0**.

> **Al desplegar, subir la versión.** Hay que tocar dos sitios y es adrede: `VERSION` y
> `VERSION_FECHA` en [js/version.js](js/version.js), que es lo que se ve en pantalla, y el
> `?v=...` de los `<script>` y del `<link>` de [index.html](index.html), que es lo que
> obliga al navegador a bajar los archivos otra vez. Sin esto no hay forma de saber si el
> móvil está viendo lo último o una copia en caché.

---

## 🎯 Lo siguiente: el temario

La mecánica del modo repaso está hecha y probada. **Lo único que falta es el contenido.**

- [ ] **Cargar los temas conforme avance el curso.** Van en la constante `BANCO_REPASO`
      de `data/repaso.js`, dentro de `"1"`, `"3"` o `"5"`. Justo encima hay un comentario con
      el formato y un ejemplo. Cada tema es una lista de preguntas igual que las del
      de las ciudades: tres opciones, la correcta la primera (el juego las baraja) y una
      explicación opcional que se muestra al fallar.

      El temario se puede pasar **en fotos** del libro o de la libreta: se leen y se
      convierten en preguntas. Conviene una página por foto, plana y sin reflejos, y que
      se vea el título o el número del tema.

Decisiones ya tomadas, por si hay que retomarlo:

- **Un solo tema por partida**, no varios mezclados: así se repasa un examen concreto.
- **Las 390 preguntas de geografía se quedan solo en modo clásico**, no aparecen como
  tema de repaso.
- **Un tema funciona con las preguntas que tenga.** Una partida necesita 15 (5 ciudades ×
  3 monumentos); si el tema tiene menos, la bolsa se baraja y se encadena. Comprobado con
  un tema de 4 preguntas: rellena los 15 huecos sin dejar ninguno vacío.
- **Los cursos sin temas salen deshabilitados** y el menú avisa, para que la opción no
  lleve a una pantalla vacía.

---

## 💡 Explicaciones al fallar

El mecanismo **ya está hecho**: al fallar, el juego dice cuál era la respuesta correcta y,
si la pregunta trae explicación, la muestra con una bombilla. Falta el texto.

- [ ] **Escribir la explicación de las 300 preguntas que aún no la tienen.** Van 90 de
      390 (23%): las 60 de Cádiz y Huelva más las 30 de Madrid. El campo es `exp` dentro
      de cada pregunta de `data/ciudades.js`, y es opcional: sin él el juego solo dice cuál
      era la correcta, que ya es bastante.

      El tono, ya fijado en las 90 escritas: **una sola frase**, en lenguaje de niño, que
      dé el dato y el porqué, y que enseñe algo que la pregunta no decía. Se escriben con
      sus acentos —las lee un niño— y sin comillas dobles, que romperían la cadena.

      Quedan por hacer, por ciudades: Bilbao, Sevilla, Barcelona, Girona, Granada,
      Valencia, Toledo, Santiago de Compostela, Salamanca y Londres, 30 cada una.

- [ ] **Decidir si la explicación se muestra también al acertar.** Ahora solo sale al
      fallar. Para un juego de repaso quizá interese reforzar también el acierto, pero la
      pantalla de acierto ya lleva la pista de la siguiente ciudad y puede quedar cargada.

---

## 🟡 Jugabilidad

- [ ] **Afinar el reloj después de jugarlo en familia.** Los números están calculados y
      medidos (ver abajo), pero lo que dirá si están bien es ver a los niños jugar. Todo
      está en la constante `TIEMPO` de `js/juego.js`: cambiar el coste de investigar o de
      viajar es tocar un número.

- [ ] **Comprobar en el iPhone que ya suena la música.** El arreglo está hecho y
      razonado (ver abajo), pero **no se puede verificar desde el ordenador**: hace falta
      abrirlo en el teléfono, darle al botón de música y ver si suena, con el interruptor
      lateral en silencio y sin él. Si sigue sin sonar, el siguiente sospechoso es el
      modo de bajo consumo, que en iOS también corta el audio de fondo.

---

## 🔵 Limpieza y calidad

- [ ] **Jugar sin conexión.** Ya se puede añadir a la pantalla de inicio con su icono y
      a pantalla completa (ver abajo), pero **sigue necesitando red para cargar**: falta el
      service worker. Con la música sintetizada, las imágenes en local y los sprites con
      recambio dibujado, el juego funcionaría entero sin cobertura.

      **Se ha dejado a propósito para más adelante.** Un service worker sirve los archivos
      desde su propia caché, y mientras el juego siga cambiando cada semana el riesgo es
      justo el que queremos evitar: que el móvil se quede con una versión vieja y no se
      note. Cuando el juego se asiente, se hace con una caché versionada que se limpia al
      cambiar `VERSION`.

- [ ] **Revisar las preguntas de Cádiz y Huelva en familia.** Las 60 se escribieron de una
      vez y, aunque están comprobadas, conviene que las lea alguien que conozca las dos
      ciudades: el primo Andrés y los abuelos son justo los expertos.

- [ ] **Llevar el arreglo del audio a PasaporteLector.** Tiene el mismo problema y por la
      misma razón: `js/ambient.js` usa un `AudioContext` pelado. El arreglo es el mismo
      que está aquí en `js/musica.js` y son unas veinte líneas. Está en otro repositorio,
      así que se hará cuando se diga.

---

## ❌ Descartado

- **Guardar la partida.** Se decidió no hacerlo: una partida dura una sesión y recargar
  empieza una nueva. No volver a proponerlo.
- **Volver a una ciudad ya resuelta.** La persecución va solo hacia delante.

---

## ✅ Ya arreglado y verificado

### El archivo único, troceado

Eran 2706 líneas en un solo `index.html`. Ahora los datos van aparte del código:

| Archivo | Líneas |
| --- | --- |
| `data/ciudades.js` | 996 |
| `js/juego.js` | 915 |
| `styles.css` | 377 |
| `js/musica.js` | 237 |
| `data/repaso.js` | 57 |
| `data/pistas.js` | 54 |
| `data/pokemon.js` | 37 |
| `index.html` | 56 |

Se hizo **con un script**, no a mano, para que el contenido saliera byte a byte igual.
Comprobado después: los 85 símbolos de nivel superior siguen estando —ninguno perdido,
ninguno inventado—, el CSS es idéntico carácter a carácter, y las 54 comprobaciones del
banco de pruebas pasan.

Se cargan como **scripts clásicos**, no como módulos ES, a propósito: el navegador acepta
`<script src>` relativo desde `file://` pero **no** acepta módulos ni `fetch`. Así se
sigue pudiendo abrir el juego con doble clic, que es como se juega en casa. Verificado
lanzando el banco de pruebas por `file://`, no por servidor.

### Se puede añadir al móvil como una app

`manifest.json` con nombre, colores y iconos, más las etiquetas que iOS necesita aparte:
no admite SVG en el `apple-touch-icon`, así que va un PNG de 180, y las versiones antiguas
de Safari ignoran el manifiesto y solo miran las `apple-*`. Con
`apple-mobile-web-app-capable` se abre a pantalla completa, sin barra de direcciones.

Los iconos (180, 192, 512 y un 512 *maskable* con más margen, que Android recorta en
círculo) se dibujan con un script a 8x y se reducen, para que los bordes salgan suaves.

### El sello de versión

La versión sale en la cabecera y en la pantalla de inicio, y vive en un solo sitio,
`js/version.js`. Sirve para lo de siempre: saber si el móvil está viendo lo último o una
copia en caché, que con el atajo de iOS es fácil que se quede pegada.

Los `<script>` y el `<link>` llevan `?v=` para forzar la recarga. Si el número de pantalla
no coincide con lo publicado, el caché está en el propio `index.html`.

### El audio en iPhone

No sonaba en el iPhone, y tampoco en PasaporteLector. Los dos usaban un `AudioContext`
pelado, sin ningún elemento `<audio>`, que es justo la configuración que **el interruptor
lateral del teléfono silencia**: iOS manda ese sonido por la vía del timbre en vez de por
la de la música.

El arreglo: al encender la música se pone a sonar en bucle un WAV mudo de 444 bytes en un
`<audio playsinline>`. Con un elemento de audio de verdad reproduciéndose, iOS cambia a la
vía de la música y la Web Audio se oye igual que un vídeo, con el interruptor en silencio o
sin él. Se para al apagar la música para no dejar la sesión abierta.

Dos arreglos más de iOS por el camino: el contexto se comprueba contra `"running"` en vez
de solo `"suspended"`, porque iOS tiene un estado propio `"interrupted"` en el que cae al
bloquear el teléfono; y al volver a la pestaña se reanuda, que si no la música moría en
silencio.

**Esto no se ha podido verificar**: hace falta un iPhone. Queda arriba como pendiente de
comprobar.

### Cuatro detalles de acabado

- **Favicon**: una Poké Ball en SVG con la bandera, incrustada en el HTML, sin fichero.
- **El zoom ya funciona**: fuera `maximum-scale` y `user-scalable`. Bloquearlo se hace para
  que el móvil no amplíe al tocar un campo de texto, y aquí no hay ni uno.
- **Los sprites tienen plan B**: si PokeAPI no responde, sale una Poké Ball dibujada en vez
  de un hueco roto justo donde va el Pokémon.
- **La Pokédex ya no miente**: rellenaba los huecos con Pokémon del catálogo que no se
  hubieran visto, así que siempre salían seis y parecía que faltaban seis concretos. Ahora
  hay tantos huecos como queden de verdad en la ruta: 13 al empezar, uno menos por captura.

### El modelo Carmen Sandiego

El juego dejó de ser "visita monumentos y contesta" para ser una persecución contra el
reloj. Son cuatro piezas que funcionan juntas:

**El reloj.** Se dispone de la semana entera, de lunes a domingo, parando a dormir: se
está despierto de 08:00 a 22:00 y el domingo la búsqueda acaba a las 20:00. Salen
**96 horas** exactas. Si se agotan, el legendario escapa y se pierde la partida.

**Lo que cuesta cada cosa** (constante `TIEMPO`):

| Acción | Coste |
| --- | --- |
| Investigar un monumento | 3 h |
| Viajar a otra ciudad | 8 h |
| Cruzar el mar a Londres | 12 h |
| Volver de una ciudad equivocada | lo mismo que costó ir |

**Solo 3 destinos** desde cada ciudad, como en Carmen Sandiego: el bueno y dos señuelos.
Nunca se ofrece una ciudad por la que ya se ha pasado, porque encontrarse un "sin señal"
en una de ellas confundiría.

**Equivocarse de ciudad** deja tirado: allí no se ofrece ningún destino, solo el botón de
volver, y la vuelta cuesta lo mismo que la ida. Se pueden investigar sus monumentos, pero
solo dicen que allí no hay nada — ni pregunta ni pista — y gastan sus 3 horas igual.

**Fallar una pregunta no cobra una multa aparte.** El castigo es que el monumento se queda
sin resolver y no suelta la pista, así que hay que volver a entrar y pagar otras 3 horas.

Números medidos jugando 200 partidas en Edge sin ventana: una partida perfecta —cuatro
viajes y una investigación por ciudad— cuesta **47 h de 96**, con una media de 49,4 h
cuando la ruta cruza a Londres. El margen que queda da para **3 viajes equivocados** o
16 investigaciones de más. Las 200 se ganaron sin una sola excepción.

También verificado: que el reloj duerme (a las 14 h de juego marca martes a las 08:00),
que el domingo a las 19:00 quedan 96 − 95 = 1 h, que los tres destinos incluyen siempre el
bueno, que la ruta no avanza al equivocarse, que investigar en la ciudad equivocada no da
ninguna pista, que fallar no cobra de más pero deja el monumento sin resolver, y que al
agotarse el tiempo aparece la pantalla de fin con su botón de reintentar.

De paso desapareció el agujero que tenía el juego: antes se podía descubrir la ruta entera
probando las 13 ciudades sin contestar una sola pregunta, porque viajar era gratis y el
cartel de "¡Sin señal!" hacía de chivato. Y se fue el código muerto de `isCorrectNext`.

### Los dos modos de juego

Al entrar se elige entre **modo clásico** (preguntas de los monumentos) y **modo repaso**
(curso → tema → preguntas del temario). El resto del juego es idéntico: mismas ciudades,
misma ruta, mismas pistas, mismo reloj; el monumento pasa a ser solo el escenario.

Verificado: el flujo de las tres pantallas, que con el banco vacío los cursos salen
deshabilitados y avisando, que las 15 preguntas de una partida de repaso salen todas del
tema elegido mientras los monumentos siguen siendo los de sus ciudades, que las opciones
también se barajan en repaso, y que el modo clásico sigue sacando sus preguntas de los
monumentos.

### La familia está repartida por el mapa

Cinco ciudades tienen familia, y **no se dice cuáles al empezar**: aparecen por sorpresa en
el texto de bienvenida al llegar, y se les vuelve a mencionar al ganar si la ruta pasó por
allí. La pantalla de inicio solo suelta un aviso genérico.

| Ciudad | Quién |
| --- | --- |
| Madrid | Los abuelos Elena y Juanchu |
| Sevilla | Los primos Sofía, Juan y Auxi |
| Cádiz | El primo Andrés |
| Huelva | Los abuelos Andrés y Felisa |
| Londres | Eduardo Jr. |

Están en la constante `FAMILIA` dentro de `showWin()` y en el `welcome` de cada ciudad;
añadir una más es tocar esos dos sitios. Ni las pistas de `HINTS` ni el aviso del reloj
mencionan a nadie ni a sus ciudades — llegaron a hacerlo y se quitó, porque destripaba la
sorpresa antes de llegar. Hay una prueba que lo comprueba.

### La respuesta correcta ya no es siempre el primer botón

Las 390 preguntas de `data/ciudades.js` tienen `ans: 0`, y antes las opciones se pintaban en ese
orden: **se ganaba la partida pulsando siempre el primer botón**. `setupPlacesForGame()`
baraja ahora las opciones y recalcula el índice de la correcta buscando su texto.

Se dejaron los datos con `ans: 0` a propósito: barajarlos a mano habría fijado para siempre
la posición de cada pregunta, y con 3 opciones eso se aprende rápido.

### Las 91 imágenes

Antes se referenciaban 77 y solo existían 2. Ahora están las 91 (13 ciudades + 78
monumentos), todas de Wikimedia Commons y **todas con licencia libre**, a 1200×800 como
máximo: 16,7 MB, unos 180 KB de media. La atribución está en [CREDITOS.md](CREDITOS.md).

Aprendido por el camino, por si hay que añadir más ciudades:

- La API de `pageimages` de Wikipedia devuelve para las ciudades **la bandera, el escudo o
  el mapa de situación**, no una foto. Para el Bernabéu llegó a bajar un mapa de Madrid.
  Lo que funciona es la propiedad **P18 de Wikidata**.
- La búsqueda libre en Commons trae cosas muy raras: una maqueta de la catedral de Girona
  de un parque en miniatura, los planos de la Casa Batlló, una foto en sepia de barcas para
  el barrio de Triana. Las categorías (P373) son mejores, pero las últimas doce hubo que
  **elegirlas a mano mirándolas**.
- Se exige JPEG de al menos 1000 px y **orientación apaisada**: la escena se recorta a
  2,8:1 con `object-fit: cover`, así que una foto vertical de una torre se queda en una
  franja del centro.

### La música

No había ningún mp3 y el botón solo servía para poner "⚠️ Sin audio". Ahora hay **tres
melodías originales de estilo 8 bits** —ciudad, combate y victoria— sintetizadas en el
navegador con la Web Audio API: melodía en onda cuadrada, bajo en triangular y percusión de
ruido filtrado en el combate.

Se hizo así a propósito: las bandas sonoras originales de Pokémon no se pueden redistribuir
en un repositorio público, y esto no pesa nada, funciona sin conexión y no hay que servir
ningún archivo. Verificado: afinación exacta (A4 = 440,00 Hz), las dos voces alineadas paso
a paso, y al apagar no queda ninguna voz sonando.

### Cádiz y Huelva

Añadidas con 6 monumentos y 5 preguntas cada uno (60 nuevas), sus dos pistas y sus 14
imágenes. De paso mejoró la variedad: las ciudades intermedias se sorteaban entre 4 y ahora
entre 6.

### Los botones de dos líneas ya no salen centrados

La regla base de `button` usa `display:flex` sin fijar `text-align`, así que heredaba el
`center` de fábrica. Con una línea no se notaba; en cuanto el texto se partía, la caja
ocupaba todo el ancho y el texto se centraba, descuadrado respecto a los de al lado.
Arreglado con `text-align:left`. Medido: antes las líneas de un mismo botón empezaban en
x=116 y x=173; ahora todas en x=105, igual que las de una sola línea.

### Otras comprobaciones que no hace falta repetir

- **Los datos están limpios**: 13 ciudades, 6 monumentos por ciudad, 5 preguntas por
  monumento (390), todas con 3 opciones, sin repetidas, sin `ans` fuera de rango y sin
  rutas de imagen duplicadas. Las 91 imágenes referenciadas existen.
- **Todas las ciudades tienen pista** menos Madrid, que no la necesita.
- **`generateRoute()` siempre devuelve 5 ciudades** distintas, con Londres o sin él.
- **No se repiten Pokémon** en una partida: se baraja un pool de 95 y se necesitan 15.
- **Al fallar no se revela la pista** de la siguiente ciudad, solo la respuesta correcta.
- **No hay riesgo de inyección**: todo el texto que se pinta viene de constantes del propio
  archivo y no hay ninguna entrada de usuario.
