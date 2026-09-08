// El mapa: la silueta de la Peninsula Iberica y la frontera con Portugal.
//
// Son listas de puntos [longitud, latitud] en grados de verdad. No es un mapa
// exacto —es una silueta simplificada— pero si estan los accidentes que la
// hacen reconocible de un vistazo: la punta de Fisterra, las rias gallegas, el
// cabo da Roca asomando al oeste, el estrecho de Gibraltar, el cabo de Gata, el
// delta del Ebro y el cabo de la Nao.
//
// Al anadir una ciudad no hay que tocar nada de aqui: las ciudades se colocan
// por sus propias coordenadas (campos lat y lon del CITY_POOL) pasadas por la
// proyeccion de js/mapa.js.

// Contorno de la peninsula, en el sentido de las agujas del reloj empezando por
// Fisterra, la punta noroeste.
const SILUETA = [
  // Costa gallega y cantabrica, de oeste a este
  [-9.28, 42.91], [-9.21, 43.16], [-8.40, 43.37], [-7.86, 43.77],
  [-7.69, 43.79], [-7.04, 43.54], [-6.54, 43.54], [-5.85, 43.66],
  [-5.66, 43.54], [-5.06, 43.46], [-3.80, 43.46], [-3.01, 43.38],
  [-2.00, 43.32], [-1.79, 43.38],
  // Los Pirineos, frontera con Francia
  [-1.30, 43.05], [-0.75, 42.95], [0.20, 42.72], [0.70, 42.70],
  [1.45, 42.60], [1.73, 42.50], [2.30, 42.45], [3.17, 42.43],
  // Costa mediterranea, de norte a sur
  [3.28, 42.32], [2.79, 41.67], [2.17, 41.35], [1.25, 41.10],
  [0.87, 40.72], [0.40, 40.36], [0.03, 39.98], [-0.33, 39.44],
  [0.22, 38.73], [-0.48, 38.34], [-0.69, 37.63], [-1.00, 37.58],
  [-1.58, 37.40], [-2.19, 36.72], [-2.46, 36.83], [-3.52, 36.72],
  [-4.42, 36.71], [-4.88, 36.50], [-5.35, 36.13],
  // Tarifa: el punto mas al sur de la peninsula
  [-5.61, 36.00],
  // Costa atlantica andaluza, hacia el oeste
  [-6.30, 36.53], [-6.35, 36.79], [-6.95, 37.25], [-7.42, 37.17],
  // Costa de Portugal, de sur a norte
  [-7.93, 37.02], [-8.99, 37.02], [-8.87, 37.95], [-8.90, 38.45],
  [-9.50, 38.78], [-9.38, 39.36], [-8.86, 40.15], [-8.68, 41.15],
  [-8.83, 41.69], [-8.88, 41.87],
  // Rias gallegas, cerrando en Fisterra
  [-8.83, 42.24], [-8.95, 42.55], [-9.05, 42.78]
];

// La frontera con Portugal, de norte a sur. Se dibuja discontinua: varias
// pistas hablan de estar cerca de Portugal (Salamanca, Huelva).
const FRONTERA_PT = [
  [-8.88, 41.87], [-8.20, 41.90], [-7.60, 41.87], [-6.95, 41.95],
  [-6.55, 41.65], [-6.35, 41.40], [-6.20, 41.03], [-6.80, 40.60],
  [-6.86, 40.27], [-7.02, 39.95], [-6.86, 39.66], [-7.35, 39.65],
  [-7.55, 39.45], [-7.25, 39.05], [-7.10, 38.60], [-7.00, 38.20],
  [-7.25, 37.85], [-7.44, 37.55], [-7.42, 37.17]
];

// Ciudades que caen fuera del marco de la peninsula. Se dibujan en un cartucho
// aparte, como en los mapas de verdad, con la direccion en la que quedan.
//
// Aqui iran las Canarias el dia que se anadan: estan a unos 1.000 km al
// suroeste y no caben en el marco. El cartucho ya esta previsto para eso.
const FUERA_DE_MARCO = {
  "Londres": { direccion: "norte", nota: "Al otro lado del mar" }
};
