# 🔴 Pokémon España: En Busca del Legendario

Juego web de geografía y cultura española para jugar en familia. La Smart-Rotom detecta
una ruta secreta de **5 ciudades** por la que huye un Pokémon legendario: hay que viajar,
investigar monumentos, responder preguntas sobre ellos y seguir las pistas hasta dar con
él.

Hecho para uso familiar, sin frameworks ni herramientas de compilación: un único
`index.html` con el CSS y el JavaScript dentro.

## Qué hace

- **Ruta aleatoria en cada partida**: Madrid siempre es el punto de partida, la ciudad
  final se sortea entre Barcelona, Santiago de Compostela, Salamanca, Girona y Valencia,
  y en el 35% de las partidas la ruta se sale de España y pasa por Londres.
- **11 ciudades**, con 6 monumentos cada una y 5 preguntas por monumento (330 en total).
  En cada partida se sortean 3 monumentos por ciudad y una pregunta por monumento, así
  que no se repite.
- **Pistas geográficas**: cada acierto revela una pista sobre la siguiente ciudad de la
  ruta, no su nombre.
- **Pokédex**: un Pokémon distinto en cada monumento, y el legendario en la ciudad final.
- **Modo repaso**: al volver a una ciudad ya resuelta se puede consultar qué Pokémon
  apareció en cada sitio y qué pista dio.
- **Barra de ruta** que se va destapando: las ciudades por descubrir se ven como `?`.

## Cómo funciona por dentro

- **Todo en el navegador**: HTML, CSS y JavaScript en un solo archivo, sin dependencias
  ni build. No hay servidor ni base de datos; la partida vive en memoria.
- **Sprites de los Pokémon**: se cargan de [PokeAPI/sprites](https://github.com/PokeAPI/sprites).
- **Hosting**: GitHub Pages.

## Ponerlo en marcha

No hace falta servidor ni instalar nada: basta abrir `index.html` con doble clic. Si
prefieres servirlo en local:

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000.

## Estado actual

El juego es jugable de principio a fin, pero **le faltan cosas importantes** y tiene un
fallo que permite ganar sin jugar. Está todo detallado, con el porqué de cada punto, en
[PENDIENTES.md](PENDIENTES.md). Lo más gordo, en dos líneas:

- La respuesta correcta es siempre el primer botón, porque las opciones no se barajan.
- De las 77 imágenes de ciudades y monumentos solo hay 2; el resto de escenarios se ven
  vacíos. Tampoco hay música.

## Sobre los derechos

Proyecto familiar sin ánimo de lucro y sin publicidad. Pokémon es una marca de Nintendo,
Creatures Inc. y GAME FREAK; este juego no está asociado ni respaldado por ellos. Los
sprites no se redistribuyen: se enlazan al repositorio público de PokeAPI.
