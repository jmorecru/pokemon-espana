# 🔴 Pokémon España: En Busca del Legendario

Juego web de geografía y cultura española para jugar en familia. La Smart-Rotom detecta
una ruta secreta de **5 ciudades** por la que huye un Pokémon legendario: hay que viajar,
investigar monumentos, responder preguntas sobre ellos y seguir las pistas hasta dar con
él.

Hecho para uso familiar, sin frameworks ni herramientas de compilación: un único
`index.html` con el CSS y el JavaScript dentro.

**Jugar:** https://jmorecru.github.io/pokemon-espana/

## Qué hace

- **Ruta aleatoria en cada partida**: Madrid siempre es el punto de partida, la ciudad
  final se sortea entre Barcelona, Santiago de Compostela, Salamanca, Girona y Valencia,
  y en el 35% de las partidas la ruta se sale de España y pasa por Londres.
- **13 ciudades**, con 6 monumentos cada una y 5 preguntas por monumento: 390 en total.
  En cada partida se sortean 3 monumentos por ciudad y una pregunta por monumento, y las
  opciones se barajan, así que no se repite ni se aprende de memoria.
- **Pistas geográficas**: cada acierto revela una pista sobre la siguiente ciudad de la
  ruta, no su nombre.
- **Al fallar se aprende**: el juego dice cuál era la respuesta correcta y, cuando la
  pregunta lo necesita, explica por qué.
- **Pokédex**: un Pokémon distinto en cada monumento, y el legendario en la ciudad final.
- **Modo repaso**: al volver a una ciudad ya resuelta se puede consultar qué Pokémon
  apareció en cada sitio y qué pista dio, sin volver a ver la pregunta.
- **Barra de ruta** que se va destapando: las ciudades por descubrir se ven como `?`.
- **Música 8 bits** de ciudad, de combate y de victoria, generada en el navegador.

## La familia en el mapa

Tres ciudades son de los suyos, y el juego los menciona cuando la ruta pasa por allí:

- **Londres** — Eduardo Jr.
- **Cádiz** — el primo Andrés.
- **Huelva** — los abuelos.

## Cómo funciona por dentro

- **Todo en el navegador**: HTML, CSS y JavaScript en un solo archivo, sin dependencias
  ni build. No hay servidor ni base de datos; la partida vive en memoria.
- **Imágenes**: 91 fotografías de Wikimedia Commons, todas con licencia libre, servidas
  desde el propio repositorio. La atribución está en [CREDITOS.md](CREDITOS.md).
- **Música**: sin ficheros de audio. Tres melodías originales de estilo 8 bits
  sintetizadas con la Web Audio API — melodía en onda cuadrada, bajo en triangular y
  percusión de ruido en el tema de combate.
- **Sprites de los Pokémon**: se cargan de [PokeAPI/sprites](https://github.com/PokeAPI/sprites).
  Es lo único que necesita conexión.
- **Hosting**: GitHub Pages.

## Ponerlo en marcha

No hace falta servidor ni instalar nada: basta abrir `index.html` con doble clic. Si
prefieres servirlo en local:

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000.

## Qué falta

[PENDIENTES.md](PENDIENTES.md) tiene la lista, con el porqué de cada punto. Lo próximo es
grande: convertirlo en un **Carmen Sandiego** (tiempo límite, cada investigación y cada
viaje consumen tiempo, y solo 3 destinos posibles desde cada ciudad) y usar el banco de
preguntas como **repaso del temario del colegio**, eligiendo curso y temas al empezar.

## Sobre los derechos

Proyecto familiar sin ánimo de lucro y sin publicidad. Pokémon es una marca de Nintendo,
Creatures Inc. y GAME FREAK; este juego no está asociado ni respaldado por ellos. Los
sprites no se redistribuyen: se enlazan al repositorio público de PokeAPI. Las
fotografías son de Wikimedia Commons con licencia libre y están acreditadas una por una
en [CREDITOS.md](CREDITOS.md). La música es original.
