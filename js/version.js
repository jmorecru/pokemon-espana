// Marca de version visible en pantalla.
//
// Sirve para comprobar de un vistazo si el movil esta viendo lo ultimo que se
// publico o una copia en cache. Con el juego anadido a la pantalla de inicio
// del iPhone esto pasa facil: iOS se queda con los ficheros pegados y uno se
// vuelve loco pensando que el cambio no se subio.
//
// Se sube a mano en cada despliegue, porque aqui no hay herramientas de
// compilacion a proposito. Al subirla hay que tocar dos sitios, y es adrede:
//
//   1. VERSION y VERSION_FECHA de este fichero, que es lo que se ve en pantalla.
//   2. El ?v=... de los <script> y del <link> del index.html, que es lo que
//      obliga al navegador a bajar los ficheros de nuevo en vez de tirar de
//      cache.
//
// Si el numero de pantalla no coincide con el que se acaba de publicar, es que
// el movil sigue con el index.html viejo: ahi el cache esta en el propio HTML.

const VERSION = "8.3";
const VERSION_FECHA = "2026-09-08";
