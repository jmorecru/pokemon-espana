// Las pistas de cada ciudad. Se dan al acertar y describen la SIGUIENTE
// ciudad de la ruta sin decir su nombre. No mencionan a la familia a
// proposito: destriparia la sorpresa de encontrarselos al llegar.

const HINTS = {
  "Bilbao": [
    "El rastro sube al norte, hacia una ciudad que tiene el museo de titanio brillante junto a una ría.",
    "Las señales van al norte… tierra vasca de pintxos, llovizna y un gran perro de flores.",
    "El rastro sube al Cantábrico, a la ciudad más grande del País Vasco, donde se habla euskera y un puente cruza la ría colgando una barquilla.",
    "El rastro sube al norte, a una ciudad con una araña gigante de acero junto al río y un metro con bocas de cristal curvado.",
    "Las señales van al Cantábrico, a una ciudad que vivió del hierro y de los astilleros y se reinventó con un museo que le cambió la suerte.",
    "El rastro va al golfo de Vizcaya, a una ciudad partida por una ría donde el campo de fútbol se llama La Catedral."
  ],
  "Sevilla": [
    "El rastro baja al sur, hacia una gran urbe andaluza con una torre árabe con veleta y una inmensa plaza monumental.",
    "Las pistas van al sur… tierra de azahar, flamenco, calor y el río Guadalquivir.",
    "Las señales bajan a la ciudad de la Feria de Abril, que tiene el único puerto de río de España: de allí salió la primera vuelta al mundo.",
    "Las señales bajan al sur, a la ciudad de la catedral gótica más grande del mundo.",
    "El rastro va al sur, a una ciudad con unas setas de madera gigantes en medio de una plaza.",
    "Las pistas van al valle del Guadalquivir, donde en verano se pasa de los cuarenta grados y hay un barrio de ceramistas llamado Triana."
  ],
  "Barcelona": [
    "El rastro va al este, hacia el mar Mediterráneo... una ciudad con una inmensa basílica cuyas torres imitan árboles.",
    "Las señales apuntan al levante norte, a una metrópolis de Gaudí con mosaicos de dragones y un gran paseo.",
    "El rastro va al Mediterráneo, a una ciudad donde se habla catalán, que fue sede de unos Juegos Olímpicos y tiene el puerto lleno de cruceros.",
    "El rastro va al noreste, a una ciudad con un estadio para casi cien mil personas y una playa en pleno centro.",
    "Las pistas van al Mediterráneo, a una ciudad que fundaron los romanos y cuyo casco antiguo se llama el Barrio Gótico.",
    "Las señales van al levante norte, a una ciudad con una montaña asomada al puerto y un mercado famoso llamado La Boquería."
  ],
  "Girona": [
    "El rastro sube al noreste… una histórica ciudad medieval con casas de colores colgadas sobre el río Onyar.",
    "Las pistas llevan a una ciudad amurallada del norte de Cataluña con un barrio judío excelentemente conservado.",
    "Las pistas van al noreste, casi en la frontera con Francia, a una ciudad con noventa peldaños hasta la catedral y unos baños árabes.",
    "El rastro sube al noreste, a una ciudad rodeada de una muralla por la que se puede pasear por encima.",
    "Las señales van al norte de Cataluña, a una ciudad pequeña que ya era romana y donde se han rodado series de televisión muy famosas.",
    "Las pistas van al noreste, a una ciudad de cuatro ríos con una iglesia románica dedicada a San Pedro."
  ],
  "Granada": [
    "El rastro baja al sur profundo… hacia un palacio árabe sobre una colina roja rodeado de fuentes musicales.",
    "Las señales van al sur, a una ciudad de montaña con cuevas de flamenco y vistas a Sierra Nevada.",
    "Las señales van al sur profundo, a la ciudad donde todavía ponen tapa gratis con la bebida y desde donde se ve nieve incluso en verano.",
    "El rastro baja al sur, a la última ciudad que tuvieron los reyes árabes en España, conquistada en 1492.",
    "Las señales van al sur, a una ciudad con un barrio de casas blancas y calles empinadas llamado el Albaicín.",
    "Las pistas van al sur, a la ciudad donde está enterrada la reina Isabel la Católica, en una capilla junto a la catedral."
  ],
  "Valencia": [
    "El rastro va al este, a la tierra de la paella y una gran ciudad futurista con lagos artificiales.",
    "Las señales apuntan al levante costero, tierra de naranjos y gigantescos edificios blancos con forma de concha.",
    "El rastro va al Mediterráneo, a la ciudad donde cada marzo queman en la calle unas figuras gigantes de cartón.",
    "El rastro va al Mediterráneo, a una ciudad que desvió su río y convirtió el cauce viejo en un parque larguísimo.",
    "Las señales van al levante, a una ciudad con un mercado modernista enorme y una lonja de la seda que es Patrimonio de la Humanidad.",
    "Las pistas van al este, a una ciudad con dos torres que eran una puerta de la muralla y una playa muy larga llamada la Malvarrosa."
  ],
  "Toledo": [
    "El rastro va al centro-sur… una ciudad imperial amurallada y rodeada por un río cerrado, famosa por sus espadas de acero.",
    "Las pistas llevan a la histórica ciudad de las tres culturas, encaramada en una colina de piedra.",
    "Las señales van al centro, a una ciudad que fue capital de España antes que Madrid y donde se hace un dulce de almendra: el mazapán.",
    "Las señales van al centro, a una ciudad con una sinagoga convertida en museo y un monasterio con cadenas de cautivos colgadas en la fachada.",
    "El rastro va justo al sur de Madrid, a la ciudad donde vivió y pintó El Greco.",
    "Las pistas van al centro, a una ciudad con una puerta de entrada llamada de Bisagra y un alcázar cuadrado con cuatro torres."
  ],
  "Santiago de Compostela": [
    "El rastro va al extremo noroeste, al final del Camino de peregrinación donde millones de caminantes celebran.",
    "Las señales van al norte atlántico y lluvioso, hacia una imponente catedral de piedra gris frente al Obradoiro.",
    "El rastro va a Galicia, donde se habla gallego y en la catedral balancean un incensario gigante colgado del techo.",
    "El rastro va al noroeste, a la ciudad donde acaban las flechas amarillas que los peregrinos siguen durante semanas.",
    "Las señales van a Galicia, a una ciudad con un mercado de piedra donde se vende pulpo y percebes.",
    "Las pistas van al extremo noroeste, a una ciudad con un monte desde el que los peregrinos ven por primera vez las torres de la catedral."
  ],
  "Salamanca": [
    "El rastro va al oeste interior… una ciudad dorada donde los estudiantes buscan una rana esculpida en la piedra.",
    "Las pistas llevan a una de las universidades más antiguas del mundo, rodeada de fachadas de piedra arenisca.",
    "Las pistas van al oeste, cerca de la frontera con Portugal, a una ciudad con una plaza mayor de piedra dorada que se ilumina de noche.",
    "El rastro va al oeste, a una ciudad con una casa cubierta de conchas de piedra talladas en la fachada.",
    "Las señales van al oeste, a una ciudad con dos catedrales pegadas la una a la otra, una vieja y una nueva.",
    "Las pistas van al oeste interior, a una ciudad con un puente romano sobre el río Tormes."
  ],
  "Londres": [
    "¡Alerta! El rastro sale de España. Cruzó el mar hacia el norte, a una metrópolis de cabinas y autobuses rojos de dos pisos.",
    "Las ondas atraviesan el mar hacia el Reino Unido… tierra de neblina, reyes y un reloj gigante muy famoso.",
    "El rastro sale de España y cruza el mar: allí se habla inglés, se paga con libras y el río se llama Támesis.",
    "El rastro cruza el mar, a una ciudad con un puente que se abre por la mitad para dejar pasar los barcos.",
    "Las señales salen de España, a una ciudad con una noria gigante junto al río y un palacio con guardias de gorro alto y negro.",
    "Las pistas cruzan al Reino Unido, a una ciudad con un museo enorme donde se guarda la piedra que sirvió para descifrar los jeroglíficos."
  ],
  "Cádiz": [
    "El rastro baja al sur, a una ciudad rodeada de mar por todos lados, con una catedral de cúpula amarilla que brilla desde el agua.",
    "Las señales van al suroeste atlántico, a la ciudad más antigua de Occidente, la de las torres para vigilar la llegada de los barcos.",
    "Las señales van al Atlántico, a la ciudad del carnaval más famoso de España, donde el barrio de los pescadores se llama La Viña.",
    "El rastro baja al Atlántico, a una ciudad tan estrecha que se entra por un istmo: casi una isla.",
    "Las señales van al suroeste, a la ciudad donde se firmó la primera Constitución española, en 1812.",
    "Las pistas van al sur, a una ciudad con playas dentro de la propia ciudad y castillos metidos en el mar."
  ],
  "Huelva": [
    "El rastro va al suroeste, a una ría con un largo muelle de hierro y los monasterios donde Colón preparó su viaje.",
    "Las señales apuntan al sur, allí donde dos ríos se juntan y de donde zarparon las tres carabelas hacia América.",
    "El rastro va al suroeste, a la tierra de las fresas y del jamón de la sierra, con un parque nacional lleno de aves.",
    "El rastro va al suroeste, a una ciudad con un barrio de casas inglesas con jardín que construyó una empresa minera.",
    "Las señales van al Atlántico, a la ciudad de un santuario donde se venera a la Virgen de la Cinta.",
    "Las pistas van al suroeste, adonde llegaba un tren cargado de mineral desde las minas de Riotinto."
  ]
};
