// Las pistas de cada ciudad. Se dan al acertar y describen la SIGUIENTE
// ciudad de la ruta sin decir su nombre. No mencionan a la familia a
// proposito: destriparia la sorpresa de encontrarselos al llegar.

const HINTS = {
  "Bilbao": [
    "El rastro sube al norte, hacia una ciudad que tiene el museo de titanio brillante junto a una ría.",
    "Las señales van al norte… tierra vasca de pintxos, llovizna y un gran perro de flores.",
    "El rastro sube al Cantábrico, a la ciudad más grande del País Vasco, donde se habla euskera y un puente cruza la ría colgando una barquilla."
  ],
  "Sevilla": [
    "El rastro baja al sur, hacia una gran urbe andaluza con una torre árabe con veleta y una inmensa plaza monumental.",
    "Las pistas van al sur… tierra de azahar, flamenco, calor y el río Guadalquivir.",
    "Las señales bajan a la ciudad de la Feria de Abril, que tiene el único puerto de río de España: de allí salió la primera vuelta al mundo."
  ],
  "Barcelona": [
    "El rastro va al este, hacia el mar Mediterráneo... una ciudad con una inmensa basílica cuyas torres imitan árboles.",
    "Las señales apuntan al levante norte, a una metrópolis de Gaudí con mosaicos de dragones y un gran paseo.",
    "El rastro va al Mediterráneo, a una ciudad donde se habla catalán, que fue sede de unos Juegos Olímpicos y tiene el puerto lleno de cruceros."
  ],
  "Girona": [
    "El rastro sube al noreste… una histórica ciudad medieval con casas de colores colgadas sobre el río Onyar.",
    "Las pistas llevan a una ciudad amurallada del norte de Cataluña con un barrio judío excelentemente conservado.",
    "Las pistas van al noreste, casi en la frontera con Francia, a una ciudad con noventa peldaños hasta la catedral y unos baños árabes."
  ],
  "Granada": [
    "El rastro baja al sur profundo… hacia un palacio árabe sobre una colina roja rodeado de fuentes musicales.",
    "Las señales van al sur, a una ciudad de montaña con cuevas de flamenco y vistas a Sierra Nevada.",
    "Las señales van al sur profundo, a la ciudad donde todavía ponen tapa gratis con la bebida y desde donde se ve nieve incluso en verano."
  ],
  "Valencia": [
    "El rastro va al este, a la tierra de la paella y una gran ciudad futurista con lagos artificiales.",
    "Las señales apuntan al levante costero, tierra de naranjos y gigantescos edificios blancos con forma de concha.",
    "El rastro va al Mediterráneo, a la ciudad donde cada marzo queman en la calle unas figuras gigantes de cartón."
  ],
  "Toledo": [
    "El rastro va al centro-sur… una ciudad imperial amurallada y rodeada por un río cerrado, famosa por sus espadas de acero.",
    "Las pistas llevan a la histórica ciudad de las tres culturas, encaramada en una colina de piedra.",
    "Las señales van al centro, a una ciudad que fue capital de España antes que Madrid y donde se hace un dulce de almendra: el mazapán."
  ],
  "Santiago de Compostela": [
    "El rastro va al extremo noroeste, al final del Camino de peregrinación donde millones de caminantes celebran.",
    "Las señales van al norte atlántico y lluvioso, hacia una imponente catedral de piedra gris frente al Obradoiro.",
    "El rastro va a Galicia, donde se habla gallego y en la catedral balancean un incensario gigante colgado del techo."
  ],
  "Salamanca": [
    "El rastro va al oeste interior… una ciudad dorada donde los estudiantes buscan una rana esculpida en la piedra.",
    "Las pistas llevan a una de las universidades más antiguas del mundo, rodeada de fachadas de piedra arenisca.",
    "Las pistas van al oeste, cerca de la frontera con Portugal, a una ciudad con una plaza mayor de piedra dorada que se ilumina de noche."
  ],
  "Londres": [
    "¡Alerta! El rastro sale de España. Cruzó el mar hacia el norte, a una metrópolis de cabinas y autobuses rojos de dos pisos.",
    "Las ondas atraviesan el mar hacia el Reino Unido… tierra de neblina, reyes y un reloj gigante muy famoso.",
    "El rastro sale de España y cruza el mar: allí se habla inglés, se paga con libras y el río se llama Támesis."
  ],
  "Cádiz": [
    "El rastro baja al sur, a una ciudad rodeada de mar por todos lados, con una catedral de cúpula amarilla que brilla desde el agua.",
    "Las señales van al suroeste atlántico, a la ciudad más antigua de Occidente, la de las torres para vigilar la llegada de los barcos.",
    "Las señales van al Atlántico, a la ciudad del carnaval más famoso de España, donde el barrio de los pescadores se llama La Viña."
  ],
  "Huelva": [
    "El rastro va al suroeste, a una ría con un largo muelle de hierro y los monasterios donde Colón preparó su viaje.",
    "Las señales apuntan al sur, allí donde dos ríos se juntan y de donde zarparon las tres carabelas hacia América.",
    "El rastro va al suroeste, a la tierra de las fresas y del jamón de la sierra, con un parque nacional lleno de aves."
  ]
};
