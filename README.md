# 🔴 Pokémon España: En Busca del Legendario

Juego web de geografía y cultura española para jugar en familia. La Smart-Rotom detecta
una ruta secreta de **5 ciudades** por la que huye un Pokémon legendario: hay que viajar,
investigar monumentos, responder preguntas sobre ellos y seguir las pistas hasta dar con
él.

Hecho para uso familiar, sin frameworks ni herramientas de compilación: HTML, CSS y
JavaScript que el navegador carga directamente.

**Jugar:** https://jmorecru.github.io/pokemon-espana/

## Dos modos

Al entrar se elige a qué se juega:

- **Modo clásico** — las preguntas son sobre los monumentos de cada ciudad.
- **Modo repaso** — la misma aventura, con las mismas ciudades y las mismas pistas, pero
  las preguntas salen del temario del colegio. Se elige curso (1º, 3º o 5º) y después el
  tema, y toda la partida sale de ahí. El monumento pasa a ser solo el escenario.

Los temas se cargan en la constante `BANCO_REPASO` de `data/repaso.js`, que lleva encima un
comentario con el formato y un ejemplo. Mientras no haya ninguno, el modo repaso lo avisa.

## Contra el reloj

Como en *¿Dónde está Carmen Sandiego?*, hay **una semana** para atrapar al legendario: de
lunes a domingo, parando a dormir por la noche. Son 96 horas útiles, y cada cosa cuesta:

| Acción | Coste |
| --- | --- |
| Investigar un monumento | 3 h |
| Viajar a otra ciudad | 8 h |
| Cruzar el mar | 12 h |
| Volver de una ciudad equivocada | lo mismo que costó ir |

## El mapa

Arriba se ve un mapa de la península con las ciudades colocadas por sus **coordenadas
reales**, el norte marcado y la frontera con Portugal dibujada. Se marca en rojo dónde
estáis, en verde por dónde habéis pasado y en amarillo los destinos que se pueden elegir.

Está porque todas las pistas hablan de direcciones —*sube al norte*, *va al levante*, *baja
al sur profundo*— y sin un mapa delante eso no significa nada para un niño: con él la pista
se razona en vez de adivinarse. Londres, que no cabe en el marco, sale en un recuadro
aparte con una flecha, como en los mapas de verdad.

Se puede plegar con el botón **🗺️ Mapa**, que en pantallas pequeñas viene bien.

Desde cada ciudad solo se ofrecen **3 destinos**: el bueno y dos señuelos. Si se acierta,
el rastro sigue; si no, allí no hay nada que hacer salvo volver, y se paga el viaje dos
veces. Por eso las pistas importan: una partida bien llevada cuesta unas 47 horas y sobra
margen para tres equivocaciones, pero ir probando ciudades a lo tonto no sale.

Fallar una pregunta no cobra una multa aparte: el monumento se queda sin resolver y no
suelta la pista, así que hay que volver a investigarlo y pagar otras 3 horas.

## Qué hace

- **Ruta aleatoria en cada partida**: Madrid siempre es el punto de partida, la ciudad
  final se sortea entre Barcelona, Santiago de Compostela, Salamanca, Girona y Valencia,
  y en el 35% de las partidas la ruta se sale de España y pasa por Londres.
- **13 ciudades**, con 6 monumentos cada una y 5 preguntas por monumento: 390 en total.
  En cada partida se sortean 3 monumentos por ciudad y una pregunta por monumento, y las
  opciones se barajan, así que no se repite ni se aprende de memoria.
- **Pistas geográficas**: cada acierto revela una pista sobre la siguiente ciudad de la
  ruta, nunca su nombre. Hay **6 por ciudad** y en cada partida se sortean 3, así que no
  se aprenden de memoria y ninguna se repite dentro de la misma ciudad.
- **Al fallar se aprende**: el juego dice cuál era la respuesta correcta y, cuando la
  pregunta lo necesita, explica por qué.
- **Pokédex**: un Pokémon distinto en cada monumento, y el legendario en la ciudad final.
- **Las pistas se quedan a la vista** en la pantalla de la ciudad donde se consiguieron,
  para no tener que apuntarlas.
- **Barra de ruta** que se va destapando: las ciudades por descubrir se ven como `?`.
- **Música 8 bits** de ciudad, de combate y de victoria, generada en el navegador.

## La familia en el mapa

Cinco ciudades tienen familia esperando, y **el juego no dice cuáles al empezar**: la
gracia es encontrárselos al llegar. Aparecen al entrar en su ciudad y vuelven a salir en
la pantalla de victoria si la ruta pasó por allí.

## Cómo funciona por dentro

- **Todo en el navegador**: HTML, CSS y JavaScript sin dependencias ni build. No hay
  servidor ni base de datos; la partida vive en memoria y se pierde al recargar, a
  propósito.
- **Los datos van aparte del código**, para que añadir contenido no obligue a bucear en
  un archivo enorme:

  | Archivo | Qué hay dentro |
  | --- | --- |
  | `data/ciudades.js` | Las 13 ciudades, sus 78 monumentos y las 390 preguntas |
  | `data/pistas.js` | Las 72 pistas, 6 por cada ciudad de destino |
  | `data/mapa.js` | La silueta de la península y la frontera con Portugal |
  | `data/repaso.js` | El temario del colegio, por curso y tema |
  | `data/pokemon.js` | Los legendarios y el catálogo de Pokémon |
  | `js/mapa.js` | Dibuja el mapa y coloca las ciudades por coordenadas |
  | `js/musica.js` | La afinación, las tres melodías y el sintetizador |
  | `js/juego.js` | El reloj, la ruta, las pantallas y el reparto de preguntas |
  | `styles.css` | Todo el aspecto |
  | `index.html` | 56 líneas: la estructura y poco más |
- **Imágenes**: 91 fotografías de Wikimedia Commons, todas con licencia libre, servidas
  desde el propio repositorio. La atribución está en [CREDITOS.md](CREDITOS.md).
- **Música**: sin ficheros de audio. Tres melodías originales de estilo 8 bits
  sintetizadas con la Web Audio API — melodía en onda cuadrada, bajo en triangular y
  percusión de ruido en el tema de combate.
- **Sprites de los Pokémon**: se cargan de [PokeAPI/sprites](https://github.com/PokeAPI/sprites).
  Es lo único que necesita conexión.
- **Hosting**: GitHub Pages.

## Añadirlo al móvil como una app

En **Safari** (en iPhone tiene que ser Safari), abre
https://jmorecru.github.io/pokemon-espana/ → botón **Compartir** → **Añadir a pantalla de
inicio** → **Añadir**. Queda con su icono de Poké Ball y se abre a pantalla completa, sin
la barra de direcciones. En Android es lo mismo desde el menú de Chrome.

Sigue necesitando conexión para cargar: no hay service worker todavía.

## Saber si estás viendo la última versión

Debajo del título salen la versión y su fecha, con el formato `v8.3 · 2026-09-08`. Si no
coincide con lo último que se publicó, el móvil está tirando de caché — pasa sobre todo
con el atajo de la pantalla de inicio en iOS, que se queda con los archivos pegados.

Para forzar la recarga en iOS: Ajustes → Safari → Borrar historial y datos, o borrar el
atajo y volver a añadirlo.

El número vive en un solo sitio, [js/version.js](js/version.js), y de ahí sale tanto el
sello de la cabecera como el de la pantalla de inicio.

## Ponerlo en marcha

No hace falta servidor ni instalar nada: basta abrir `index.html` con doble clic. Los
archivos de `data/` y `js/` se cargan como scripts normales, que el navegador sí acepta
desde `file://` — comprobado. Si prefieres servirlo en local:

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000.

## Qué falta

[PENDIENTES.md](PENDIENTES.md) tiene la lista, con el porqué de cada punto. Lo próximo es
**cargar el temario del colegio** en el banco del modo repaso, que es lo único que le falta
para cumplir del todo su propósito.

## Sobre los derechos

Proyecto familiar sin ánimo de lucro y sin publicidad. Pokémon es una marca de Nintendo,
Creatures Inc. y GAME FREAK; este juego no está asociado ni respaldado por ellos. Los
sprites no se redistribuyen: se enlazan al repositorio público de PokeAPI. Las
fotografías son de Wikimedia Commons con licencia libre y están acreditadas una por una
en [CREDITOS.md](CREDITOS.md). La música es original.
