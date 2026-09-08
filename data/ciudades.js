// Las 13 ciudades, con sus 6 monumentos cada una y 5 preguntas por
// monumento. Este es el fichero grande: 390 preguntas.
//
// En todas las preguntas la respuesta correcta es la primera (ans: 0). Es a
// proposito: el juego baraja las opciones al empezar cada partida, asi que
// ponerlas ya desordenadas aqui solo conseguiria fijar para siempre la
// posicion de cada una. El campo exp es opcional y se muestra al fallar.

const CITY_POOL = {
  "Madrid": {
    emoji:"🏛️",
    country:"🇪🇸",
    label:"Madrid (Donde vivimos)",
    cityImg:"images/madrid/madrid.jpg",
    welcome:"¡Estamos en casa! Madrid está llena de vida y la Smart-Rotom detecta anomalías en sus lugares históricos. 👵👴 Y por aquí andan <strong>los abuelos Elena y Juanchu</strong>, que se han ofrecido a echar una mano en cuanto haga falta.",
    places:[
      {
        name:"Parque del Retiro",
        img:"images/madrid/retiro.jpg",
        questions:[
          { q:"¿Qué gran monumento preside el estanque del Retiro donde la gente monta en barca?", opts:["El monumento a Alfonso XII","La estatua de Colón","La Torre de Madrid"], ans:0 },
          { q:"¿Qué actividad típica hacen muchas personas en el gran estanque del Retiro?", opts:["Montar en barca","Esquiar","Bucear"], ans:0 },
          { q:"¿Cómo se llama el famoso parque histórico de Madrid donde está este estanque?", opts:["El Retiro","La Casa de Campo","El Capricho"], ans:0 },
          { q:"¿Qué estación es especialmente famosa en Madrid por sus flores y el Retiro cercano?", opts:["La primavera","El invierno polar","La época de monzones"], ans:0 },
          { q:"¿En qué ciudad española se encuentra el Parque del Retiro?", opts:["Madrid","Sevilla","Valencia"], ans:0 }
        ]
      },
      {
        name:"Museo del Prado",
        img:"images/madrid/prado.jpg",
        questions:[
          { q:"¿Cuál de estos pintores españoles tiene una estatua en la puerta del Museo del Prado?", opts:["Diego Velázquez","Pablo Picasso","Salvador Dalí"], ans:0 },
          { q:"¿Qué tipo de museo es el Prado principalmente?", opts:["Museo de arte y pintura","Museo de dinosaurios","Museo del ferrocarril"], ans:0 },
          { q:"¿En qué ciudad está el Museo del Prado?", opts:["Madrid","Bilbao","Barcelona"], ans:0 },
          { q:"¿Qué famoso pintor español está muy relacionado con obras del Prado como Las Meninas?", opts:["Velázquez","Miró","Sorolla"], ans:0 },
          { q:"¿Cómo se conoce el gran paseo cultural de Madrid donde están Prado, Reina Sofía y Thyssen?", opts:["Paseo del Arte","Camino de Santiago","Ruta de la Plata"], ans:0 }
        ]
      },
      {
        name:"Palacio Real",
        img:"images/madrid/palacio-real.jpg",
        questions:[
          { q:"¿Qué inmensa plaza se encuentra justo entre el Palacio Real y la Catedral de la Almudena?", opts:["La Plaza de la Armería","La Plaza de España","La Plaza de Neptuno"], ans:0 },
          { q:"¿Qué edificio histórico se encuentra junto al Palacio Real de Madrid?", opts:["La Catedral de la Almudena","La Sagrada Família","La Giralda"], ans:0 },
          { q:"¿En qué ciudad se encuentra el Palacio Real de España?", opts:["Madrid","Toledo","Granada"], ans:0 },
          { q:"¿Para qué se usa hoy principalmente el Palacio Real?", opts:["Actos oficiales y ceremonias","Como aeropuerto","Como estadio de fútbol"], ans:0 },
          { q:"¿Qué familia real está asociada al Palacio Real de Madrid?", opts:["La familia real española","La familia imperial romana","La familia Tudor"], ans:0 }
        ]
      },
      {
        name:"Gran Vía",
        img:"images/madrid/gran-via.jpg",
        questions:[
          { q:"¿Qué famoso edificio coronado con una estatua alada destaca en el inicio de la Gran Vía?", opts:["El Edificio Metrópolis","El Edificio Carrión","La Torre de Madrid"], ans:0 },
          { q:"¿Cómo se conoce popularmente la Gran Vía de Madrid?", opts:["Como una gran avenida de teatros, cines y tiendas","Como un puerto marítimo","Como una muralla romana"], ans:0 },
          { q:"¿En qué ciudad está la Gran Vía más famosa de España?", opts:["Madrid","Bilbao","Girona"], ans:0 },
          { q:"¿Qué tipo de ocio es muy típico de la Gran Vía?", opts:["Musicales y teatros","Carreras de barcos","Esquí alpino"], ans:0 },
          { q:"¿Qué edificio de la Gran Vía es famoso por su cartel luminoso de Schweppes?", opts:["El Edificio Carrión","La Torre Picasso","La Puerta de Alcalá"], ans:0 }
        ]
      },
      {
        name:"Estadio Santiago Bernabéu",
        img:"images/madrid/bernabeu.jpg",
        questions:[
          { q:"¿Qué gran competición europea de fútbol ha ganado el Real Madrid muchas veces en este estadio?", opts:["La UEFA Champions League","La Copa del Mundo","La Liga de Kanto"], ans:0 },
          { q:"¿Qué equipo juega habitualmente en el Santiago Bernabéu?", opts:["Real Madrid","Atlético de Madrid","FC Barcelona"], ans:0 },
          { q:"¿En qué ciudad está el estadio Santiago Bernabéu?", opts:["Madrid","Sevilla","Londres"], ans:0 },
          { q:"¿Qué deporte se juega principalmente en el Bernabéu?", opts:["Fútbol","Baloncesto","Tenis"], ans:0 },
          { q:"¿De qué color viste tradicionalmente el Real Madrid?", opts:["Blanco","Rojo y azul","Verde"], ans:0 }
        ]
      },
      {
        name:"Puerta del Sol",
        img:"images/madrid/puerta-del-sol.jpg",
        questions:[
          { q:"¿Qué estatua de bronce, símbolo de Madrid, se encuentra en mitad de la Puerta del Sol?", opts:["El Oso y el Madroño","El León del Congreso","La Cibeles"], ans:0 },
          { q:"¿Qué famosa tradición española se sigue frente al reloj de Sol cada Nochevieja?", opts:["Tomar las doce uvas","Lanzar flores al aire","Encender faroles"], ans:0 },
          { q:"¿En qué ciudad se encuentra la Puerta del Sol?", opts:["Madrid","Toledo","Valencia"], ans:0 },
          { q:"¿Qué famoso punto de referencia de las carreteras españolas está en la Puerta del Sol?", opts:["El Kilómetro Cero","La Rosa de los Vientos","El Meridiano Real"], ans:0 },
          { q:"¿Qué fruta se asocia mucho a Madrid por la estatua del oso?", opts:["Madroño","Naranja","Uva"], ans:0 }
        ]
      }
    ]
  },

  "Bilbao": {
    emoji:"🌉",
    country:"🇪🇸",
    label:"Bilbao (Donde nació mamá)",
    cityImg:"images/bilbao/bilbao.jpg",
    welcome:"¡La tierra de mamá! Vizcaya nos recibe entre montañas verdes, el río de la ría y olor a pintxos tradicionales.",
    places:[
      {
        name:"Museo Guggenheim",
        img:"images/bilbao/guggenheim.jpg",
        questions:[
          { q:"¿De qué material metálico brillante están cubiertas las impresionantes curvas del Guggenheim?", opts:["Planchas de Titanio","Hierro forjado","Piedra caliza"], ans:0 },
          { q:"¿En qué ciudad está el famoso Museo Guggenheim del norte de España?", opts:["Bilbao","Madrid","Granada"], ans:0 },
          { q:"¿Qué gran perro floral es una de las imágenes más famosas del Guggenheim?", opts:["Puppy","Pluto","Can Cerbero"], ans:0 },
          { q:"¿Qué tipo de museo es el Guggenheim de Bilbao?", opts:["Arte contemporáneo","Ciencias naturales","Ferrocarril"], ans:0 },
          { q:"¿Junto a qué ría se encuentra el Guggenheim?", opts:["La ría de Bilbao","La ría de Arousa","La ría del Tajo"], ans:0 }
        ]
      },
      {
        name:"Puente de Vizcaya",
        img:"images/bilbao/puente-vizcaya.jpg",
        questions:[
          { q:"¿Qué tiene de especial este puente colgante que une Portugalete y Las Arenas?", opts:["Es un puente transbordador que transporta vehículos en una barquilla colgante","Es el puente más largo del mundo","Está hecho totalmente de madera vieja"], ans:0 },
          { q:"¿En qué provincia vasca se encuentra el Puente de Vizcaya?", opts:["Bizkaia","Álava","Guipúzcoa"], ans:0 },
          { q:"¿Qué tipo de transporte cruza colgando bajo el puente?", opts:["Una barquilla transbordadora","Un tranvía aéreo","Un globo"], ans:0 },
          { q:"¿Qué mar baña la costa cercana a Bilbao?", opts:["Mar Cantábrico","Mar Mediterráneo","Mar Negro"], ans:0 },
          { q:"¿Qué palabra se asocia mucho a la comida típica bilbaína en los bares?", opts:["Pintxos","Arepas","Sushi"], ans:0 }
        ]
      },
      {
        name:"Casco Viejo (Las 7 Calles)",
        img:"images/bilbao/casco-viejo.jpg",
        questions:[
          { q:"¿Cómo llaman en Bilbao a la tradición de ir de bar en bar tomando pintxos y copas de vino?", opts:["Chiquiteo o Poteo","Ir de tapeo","Hacer un pícnic"], ans:0 },
          { q:"¿Cuántas calles históricas dan fama al Casco Viejo de Bilbao?", opts:["Siete","Tres","Doce"], ans:0 },
          { q:"¿Qué comida pequeña y muy variada es típica de Bilbao?", opts:["Pintxos","Paella","Gazpacho"], ans:0 },
          { q:"¿En qué comunidad autónoma está Bilbao?", opts:["País Vasco","Andalucía","Galicia"], ans:0 },
          { q:"¿Qué clima suele relacionarse con Bilbao?", opts:["Lluvioso y atlántico","Desértico extremo","Tropical húmedo"], ans:0 }
        ]
      },
      {
        name:"Teatro Arriaga",
        img:"images/bilbao/teatro-arriaga.jpg",
        questions:[
          { q:"¿A qué famoso compositor bilbaíno, apodado el 'Mozart español', debe su nombre este teatro?", opts:["Juan Crisóstomo de Arriaga","Isaac Albéniz","Manuel de Falla"], ans:0 },
          { q:"¿Qué tipo de edificio es el Teatro Arriaga?", opts:["Un teatro","Un castillo","Un mercado"], ans:0 },
          { q:"¿En qué ciudad se encuentra el Teatro Arriaga?", opts:["Bilbao","Salamanca","Valencia"], ans:0 },
          { q:"¿Qué arte se disfruta normalmente en un teatro?", opts:["Obras, música y espectáculos","Carreras de coches","Submarinismo"], ans:0 },
          { q:"¿Qué río o ría atraviesa Bilbao?", opts:["La ría de Bilbao","El Guadalquivir","El Tormes"], ans:0 }
        ]
      },
      {
        name:"San Mamés",
        img:"images/bilbao/san-mames.jpg",
        questions:[
          { q:"¿Cómo es conocido popularmente el estadio del Athletic Club de Bilbao?", opts:["La Catedral","El Coliseo","El Fortín de Hierro"], ans:0 },
          { q:"¿Qué equipo juega en San Mamés?", opts:["Athletic Club","Real Sociedad","Sevilla FC"], ans:0 },
          { q:"¿En qué ciudad está San Mamés?", opts:["Bilbao","Madrid","Girona"], ans:0 },
          { q:"¿Qué deporte se juega allí principalmente?", opts:["Fútbol","Balonmano","Golf"], ans:0 },
          { q:"¿Qué colores se asocian tradicionalmente al Athletic Club?", opts:["Rojo y blanco","Verde y negro","Azul y amarillo"], ans:0 }
        ]
      },
      {
        name:"Funicular de Artxanda",
        img:"images/bilbao/artxanda.jpg",
        questions:[
          { q:"¿Qué monte conecta este histórico funicular inaugurado en 1915 con el centro de la ciudad?", opts:["El monte Artxanda","El monte Pagasarri","El monte Urgull"], ans:0 },
          { q:"¿Qué medio de transporte es un funicular?", opts:["Un tren de pendiente","Un barco","Un avión"], ans:0 },
          { q:"¿Para qué sube mucha gente a Artxanda?", opts:["Para ver Bilbao desde arriba","Para esquiar todo el año","Para ver un volcán"], ans:0 },
          { q:"¿En qué ciudad está el monte Artxanda?", opts:["Bilbao","Toledo","Londres"], ans:0 },
          { q:"¿Qué paisaje urbano se observa desde Artxanda?", opts:["La ciudad y la ría","Un desierto de dunas","Una selva tropical"], ans:0 }
        ]
      }
    ]
  },

  "Sevilla": {
    emoji:"🌸",
    country:"🇪🇸",
    label:"Sevilla (Donde viven los primos Sofía, Juan y Auxi)",
    cityImg:"images/sevilla/sevilla.jpg",
    welcome:"🎉 ¡Sevilla! ¡Qué alegría llegar aquí! Os esperan <strong>los primos Sofía, Juan y Auxi</strong>, que se saben la ciudad de memoria y no piensan perderse la búsqueda. La capital hispalense reluce, la brisa huele a azahar, el compás flamenco llena el aire y la Smart-Rotom vibra con más fuerza que nunca.",
    places:[
      {
        name:"La Giralda",
        img:"images/sevilla/giralda.jpg",
        questions:[
          { q:"¿Qué estatua de bronce que actúa como veleta corona la parte más alta de la Giralda?", opts:["El Giraldillo","El Ángel Custodio","El Arcángel San Miguel"], ans:0 },
          { q:"¿A qué gran edificio está unida la Giralda?", opts:["A la Catedral de Sevilla","Al Palacio Real de Madrid","Al Museo del Prado"], ans:0 },
          { q:"¿En qué ciudad se encuentra la Giralda?", opts:["Sevilla","Toledo","Bilbao"], ans:0 },
          { q:"¿Qué olor típico de Sevilla llena muchas calles en primavera?", opts:["Azahar","Lavanda alpina","Pino nevado"], ans:0 },
          { q:"¿Qué río cruza Sevilla?", opts:["Guadalquivir","Ebro","Tormes"], ans:0 }
        ]
      },
      {
        name:"Plaza de España",
        img:"images/sevilla/plaza-espana.jpg",
        questions:[
          { q:"¿Para qué gran evento internacional de 1929 se construyó la espectacular Plaza de España?", opts:["Exposición Iberoamericana","Los Juegos Olímpicos","La Expo Universal de Sevilla"], ans:0 },
          { q:"¿Qué atraviesa la Plaza de España y se cruza por puentes decorativos?", opts:["Un canal","Una vía de tren","Un río subterráneo"], ans:0 },
          { q:"¿En qué ciudad está la Plaza de España más famosa de Andalucía?", opts:["Sevilla","Granada","Valencia"], ans:0 },
          { q:"¿Qué parque sevillano está junto a la Plaza de España?", opts:["Parque de María Luisa","Parque del Retiro","Parque Güell"], ans:0 },
          { q:"¿Qué región española tiene por capital a Sevilla?", opts:["Andalucía","Galicia","Navarra"], ans:0 }
        ]
      },
      {
        name:"Real Alcázar",
        img:"images/sevilla/real-alcazar.jpg",
        questions:[
          { q:"¿De qué antiguo origen histórico es el palacio amurallado del Real Alcázar?", opts:["Árabe y Musulmán (Fortaleza Omeya)","Romano Imperial","Vikingo del Norte"], ans:0 },
          { q:"¿Qué tipo de lugar es el Real Alcázar de Sevilla?", opts:["Un palacio real","Un estadio de fútbol","Un acuario"], ans:0 },
          { q:"¿En qué ciudad está el Real Alcázar?", opts:["Sevilla","Barcelona","Bilbao"], ans:0 },
          { q:"¿Qué estilo decorativo es muy famoso en este palacio andaluz?", opts:["Mudéjar","Barroco ruso","Gótico nórdico"], ans:0 },
          { q:"¿Qué estación del año suele ser muy famosa en Sevilla por su luz y flores?", opts:["La primavera","El otoño polar","El monzón"], ans:0 }
        ]
      },
      {
        name:"Torre del Oro",
        img:"images/sevilla/torre-del-oro.jpg",
        questions:[
          { q:"¿Qué defendía originalmente la Torre del Oro en el siglo XIII en la ribera del Guadalquivir?", opts:["El acceso marítimo al puerto fluvial de la ciudad","Un tesoro de monedas reales","Una prisión subterránea"], ans:0 },
          { q:"¿Junto a qué río se encuentra la Torre del Oro?", opts:["Guadalquivir","Tajo","Ebro"], ans:0 },
          { q:"¿En qué ciudad está la Torre del Oro?", opts:["Sevilla","Girona","Madrid"], ans:0 },
          { q:"¿Qué color recuerda su nombre?", opts:["Dorado","Azul","Verde"], ans:0 },
          { q:"¿Qué medio de transporte histórico llegaba por el río a Sevilla?", opts:["Barcos","Teleféricos","Trineos"], ans:0 }
        ]
      },
      {
        name:"Barrio de Triana",
        img:"images/sevilla/triana.jpg",
        questions:[
          { q:"¿Qué famoso puente de hierro del siglo XIX hay que cruzar para entrar a Triana desde el centro?", opts:["Puente de Isabel II (Puente de Triana)","Puente del Alamillo","Puente de San Telmo"], ans:0 },
          { q:"¿Por qué es muy conocido el barrio de Triana?", opts:["Por su tradición flamenca y alfarera","Por sus pistas de esquí","Por sus castillos medievales"], ans:0 },
          { q:"¿En qué ciudad está Triana?", opts:["Sevilla","Valencia","Londres"], ans:0 },
          { q:"¿Qué arte andaluz se asocia mucho a Triana?", opts:["Flamenco","Jota aragonesa","Muñeira"], ans:0 },
          { q:"¿Qué río separa Triana del centro histórico?", opts:["Guadalquivir","Duero","Miño"], ans:0 }
        ]
      },
      {
        name:"Metropol Parasol (Setas)",
        img:"images/sevilla/setas.jpg",
        questions:[
          { q:"¿De qué material está construida principalmente la gigantesca estructura de las Setas de Sevilla?", opts:["Madera micro-laminada","Acero inoxidable","Hormigón visto"], ans:0 },
          { q:"¿Cómo llama mucha gente a esta gran estructura de Sevilla?", opts:["Las Setas","Los Cohetes","Las Torres del Sol"], ans:0 },
          { q:"¿En qué ciudad están las famosas Setas?", opts:["Sevilla","Barcelona","Toledo"], ans:0 },
          { q:"¿Qué se puede hacer arriba de las Setas?", opts:["Pasear por un mirador","Nadar en una piscina olímpica","Esquiar"], ans:0 },
          { q:"¿Qué ciudad andaluza es famosa también por la Feria de Abril?", opts:["Sevilla","Santiago","Bilbao"], ans:0 }
        ]
      }
    ]
  },

  "Barcelona": {
    emoji:"🏖️",
    country:"🇪🇸",
    label:"Barcelona (Ciudad de Gaudí)",
    cityImg:"images/barcelona/barcelona.jpg",
    welcome:"¡Barcelona! Las olas rompen, la arquitectura de Gaudí asombra y la energía de la Smart-Rotom se dispara cerca del mar.",
    places:[
      {
        name:"Sagrada Família",
        img:"images/barcelona/sagrada-familia.jpg",
        questions:[
          { q:"¿En qué año aproximado comenzaron las obras de este templo monumental que aún sigue en construcción?", opts:["1882","1920","1954"], ans:0 },
          { q:"¿Qué arquitecto está ligado a la Sagrada Família?", opts:["Antoni Gaudí","Frank Lloyd Wright","Le Corbusier"], ans:0 },
          { q:"¿En qué ciudad se encuentra la Sagrada Família?", opts:["Barcelona","Madrid","Sevilla"], ans:0 },
          { q:"¿Qué estilo creativo y muy personal caracteriza muchas obras de Gaudí?", opts:["Modernismo catalán","Arquitectura vikinga","Arte mesopotámico"], ans:0 },
          { q:"¿Qué mar baña la ciudad de Barcelona?", opts:["Mediterráneo","Cantábrico","Mar del Norte"], ans:0 }
        ]
      },
      {
        name:"Park Güell",
        img:"images/barcelona/park-guell.jpg",
        questions:[
          { q:"¿Qué técnica de mosaico con trozos de cerámica rota utilizó Gaudí para decorar el banco del Park Güell?", opts:["Trencadís","Óleo clásico","Estuco veneciano"], ans:0 },
          { q:"¿Quién diseñó el Park Güell?", opts:["Gaudí","Velázquez","Sorolla"], ans:0 },
          { q:"¿En qué ciudad está el Park Güell?", opts:["Barcelona","Granada","Bilbao"], ans:0 },
          { q:"¿Qué animal fantástico aparece mucho en los recuerdos del Park Güell?", opts:["Un dragón","Un elefante","Un tiburón"], ans:0 },
          { q:"¿Qué comunidad autónoma tiene por capital a Barcelona?", opts:["Cataluña","Aragón","Galicia"], ans:0 }
        ]
      },
      {
        name:"Las Ramblas",
        img:"images/barcelona/ramblas.jpg",
        questions:[
          { q:"¿Qué famoso mercado de alimentos cubierto se encuentra a mitad del paseo de Las Ramblas?", opts:["La Boquería","El Mercado de San Miguel","Els Encants"], ans:0 },
          { q:"¿Qué tipo de lugar son Las Ramblas?", opts:["Un paseo muy famoso","Una cordillera","Un puerto militar"], ans:0 },
          { q:"¿En qué ciudad están Las Ramblas?", opts:["Barcelona","Toledo","Salamanca"], ans:0 },
          { q:"¿Qué se suele encontrar paseando por Las Ramblas?", opts:["Artistas callejeros y turistas","Glaciares","Viñedos"], ans:0 },
          { q:"¿Qué lengua, además del castellano, es muy habitual en Barcelona?", opts:["Catalán","Euskera","Gallego"], ans:0 }
        ]
      },
      {
        name:"Camp Nou",
        img:"images/barcelona/camp-nou.jpg",
        questions:[
          { q:"¿Qué colores forman la bandera tradicional y la camiseta del FC Barcelona?", opts:["Azul y Grana","Blanco y Morado","Rojo y Blanco"], ans:0 },
          { q:"¿Qué equipo juega tradicionalmente en el Camp Nou?", opts:["FC Barcelona","RCD Espanyol","Real Betis"], ans:0 },
          { q:"¿En qué ciudad está el Camp Nou?", opts:["Barcelona","Madrid","Londres"], ans:0 },
          { q:"¿Qué deporte se juega principalmente en el Camp Nou?", opts:["Fútbol","Béisbol","Rugby hielo"], ans:0 },
          { q:"¿Cómo se apoda a veces al FC Barcelona?", opts:["Barça","Los Leones","Los Colchoneros"], ans:0 }
        ]
      },
      {
        name:"Playa de la Barceloneta",
        img:"images/barcelona/barceloneta.jpg",
        questions:[
          { q:"¿Qué barrio marinero tradicional da cobijo y nombre a esta playa urbana de Barcelona?", opts:["La Barceloneta","El Raval","Poble Sec"], ans:0 },
          { q:"¿En qué ciudad está la playa de la Barceloneta?", opts:["Barcelona","Valencia","Sevilla"], ans:0 },
          { q:"¿Qué mar baña la Barceloneta?", opts:["Mediterráneo","Cantábrico","Báltico"], ans:0 },
          { q:"¿Qué ambiente se asocia mucho a la Barceloneta?", opts:["Playa urbana y barrio marinero","Alta montaña","Bosque atlántico"], ans:0 },
          { q:"¿Qué plato de arroz es muy típico del litoral mediterráneo español?", opts:["Paella","Fabada","Cocido madrileño"], ans:0 }
        ]
      },
      {
        name:"Casa Batlló",
        img:"images/barcelona/casa-batllo.jpg",
        questions:[
          { q:"¿Qué elemento de la mitología popular parece coronar el colorido tejado escamoso de la Casa Batlló?", opts:["El lomo de un Dragón","Las alas de un Pidgeot","Una corona real de piedra"], ans:0 },
          { q:"¿Quién diseñó la Casa Batlló?", opts:["Antoni Gaudí","Calatrava","Dalí"], ans:0 },
          { q:"¿En qué ciudad está la Casa Batlló?", opts:["Barcelona","Girona","Toledo"], ans:0 },
          { q:"¿Qué estilo artístico se asocia mucho a esta fachada?", opts:["Modernismo catalán","Románico rural","Arquitectura militar"], ans:0 },
          { q:"¿En qué famoso paseo de Barcelona se encuentra la Casa Batlló?", opts:["Passeig de Gràcia","La Castellana","Paseo del Espolón"], ans:0 }
        ]
      }
    ]
  },

  "Girona": {
    emoji:"🏰",
    country:"🇪🇸",
    label:"Girona (Ciudad Medieval)",
    cityImg:"images/girona/girona.jpg",
    welcome:"¡Girona! La joya del Onyar nos recibe con murallas, fortalezas romanas y callejones llenos de magia antigua.",
    places:[
      {
        name:"Casas del Río Onyar",
        img:"images/girona/onyar.jpg",
        questions:[
          { q:"¿Qué famoso e histórico puente de hierro rojo cruza el río Onyar directo a las casas colgantes?", opts:["El Puente de las Pescaderías Viejas (Eiffel)","El Puente de Piedra","El Puente de Triana"], ans:0 },
          { q:"¿Qué río atraviesa Girona con sus casas de colores?", opts:["Onyar","Tajo","Guadalquivir"], ans:0 },
          { q:"¿En qué ciudad catalana están estas casas colgantes?", opts:["Girona","Lleida","Tarragona"], ans:0 },
          { q:"¿De qué color son famosas muchas casas del Onyar?", opts:["De varios colores vivos","Solo negras","Solo doradas"], ans:0 },
          { q:"¿Qué comunidad autónoma incluye Girona?", opts:["Cataluña","Galicia","Navarra"], ans:0 }
        ]
      },
      {
        name:"Catedral de Girona",
        img:"images/girona/catedral.jpg",
        questions:[
          { q:"¿Qué récord ostenta la majestuosa nave gótica de la Catedral de Girona?", opts:["Es la nave gótica más ancha del mundo","Es la iglesia más alta de España","Tiene el campanario más pesado"], ans:0 },
          { q:"¿En qué ciudad se encuentra la catedral de esta pregunta?", opts:["Girona","Bilbao","Madrid"], ans:0 },
          { q:"¿Qué gran escalinata es famosa delante de la Catedral de Girona?", opts:["La gran escalinata de acceso","La escalera mecánica romana","La rampa del puerto"], ans:0 },
          { q:"¿Qué estilo destaca en la famosa nave de la catedral?", opts:["Gótico","Barroco mexicano","Industrial"], ans:0 },
          { q:"¿Qué región histórica española incluye Girona?", opts:["Cataluña","Castilla-La Mancha","Andalucía"], ans:0 }
        ]
      },
      {
        name:"El Call (Barrio Judío)",
        img:"images/girona/el-call.jpg",
        questions:[
          { q:"¿Para qué serie de televisión internacional de fantasía se usó el Call de Girona como escenario principal?", opts:["Juego de Tronos","The Witcher","El Señor de los Anillos"], ans:0 },
          { q:"¿Qué significa 'Call' en este contexto de Girona?", opts:["Barrio judío histórico","Puerto marítimo","Mercado ganadero"], ans:0 },
          { q:"¿En qué ciudad está El Call famoso?", opts:["Girona","Sevilla","Valencia"], ans:0 },
          { q:"¿Cómo suelen ser sus calles?", opts:["Estrechas y medievales","Anchas y llenas de rascacielos","Submarinas"], ans:0 },
          { q:"¿Qué ambiente general ofrece Girona a muchos visitantes?", opts:["Medieval e histórico","Desértico","Tropical"], ans:0 }
        ]
      },
      {
        name:"Murallas de Girona",
        img:"images/girona/murallas.jpg",
        questions:[
          { q:"¿Cómo se conoce al popular paseo turístico arqueológico que recorre las murallas medievales?", opts:["Passeig de la Muralla / Camino de Ronda","Paseo del Prado","Ruta del Ferro"], ans:0 },
          { q:"¿En qué ciudad están estas famosas murallas?", opts:["Girona","Londres","Madrid"], ans:0 },
          { q:"¿Para qué servían originalmente las murallas de una ciudad?", opts:["Para defenderla","Para cultivar arroz","Para guardar trenes"], ans:0 },
          { q:"¿Qué tipo de vistas ofrecen las murallas de Girona?", opts:["Vistas panorámicas de la ciudad","Solo vistas del mar abierto","Vistas del desierto"], ans:0 },
          { q:"¿Qué comunidad autónoma contiene Girona?", opts:["Cataluña","La Rioja","Murcia"], ans:0 }
        ]
      },
      {
        name:"Baños Árabes",
        img:"images/girona/banos-arabes.jpg",
        questions:[
          { q:"¿De qué época arquitectónica real es este edificio que emula los antiguos baños musulmanes?", opts:["Estilo Románico Cristiano (siglo XII)","Origen Califal Árabe","Época Romana de Julio César"], ans:0 },
          { q:"¿En qué ciudad están los Baños Árabes famosos de esta aventura?", opts:["Girona","Granada","Bilbao"], ans:0 },
          { q:"¿Qué uso recuerda este edificio histórico?", opts:["Baños públicos","Campo de fútbol","Faro marítimo"], ans:0 },
          { q:"¿Qué ambiente transmite este lugar de Girona?", opts:["Medieval e histórico","Futurista espacial","Volcánico"], ans:0 },
          { q:"¿Qué elemento arquitectónico suele destacarse en este tipo de baños?", opts:["Sala y columnas","Gradas gigantes","Pistas de atletismo"], ans:0 }
        ]
      },
      {
        name:"Monasterio de Sant Pere de Galligants",
        img:"images/girona/sant-pere.jpg",
        questions:[
          { q:"¿Qué antigua orden religiosa habitaba este precioso monasterio románico del siglo XII?", opts:["Los monjes benedictinos","Los caballeros templarios","Los monjes budistas"], ans:0 },
          { q:"¿En qué ciudad está Sant Pere de Galligants?", opts:["Girona","Salamanca","Toledo"], ans:0 },
          { q:"¿Qué estilo arquitectónico tiene este monasterio?", opts:["Románico","Art déco","Neoclásico americano"], ans:0 },
          { q:"¿Qué tipo de edificio es un monasterio?", opts:["Un lugar religioso","Un estadio","Un puerto"], ans:0 },
          { q:"¿Qué sensación transmite esta zona histórica de Girona?", opts:["Piedra antigua y calma","Rascacielos y autopistas","Selva y volcanes"], ans:0 }
        ]
      }
    ]
  },

  "Granada": {
    emoji:"🌹",
    country:"🇪🇸",
    label:"Granada (La Alhambra)",
    cityImg:"images/granada/granada.jpg",
    welcome:"¡Granada! El aire de Sierra Nevada refresca el ambiente y los palacios nazaríes destellan energía Pokémon de alto nivel.",
    places:[
      {
        name:"La Alhambra",
        img:"images/granada/alhambra.jpg",
        questions:[
          { q:"¿Cuál es el nombre del patio más famoso de la Alhambra, decorado con una fuente rodeada de esculturas de animales?", opts:["El Patio de los Leones","El Patio de los Arrayanes","El Patio de los Naranjos"], ans:0 },
          { q:"¿En qué ciudad está la Alhambra?", opts:["Granada","Sevilla","Girona"], ans:0 },
          { q:"¿Qué tipo de conjunto es la Alhambra?", opts:["Palacios y fortaleza","Puerto pesquero","Circuito de carreras"], ans:0 },
          { q:"¿Qué montaña cercana aparece mucho en las vistas de Granada?", opts:["Sierra Nevada","Picos de Europa","Teide"], ans:0 },
          { q:"¿Qué color se asocia mucho a las murallas de la Alhambra al atardecer?", opts:["Rojizo","Verde neón","Morado oscuro"], ans:0 }
        ]
      },
      {
        name:"Jardines del Generalife",
        img:"images/granada/generalife.jpg",
        questions:[
          { q:"¿Qué elemento es el protagonista absoluto del Generalife, fluyendo por canales, fuentes y escaleras?", opts:["El Agua de la sierra","El Fuego místico","Estatuas de piedra de Pokémon"], ans:0 },
          { q:"¿En qué ciudad están los jardines del Generalife?", opts:["Granada","Madrid","Bilbao"], ans:0 },
          { q:"¿Qué tipo de lugar es el Generalife?", opts:["Jardines históricos","Un estadio","Una cueva marina"], ans:0 },
          { q:"¿Qué clima ayuda a apreciar el frescor de estas fuentes?", opts:["El calor andaluz","El clima polar","El monzón"], ans:0 },
          { q:"¿Qué gran conjunto monumental está junto al Generalife?", opts:["La Alhambra","La Giralda","La Sagrada Família"], ans:0 }
        ]
      },
      {
        name:"Barrio del Albaicín",
        img:"images/granada/albaicin.jpg",
        questions:[
          { q:"¿Desde qué famoso mirador del Albaicín se contempla la puesta de sol más espectacular sobre la Alhambra?", opts:["Mirador de San Nicolás","Mirador de San Cristóbal","Mirador de la Lona"], ans:0 },
          { q:"¿En qué ciudad está el Albaicín?", opts:["Granada","Valencia","Londres"], ans:0 },
          { q:"¿Cómo son muchas calles del Albaicín?", opts:["Empinadas y estrechas","Submarinas y cristalinas","Lisas como autopistas"], ans:0 },
          { q:"¿Qué gran monumento se ve desde muchos rincones del Albaicín?", opts:["La Alhambra","El Guggenheim","La Plaza Mayor de Salamanca"], ans:0 },
          { q:"¿Qué tipo de ambiente tiene el Albaicín?", opts:["Histórico y morisco","Industrial moderno","Polar"], ans:0 }
        ]
      },
      {
        name:"Catedral y Capilla Real",
        img:"images/granada/capilla-real.jpg",
        questions:[
          { q:"¿Qué histórico mausoleo real se encuentra adosado a la enorme catedral renacentista de Granada?", opts:["La tumba de los Reyes Católicos","El panteón de los Reyes de Kanto","La cripta del Cid Campeador"], ans:0 },
          { q:"¿En qué ciudad está la Capilla Real asociada a los Reyes Católicos?", opts:["Granada","Madrid","Toledo"], ans:0 },
          { q:"¿Qué gran edificio religioso acompaña a la Capilla Real?", opts:["La Catedral de Granada","La Catedral de Santiago","La Mezquita de Córdoba"], ans:0 },
          { q:"¿Qué época histórica se relaciona con los Reyes Católicos en Granada?", opts:["Final de la Reconquista","Imperio romano temprano","Edad del Bronce"], ans:0 },
          { q:"¿Qué comunidad autónoma tiene por capital a Granada? ", opts:["Ninguna, Granada está en Andalucía","Cataluña","Navarra"], ans:0 }
        ]
      },
      {
        name:"Sacromonte",
        img:"images/granada/sacromonte.jpg",
        questions:[
          { q:"¿En qué tipo de viviendas tradicionales excavadas en la roca habita la comunidad del Sacromonte?", opts:["Cuevas habitables","Cabañas de paja","Rascacielos de piedra"], ans:0 },
          { q:"¿En qué ciudad está el Sacromonte?", opts:["Granada","Bilbao","Barcelona"], ans:0 },
          { q:"¿Qué arte suele asociarse mucho al Sacromonte?", opts:["Flamenco","Ópera wagneriana","Jota navarra"], ans:0 },
          { q:"¿Qué elemento hace famoso este barrio?", opts:["Sus cuevas","Sus rascacielos","Sus fiordos"], ans:0 },
          { q:"¿Qué gran monumento suele verse desde esta zona elevada?", opts:["La Alhambra","La Torre del Oro","La Casa Batlló"], ans:0 }
        ]
      },
      {
        name:"Palacio de Carlos V",
        img:"images/granada/carlos-v.jpg",
        questions:[
          { q:"¿Qué sorprendente forma geométrica perfecta tiene el patio interior de este palacio renacentista dentro de la Alhambra?", opts:["Forma Circular","Forma Cuadrada","Forma Pentagonal"], ans:0 },
          { q:"¿Dentro de qué gran recinto está el Palacio de Carlos V?", opts:["La Alhambra","El Retiro","Las Ramblas"], ans:0 },
          { q:"¿En qué ciudad está este palacio?", opts:["Granada","Sevilla","Bilbao"], ans:0 },
          { q:"¿Qué estilo arquitectónico caracteriza al Palacio de Carlos V?", opts:["Renacentista","Gótico polar","Modernista catalán"], ans:0 },
          { q:"¿Qué emperador da nombre a este palacio?", opts:["Carlos V","Fernando VII","Alfonso X"], ans:0 }
        ]
      }
    ]
  },

  "Valencia": {
    emoji:"🍊",
    country:"🇪🇸",
    label:"Valencia (La Ciudad de la Luz)",
    cityImg:"images/valencia/valencia.jpg",
    welcome:"¡Valencia! Sol radiante, aroma de pólvora y naranjos, y un rastro Pokémon cibernético que parpadea en la Smart-Rotom.",
    places:[
      {
        name:"Ciudad de las Artes y las Ciencias",
        img:"images/valencia/artes-ciencias.jpg",
        questions:[
          { q:"¿Cómo se llama el edificio con forma de ojo humano gigante que alberga el cine IMAX?", opts:["L'Hemisfèric","L'Oceanogràfic","El Palau de les Arts"], ans:0 },
          { q:"¿En qué ciudad se encuentra la Ciudad de las Artes y las Ciencias?", opts:["Valencia","Madrid","Santiago"], ans:0 },
          { q:"¿Qué estilo general tiene este conjunto arquitectónico?", opts:["Futurista","Románico rural","Mudéjar clásico"], ans:0 },
          { q:"¿Qué mar baña la costa valenciana?", opts:["Mediterráneo","Cantábrico","Mar del Norte"], ans:0 },
          { q:"¿Qué fruto se asocia mucho a Valencia?", opts:["La naranja","La cereza","La castaña"], ans:0 }
        ]
      },
      {
        name:"La Lonja de la Seda",
        img:"images/valencia/lonja.jpg",
        questions:[
          { q:"¿Qué estilo arquitectónico medieval define las preciosas columnas helicoidales de la Lonja de la Seda?", opts:["Gótico Civil Valenciano","Barroco recargado","Románico Primitivo"], ans:0 },
          { q:"¿En qué ciudad está la Lonja de la Seda?", opts:["Valencia","Toledo","Girona"], ans:0 },
          { q:"¿Qué producto comercial da nombre a este edificio histórico?", opts:["La seda","La sal","El aceite"], ans:0 },
          { q:"¿Qué tipo de edificio era una lonja?", opts:["Lugar de comercio","Fortaleza militar","Estadio"], ans:0 },
          { q:"¿Qué gran mercado famoso está cerca de la Lonja de Valencia?", opts:["Mercado Central","La Boquería","Mercado de Abastos de Santiago"], ans:0 }
        ]
      },
      {
        name:"Mercado Central",
        img:"images/valencia/mercado-central.jpg",
        questions:[
          { q:"¿Qué fruta local corona de forma icónica la gran cúpula de hierro y cristal del Mercado Central?", opts:["Una Naranja valenciana","Un Plátano de Canarias","Una Manzana verde"], ans:0 },
          { q:"¿En qué ciudad está el Mercado Central de esta aventura?", opts:["Valencia","Bilbao","Granada"], ans:0 },
          { q:"¿Qué tipo de lugar es el Mercado Central?", opts:["Un mercado de alimentos","Un castillo","Una estación espacial"], ans:0 },
          { q:"¿Qué se asocia mucho a la gastronomía valenciana además de la naranja?", opts:["La paella","El pulpo á feira","El salmorejo"], ans:0 },
          { q:"¿Qué metal y material destacan mucho en su estructura?", opts:["Hierro y cristal","Madera y nieve","Mármol y lava"], ans:0 }
        ]
      },
      {
        name:"Playa de la Malvarrosa",
        img:"images/valencia/malvarrosa.jpg",
        questions:[
          { q:"¿Qué famoso pintor valenciano inmortalizó la luz y los niños de la playa de la Malvarrosa en sus cuadros?", opts:["Joaquín Sorolla","Diego Velázquez","Francisco de Goya"], ans:0 },
          { q:"¿En qué ciudad está la playa de la Malvarrosa?", opts:["Valencia","Barcelona","Londres"], ans:0 },
          { q:"¿Qué mar baña la Malvarrosa?", opts:["Mediterráneo","Cantábrico","Báltico"], ans:0 },
          { q:"¿Qué ambiente tiene la Malvarrosa?", opts:["Playa urbana amplia","Alta montaña","Bosque atlántico"], ans:0 },
          { q:"¿Qué plato de arroz se asocia mucho a Valencia?", opts:["Paella","Fabada","Cocido"], ans:0 }
        ]
      },
      {
        name:"Torres de Serranos",
        img:"images/valencia/torres-serranos.jpg",
        questions:[
          { q:"¿Qué función original tenían estas imponentes torres gemelas construidas en el siglo XIV?", opts:["Puerta fortificada de la antigua muralla de la ciudad","Faro marítimo de apoyo","Torre de almacenamiento de agua"], ans:0 },
          { q:"¿En qué ciudad están las Torres de Serranos?", opts:["Valencia","Sevilla","Madrid"], ans:0 },
          { q:"¿Qué defendían antiguamente estas torres?", opts:["La entrada a la ciudad","Un volcán","Un puerto submarino"], ans:0 },
          { q:"¿Qué tipo de estructura son las Torres de Serranos?", opts:["Puerta monumental de muralla","Puente colgante","Palacio real"], ans:0 },
          { q:"¿Qué río pasa por Valencia?", opts:["Turia","Tormes","Miño"], ans:0 }
        ]
      },
      {
        name:"El Micalet (Miguelete)",
        img:"images/valencia/micalet.jpg",
        questions:[
          { q:"¿A qué edificio religioso pertenece la famosa torre campanario del Micalet?", opts:["A la Catedral de Valencia","A la Iglesia de San Nicolás","A la basílica de la Virgen"], ans:0 },
          { q:"¿En qué ciudad está el Micalet?", opts:["Valencia","Girona","Salamanca"], ans:0 },
          { q:"¿Qué tipo de estructura es el Micalet?", opts:["Campanario","Acueducto","Muralla"], ans:0 },
          { q:"¿Qué se puede hacer subiendo al Micalet?", opts:["Ver la ciudad desde arriba","Nadar en el mar","Entrar a una mina"], ans:0 },
          { q:"¿Qué fruta representa mucho a Valencia en el imaginario popular?", opts:["La naranja","La pera","La granada"], ans:0 }
        ]
      }
    ]
  },

  "Toledo": {
    emoji:"⚔️",
    country:"🇪🇸",
    label:"Toledo (Ciudad Imperial)",
    cityImg:"images/toledo/toledo.jpg",
    welcome:"¡Toledo! La silueta imperial destaca sobre el Tajo, y las leyendas de caballeros resuenan en los circuitos de la Smart-Rotom.",
    places:[
      {
        name:"Catedral de Toledo",
        img:"images/toledo/catedral.jpg",
        questions:[
          { q:"¿Cómo es conocida popularmente la imponente Catedral gótica de Toledo debido a su esplendor?", opts:["La Dives Toletana (La Rica de Toledo)","La Catedral del Mar","La Pulchra Leonina"], ans:0 },
          { q:"¿En qué ciudad está esta gran catedral?", opts:["Toledo","Madrid","Girona"], ans:0 },
          { q:"¿Qué estilo arquitectónico domina en la Catedral de Toledo?", opts:["Gótico","Modernismo","Art déco"], ans:0 },
          { q:"¿Qué río rodea gran parte de Toledo?", opts:["Tajo","Duero","Segura"], ans:0 },
          { q:"¿Qué apodo histórico tiene Toledo?", opts:["Ciudad Imperial","Ciudad Condal","Ciudad del Acero Azul"], ans:0 }
        ]
      },
      {
        name:"Alcázar de Toledo",
        img:"images/toledo/alcazar.jpg",
        questions:[
          { q:"¿Qué institución militar cultural alberga hoy en día el interior del Alcázar de Toledo?", opts:["El Museo del Ejército","La Real Academia de la Historia","El Archivo General"], ans:0 },
          { q:"¿En qué ciudad está el Alcázar de esta pregunta?", opts:["Toledo","Bilbao","Valencia"], ans:0 },
          { q:"¿Qué tipo de edificio es un alcázar?", opts:["Fortaleza o palacio fortificado","Mercado cubierto","Puente"], ans:0 },
          { q:"¿Qué paisaje domina el Alcázar al alzarse sobre la ciudad?", opts:["La parte alta de Toledo","La playa","Un puerto marítimo"], ans:0 },
          { q:"¿Qué río pasa junto a Toledo?", opts:["Tajo","Guadalquivir","Onyar"], ans:0 }
        ]
      },
      {
        name:"Sinagoga de Santa María la Blanca",
        img:"images/toledo/sinagoga.jpg",
        questions:[
          { q:"¿Qué espectacular estilo artístico define los arcos de herradura blancos de este templo mudéjar?", opts:["Arte Mudéjar / Almohade","Arquitectura Gótica pura","Estilo Barroco floral"], ans:0 },
          { q:"¿En qué ciudad se encuentra Santa María la Blanca?", opts:["Toledo","Sevilla","Barcelona"], ans:0 },
          { q:"¿Qué refleja este edificio sobre la historia de Toledo?", opts:["La convivencia de culturas","La vida submarina","La industria espacial"], ans:0 },
          { q:"¿Qué religiones forman parte de la historia de Toledo como ciudad de las tres culturas?", opts:["Cristiana, judía y musulmana","Budista, sintoísta y romana","Maya, celta y inca"], ans:0 },
          { q:"¿Qué color destaca mucho en el interior de Santa María la Blanca?", opts:["Blanco","Negro","Verde oscuro"], ans:0 }
        ]
      },
      {
        name:"Puente de San Martín",
        img:"images/toledo/puente-san-martin.jpg",
        questions:[
          { q:"¿Qué histórico río de la península pasa bajo los arcos de piedra del Puente de San Martín?", opts:["Río Tajo","Río Ebro","Río Guadalquivir"], ans:0 },
          { q:"¿En qué ciudad está este puente medieval?", opts:["Toledo","Granada","Londres"], ans:0 },
          { q:"¿Qué material destaca en este puente histórico?", opts:["Piedra","Hielo","Cristal"], ans:0 },
          { q:"¿Qué función tenía un puente así en una ciudad amurallada?", opts:["Conectar y defender accesos","Lanzar fuegos artificiales","Servir de estadio"], ans:0 },
          { q:"¿Qué paisaje urbano se ve desde el puente?", opts:["La silueta de Toledo","La Sagrada Família","La ría de Bilbao"], ans:0 }
        ]
      },
      {
        name:"Monasterio de San Juan de los Reyes",
        img:"images/toledo/san-juan-reyes.jpg",
        questions:[
          { q:"¿Qué monarcas españoles ordenaron construir este monasterio para conmemorar la batalla de Toro?", opts:["Los Reyes Católicos","Carlos V y Felipe II","Los Reyes Visigodos"], ans:0 },
          { q:"¿En qué ciudad está este monasterio?", opts:["Toledo","Santiago","Valencia"], ans:0 },
          { q:"¿Qué tipo de edificio es un monasterio?", opts:["Un edificio religioso","Una plaza de toros","Un teatro"], ans:0 },
          { q:"¿Qué pareja histórica se conoce como los Reyes Católicos?", opts:["Isabel y Fernando","Juana y Carlos","Felipe y Letizia"], ans:0 },
          { q:"¿Qué ciudad española es famosa por espadas y acero tradicional?", opts:["Toledo","Bilbao","Girona"], ans:0 }
        ]
      },
      {
        name:"Puerta de Bisagra",
        img:"images/toledo/puerta-bisagra.jpg",
        questions:[
          { q:"¿Qué gran escudo imperial preside la monumental fachada de la Puerta de Bisagra?", opts:["El Águila Bicéfala de Carlos V","El León Rampante","Las cadenas de Navarra"], ans:0 },
          { q:"¿En qué ciudad está la Puerta de Bisagra?", opts:["Toledo","Madrid","Sevilla"], ans:0 },
          { q:"¿Qué tipo de construcción es la Puerta de Bisagra?", opts:["Una gran puerta de acceso a la ciudad","Un palacio","Un puente"], ans:0 },
          { q:"¿Para qué servían antiguamente estas puertas monumentales?", opts:["Controlar la entrada a la ciudad","Guardar barcos","Subir a montañas"], ans:0 },
          { q:"¿Qué apodo histórico recibe Toledo?", opts:["Ciudad Imperial","Ciudad del Sol Levante","Ciudad Condal"], ans:0 }
        ]
      }
    ]
  },

  "Santiago de Compostela": {
    emoji:"🌟",
    country:"🇪🇸",
    label:"Santiago de Compostela",
    cityImg:"images/santiago/santiago.jpg",
    welcome:"¡Santiago de Compostela! Galicia nos acoge. Los pasos de piedra resuenan bajo el xirimiri y el rastro del mitológico parpadea con fuerza.",
    places:[
      {
        name:"Catedral de Santiago",
        img:"images/santiago/catedral.jpg",
        questions:[
          { q:"¿Cómo se llama el gigantesco incensario que vuela por el crucero de la catedral dejando olor a incienso?", opts:["El Botafumeiro","El Ostensorio","El incensario de Kanto"], ans:0 },
          { q:"¿En qué ciudad está esta famosa catedral?", opts:["Santiago de Compostela","Toledo","Valencia"], ans:0 },
          { q:"¿Qué ruta histórica termina simbólicamente en Santiago?", opts:["El Camino de Santiago","La Ruta de la Seda","La Vía Apia"], ans:0 },
          { q:"¿En qué comunidad autónoma se encuentra Santiago?", opts:["Galicia","Andalucía","Aragón"], ans:0 },
          { q:"¿Qué clima se asocia muchas veces a Santiago?", opts:["Lluvioso atlántico","Desértico","Tropical seco"], ans:0 }
        ]
      },
      {
        name:"Plaza del Obradoiro",
        img:"images/santiago/obradoiro.jpg",
        questions:[
          { q:"¿Qué gran hospital medieval de peregrinos, hoy hotel de lujo, preside un lateral del Obradoiro?", opts:["Hostal de los Reyes Católicos","Pazo de Raxoi","Colegio de San Jerónimo"], ans:0 },
          { q:"¿En qué ciudad está la Plaza del Obradoiro?", opts:["Santiago de Compostela","Bilbao","Granada"], ans:0 },
          { q:"¿Qué gran edificio domina esta plaza?", opts:["La Catedral de Santiago","La Torre del Oro","El Palacio Real"], ans:0 },
          { q:"¿Qué tipo de visitantes llegan tradicionalmente al Obradoiro?", opts:["Peregrinos","Esquiadores","Submarinistas"], ans:0 },
          { q:"¿Qué sonido musical se asocia a Galicia en el imaginario popular?", opts:["La gaita","La trompeta mariachi","El sitar"], ans:0 }
        ]
      },
      {
        name:"Pazo de Raxoi",
        img:"images/santiago/pazo-raxoi.jpg",
        questions:[
          { q:"¿Qué institución civil de Galicia comparte sede hoy en día en el palacio del Pazo de Raxoi?", opts:["El Ayuntamiento de Santiago y la Xunta de Galicia","La Real Academia Gallega","El Museo do Pobo Galego"], ans:0 },
          { q:"¿En qué ciudad se encuentra el Pazo de Raxoi?", opts:["Santiago de Compostela","Madrid","Girona"], ans:0 },
          { q:"¿Qué significa 'pazo' en Galicia?", opts:["Casa o palacio noble","Puente colgante","Puerto pesquero"], ans:0 },
          { q:"¿Qué gran plaza compostelana está junto al Pazo de Raxoi?", opts:["Obradoiro","Plaza Mayor de Salamanca","Plaza de España"], ans:0 },
          { q:"¿Qué comunidad autónoma tiene por capital histórica Santiago?", opts:["Galicia","Cataluña","Navarra"], ans:0 }
        ]
      },
      {
        name:"Mercado de Abastos",
        img:"images/santiago/abastos.jpg",
        questions:[
          { q:"¿Cuál es el molusco estrella de la gastronomía gallega que se vende fresco en este mercado?", opts:["El Pulpo á feira","El Calamar gigante","El Bogavante de Kanto"], ans:0 },
          { q:"¿En qué ciudad está este Mercado de Abastos?", opts:["Santiago de Compostela","Valencia","Sevilla"], ans:0 },
          { q:"¿Qué tipo de lugar es un mercado de abastos?", opts:["Un mercado de productos frescos","Un castillo","Una muralla"], ans:0 },
          { q:"¿Qué gastronomía se asocia mucho a Galicia?", opts:["Marisco y pescado","Tacos y nachos","Sushi y ramen"], ans:0 },
          { q:"¿Qué clima favorece una Galicia verde y húmeda?", opts:["Atlántico lluvioso","Desértico","Polar seco"], ans:0 }
        ]
      },
      {
        name:"Monte do Gozo",
        img:"images/santiago/monte-gozo.jpg",
        questions:[
          { q:"¿Qué escultura gigante corona el Monte do Gozo en honor a los caminantes?", opts:["El monumento al Peregrino","Una gran cruz de piedra antigua","La estatua del Profesor Oak"], ans:0 },
          { q:"¿En qué ciudad está el Monte do Gozo?", opts:["Santiago de Compostela","Toledo","Bilbao"], ans:0 },
          { q:"¿Por qué es famoso este monte en el Camino de Santiago?", opts:["Porque desde allí muchos peregrinos ven por primera vez la ciudad","Porque es una pista de esquí","Porque hay un volcán"], ans:0 },
          { q:"¿Qué tipo de visitantes llegan hasta allí?", opts:["Peregrinos","Navegantes oceánicos","Mineros"], ans:0 },
          { q:"¿Qué comunidad autónoma incluye Santiago de Compostela?", opts:["Galicia","La Rioja","Murcia"], ans:0 }
        ]
      },
      {
        name:"Monasterio de San Martín Pinario",
        img:"images/santiago/san-martin-pinario.jpg",
        questions:[
          { q:"¿Qué estilo decorativo, lleno de oro y detalles, destaca en el interior de su inmenso retablo mayor?", opts:["Barroco Gallego","Gótico austero","Neoclásico simétrico"], ans:0 },
          { q:"¿En qué ciudad está San Martín Pinario?", opts:["Santiago de Compostela","Granada","Madrid"], ans:0 },
          { q:"¿Qué tipo de edificio es este?", opts:["Monasterio","Estadio","Puente"], ans:0 },
          { q:"¿Qué gran catedral está muy cerca de este monasterio?", opts:["La de Santiago","La de Sevilla","La de Toledo"], ans:0 },
          { q:"¿Qué región española se asocia a la piedra gris, lluvia y peregrinos?", opts:["Galicia","Valencia","Canarias"], ans:0 }
        ]
      }
    ]
  },

  "Salamanca": {
    emoji:"🎓",
    country:"🇪🇸",
    label:"Salamanca (La Ciudad Dorada)",
    cityImg:"images/salamanca/salamanca.jpg",
    welcome:"¡Salamanca! La piedra arenisca brilla bajo el sol, la energía estudiantil vibra y los misterios antiguos se activan en la Smart-Rotom.",
    places:[
      {
        name:"Universidad de Salamanca",
        img:"images/salamanca/universidad.jpg",
        questions:[
          { q:"¿Qué famoso escritor y filósofo fue rector de esta universidad y pronunció el discurso 'Venceréis pero no convenceréis'?", opts:["Miguel de Unamuno","Federico García Lorca","Cervantes"], ans:0 },
          { q:"¿En qué ciudad está la Universidad de Salamanca?", opts:["Salamanca","Madrid","Bilbao"], ans:0 },
          { q:"¿Qué detalle busca mucha gente en su famosa fachada?", opts:["La rana","El dragón azul","La espada dorada"], ans:0 },
          { q:"¿Qué fama tiene esta universidad?", opts:["Es una de las más antiguas del mundo hispánico","Es la más nueva de Europa","Está bajo el mar"], ans:0 },
          { q:"¿Qué apodo recibe Salamanca por el color de su piedra?", opts:["La Ciudad Dorada","La Ciudad Roja","La Ciudad del Mármol Negro"], ans:0 }
        ]
      },
      {
        name:"Plaza Mayor",
        img:"images/salamanca/plaza-mayor.jpg",
        questions:[
          { q:"¿Qué retratos de personajes históricos en forma de medallón decoran los arcos de la Plaza Mayor?", opts:["Reyes, conquistadores y figuras ilustres de España","Pokémon legendarios antiguos","Directores de cine modernos"], ans:0 },
          { q:"¿En qué ciudad está esta Plaza Mayor?", opts:["Salamanca","Sevilla","Girona"], ans:0 },
          { q:"¿Qué ambiente suele tener la Plaza Mayor salmantina?", opts:["Universitario y monumental","Portuario y pesquero","Industrial y minero"], ans:0 },
          { q:"¿Qué color toma su piedra al atardecer?", opts:["Dorado","Azul oscuro","Verde brillante"], ans:0 },
          { q:"¿Qué tipo de espacio es una plaza mayor?", opts:["Un gran centro urbano de reunión","Una cueva natural","Un estadio de hielo"], ans:0 }
        ]
      },
      {
        name:"Catedral Nueva (y Astronauta)",
        img:"images/salamanca/catedral-nueva.jpg",
        questions:[
          { q:"Además de un astronauta, ¿qué otro anacronismo divertido (un animal comiendo helado) esculpieron en la restauración de 1992?", opts:["Un lince comiendo un cono de helado de dos bolas","Un Pikachu con gorra","Un dragón con gafas"], ans:0 },
          { q:"¿En qué ciudad está la Catedral Nueva con el famoso astronauta?", opts:["Salamanca","Toledo","Valencia"], ans:0 },
          { q:"¿Qué detalle moderno sorprende a muchos visitantes?", opts:["El astronauta esculpido","Un ascensor de cristal gigante","Un semáforo en la torre"], ans:0 },
          { q:"¿Qué edificio religioso acompaña a la Catedral Nueva en Salamanca?", opts:["La Catedral Vieja","La Giralda","La Capilla Real de Granada"], ans:0 },
          { q:"¿Qué ambiente tiene Salamanca por su tradición estudiantil?", opts:["Universitario","Marinero","Minero"], ans:0 }
        ]
      },
      {
        name:"Río Tormes y Puente Romano",
        img:"images/salamanca/puente-romano.jpg",
        questions:[
          { q:"¿Qué famosa novela picaresca del siglo XVI transcurre en sus inicios junto a este puente de Salamanca?", opts:["El Lazarillo de Tormes","Don Quijote de la Mancha","La Celestina"], ans:0 },
          { q:"¿Qué río pasa por Salamanca?", opts:["Tormes","Turia","Nervión"], ans:0 },
          { q:"¿En qué ciudad está este puente romano?", opts:["Salamanca","Barcelona","Londres"], ans:0 },
          { q:"¿Qué civilización construyó originalmente muchos puentes romanos?", opts:["La romana","La vikinga","La azteca"], ans:0 },
          { q:"¿Qué tipo de obra es el Lazarillo de Tormes?", opts:["Novela picaresca","Poema épico vikingo","Manual de arquitectura"], ans:0 }
        ]
      },
      {
        name:"Convento de San Esteban",
        img:"images/salamanca/san-esteban.jpg",
        questions:[
          { q:"¿Qué célebre navegante se alojó en este convento buscando el apoyo de los dominicos para su viaje a las Indias?", opts:["Cristóbal Colón","Magallanes","Juan Sebastián Elcano"], ans:0 },
          { q:"¿En qué ciudad está el convento de San Esteban?", opts:["Salamanca","Madrid","Bilbao"], ans:0 },
          { q:"¿Qué tipo de edificio es un convento?", opts:["Religioso","Deportivo","Ferroviario"], ans:0 },
          { q:"¿Qué gran actividad histórica se relaciona con Cristóbal Colón?", opts:["Viajes oceánicos hacia América","Escalada alpina","Construcción de acueductos"], ans:0 },
          { q:"¿Qué ambiente histórico-cultural domina en Salamanca?", opts:["Universidad, piedra y patrimonio","Selva y volcanes","Gran puerto marítimo"], ans:0 }
        ]
      },
      {
        name:"Casa de las Conchas",
        img:"images/salamanca/casa-conchas.jpg",
        questions:[
          { q:"¿Qué conchas marinas decoran la espectacular fachada gótica de este palacio urbano?", opts:["Conchas de Santiago (veneras)","Caracolas de mar gigantes","Fósiles de Omanyte de piedra"], ans:0 },
          { q:"¿En qué ciudad se encuentra la Casa de las Conchas?", opts:["Salamanca","Santiago","Girona"], ans:0 },
          { q:"¿Qué detalle la hace tan famosa?", opts:["Su fachada llena de conchas","Su cúpula submarina","Su reloj de arena gigante"], ans:0 },
          { q:"¿Qué tipo de edificio es la Casa de las Conchas?", opts:["Un palacio urbano histórico","Una muralla","Un teatro romano"], ans:0 },
          { q:"¿Qué apodo recibe Salamanca por el brillo de su piedra?", opts:["Ciudad Dorada","Ciudad Azul","Ciudad Blanca"], ans:0 }
        ]
      }
    ]
  },

  "Londres": {
    emoji:"🇬🇧",
    country:"🇬🇧",
    label:"¡Londres! (Primo Eduardo Jr.)",
    cityImg:"images/londres/londres.jpg",
    welcome:"☔ ¡Bienvenidos a Londres! Si el Pokémon ha salido de España, aquí está preparado el entrenador Eduardo Jr., vigilando el espacio aéreo y listo para enviar información clave desde el Reino Unido.",
    special:true,
    places:[
      {
        name:"Elizabeth Tower (Big Ben)",
        img:"images/londres/big-ben.jpg",
        questions:[
          { q:"¿De qué color son las agujas y los detalles del reloj del Big Ben tras su restauración de 2021?", opts:["Azul Prusia brillante","Negro carbón mate","Oro puro pulido"], ans:0 },
          { q:"¿En qué ciudad está el Big Ben?", opts:["Londres","Dublín","Edimburgo"], ans:0 },
          { q:"¿Junto a qué río se encuentra este famoso reloj?", opts:["Támesis","Danubio","Sena"], ans:0 },
          { q:"¿Qué tipo de edificio acompaña al Big Ben?", opts:["El Parlamento británico","Una catedral gótica española","Un castillo medieval escocés"], ans:0 },
          { q:"¿Qué país tiene por capital a Londres?", opts:["Reino Unido","Irlanda","Países Bajos"], ans:0 }
        ]
      },
      {
        name:"Tower Bridge",
        img:"images/londres/tower-bridge.jpg",
        questions:[
          { q:"¿Qué tipo de mecanismo móvil permite al Tower Bridge abrirse para el paso de grandes barcos?", opts:["Sistema de puente báscula hidráulico","Se levanta entero con cadenas","Se desliza hacia los lados"], ans:0 },
          { q:"¿En qué ciudad está el Tower Bridge?", opts:["Londres","Liverpool","Manchester"], ans:0 },
          { q:"¿Sobre qué río cruza el Tower Bridge?", opts:["Támesis","Rin","Duero"], ans:0 },
          { q:"¿Qué color tradicional destaca en muchos autobuses de Londres?", opts:["Rojo","Morado","Verde"], ans:0 },
          { q:"¿Qué tiempo atmosférico se asocia a menudo a Londres en el imaginario popular?", opts:["Niebla y lluvia","Calor desértico","Tormentas tropicales permanentes"], ans:0 }
        ]
      },
      {
        name:"Museo Británico",
        img:"images/londres/museo-britanico.jpg",
        questions:[
          { q:"¿Qué piedra histórica clave para descifrar los jeroglíficos egipcios se expone en este museo?", opts:["La Piedra de Rosetta","La Piedra Filosofal","El Fósil Hélix"], ans:0 },
          { q:"¿En qué ciudad está el Museo Británico?", opts:["Londres","Oxford","Bristol"], ans:0 },
          { q:"¿Qué tipo de lugar es el Museo Británico?", opts:["Un museo de historia y civilizaciones","Un estadio","Un puerto"], ans:0 },
          { q:"¿Qué idioma ayuda a recordar el nombre Rosetta Stone en inglés?", opts:["El inglés","El sueco","El vasco"], ans:0 },
          { q:"¿Qué país tiene a Londres como capital?", opts:["Reino Unido","Bélgica","Suiza"], ans:0 }
        ]
      },
      {
        name:"Buckingham Palace",
        img:"images/londres/buckingham.jpg",
        questions:[
          { q:"¿Cómo se llama la famosa ceremonia militar diaria que congrega turistas frente a la fachada del palacio?", opts:["El Cambio de Guardia","El Desfile Real del Té","La Marcha del Rey"], ans:0 },
          { q:"¿En qué ciudad está Buckingham Palace?", opts:["Londres","París","Cardiff"], ans:0 },
          { q:"¿Qué familia vive o trabaja oficialmente asociada al palacio?", opts:["La familia real británica","La familia imperial romana","Los Tudor actuales"], ans:0 },
          { q:"¿Qué color se asocia a muchas cabinas telefónicas clásicas de Londres?", opts:["Rojo","Verde","Amarillo"], ans:0 },
          { q:"¿Qué sistema político tiene una monarquía en el Reino Unido?", opts:["Monarquía parlamentaria","Imperio azteca","República romana antigua"], ans:0 }
        ]
      },
      {
        name:"Hyde Park",
        img:"images/londres/hyde-park.jpg",
        questions:[
          { q:"¿Qué rincón del parque permite a cualquier ciudadano subirse a una caja y dar discursos libremente?", opts:["Speakers' Corner (Rincón de los oradores)","The Central Stage","The King's Corner"], ans:0 },
          { q:"¿En qué ciudad está Hyde Park?", opts:["Londres","Birmingham","Leeds"], ans:0 },
          { q:"¿Qué tipo de lugar es Hyde Park?", opts:["Un gran parque urbano","Un palacio","Una estación"], ans:0 },
          { q:"¿Qué significa 'park' en inglés?", opts:["Parque","Puente","Palacio"], ans:0 },
          { q:"¿Qué clima encaja más con muchos parques londinenses?", opts:["Templado y húmedo","Desértico","Polar antártico"], ans:0 }
        ]
      },
      {
        name:"London Eye",
        img:"images/londres/london-eye.jpg",
        questions:[
          { q:"¿Cuánto tiempo tarda aproximadamente la noria del London Eye en dar una vuelta completa?", opts:["Unos 30 minutos","Exactamente 5 minutos","Casi 2 horas"], ans:0 },
          { q:"¿En qué ciudad está el London Eye?", opts:["Londres","Glasgow","Dublín"], ans:0 },
          { q:"¿Qué tipo de atracción es el London Eye?", opts:["Una noria gigante","Un castillo","Un museo de trenes"], ans:0 },
          { q:"¿Qué río se ve desde el London Eye?", opts:["Támesis","Miño","Turia"], ans:0 },
          { q:"¿Qué palabra inglesa significa 'ojo' y da nombre a esta atracción?", opts:["Eye","Bridge","Clock"], ans:0 }
        ]
      }
    ]
  },
  "Cádiz": {
    emoji:"⚓",
    country:"🇪🇸",
    label:"Cádiz (Donde vive el primo Andrés)",
    cityImg:"images/cadiz/cadiz.jpg",
    welcome:"¡Cádiz, la ciudad más antigua de Occidente, rodeada de mar por todas partes! Aquí vive vuestro primo Andrés, que se conoce cada rincón de la bahía y ya está avisado: si la Smart-Rotom detecta algo entre las murallas y las olas, él os echa una mano.",
    places:[
      {
        name:"Catedral de Cádiz",
        img:"images/cadiz/catedral.jpg",
        questions:[
          { q:"¿De qué color llamativo es la gran cúpula de la Catedral de Cádiz?", opts:["Amarilla","Verde","Roja"], ans:0, exp:"Está cubierta de azulejos amarillos, y por eso se la ve brillar desde toda la bahía y desde el mar." },
          { q:"¿Cómo se conoce popularmente a la Catedral de Cádiz?", opts:["La Catedral Nueva","La Catedral del Mar","La Catedral Roja"], ans:0, exp:"Se llama 'Nueva' porque sustituyó a una catedral anterior, la Vieja, que se quemó en un ataque a la ciudad." },
          { q:"¿Junto a qué está construida la Catedral de Cádiz?", opts:["Junto al mar","Junto a un volcán","Junto a un desierto"], ans:0, exp:"Está a pocos metros del Atlántico. El salitre del mar daña tanto su piedra que hay que restaurarla continuamente." },
          { q:"¿Cuánto se tardó en construir la Catedral de Cádiz?", opts:["Más de un siglo","Una semana","Dos años"], ans:0, exp:"Se empezó en 1722 y se terminó en 1838: tanto tiempo que cambió de estilo por el camino, del barroco al neoclásico." },
          { q:"¿Qué torre de la catedral se puede subir para ver Cádiz desde arriba?", opts:["La Torre de Poniente","La Torre Eiffel","La Torre del Oro"], ans:0, exp:"'Poniente' es por donde se pone el sol, es decir, el oeste: es la torre que mira al Atlántico." }
        ]
      },
      {
        name:"Torre Tavira",
        img:"images/cadiz/torre-tavira.jpg",
        questions:[
          { q:"¿Para qué servían las torres miradores de Cádiz como la Torre Tavira?", opts:["Para vigilar la llegada de los barcos","Para guardar caramelos","Para lanzar cohetes"], ans:0, exp:"Los comerciantes subían a ver si llegaba su barco cargado de mercancías desde América." },
          { q:"¿Qué curioso aparato hay en la Torre Tavira que proyecta la ciudad en vivo?", opts:["Una cámara oscura","Una televisión","Un telescopio espacial"], ans:0, exp:"Una cámara oscura usa lentes y espejos para proyectar en una pantalla lo que pasa fuera, en directo. Es el abuelo de la fotografía." },
          { q:"¿Qué fue la Torre Tavira en el siglo XVIII?", opts:["El torreón vigía oficial del puerto","Un hospital","Una fábrica de chocolate"], ans:0, exp:"Al ser la torre más alta de la ciudad, la eligieron como vigía oficial en 1778." },
          { q:"¿Qué se ve desde lo alto de la Torre Tavira?", opts:["Los tejados de Cádiz y el mar","Los Pirineos","El desierto del Sáhara"], ans:0, exp:"Cádiz está en una península estrecha, así que desde arriba se ve el mar rodeándola casi por completo." },
          { q:"¿Por qué Cádiz llegó a tener más de cien torres miradores?", opts:["Porque los comerciantes querían ver llegar sus barcos","Porque había un concurso de torres","Para que anidaran las cigüeñas"], ans:0, exp:"En el siglo XVIII Cádiz tenía el monopolio del comercio con América, y quien antes veía llegar su barco antes hacía negocio." }
        ]
      },
      {
        name:"Playa de La Caleta",
        img:"images/cadiz/la-caleta.jpg",
        questions:[
          { q:"¿Qué dos construcciones vigilan los extremos de la playa de La Caleta?", opts:["Dos castillos","Dos volcanes","Dos aeropuertos"], ans:0, exp:"Los castillos de Santa Catalina y de San Sebastián, uno a cada lado, protegían esta entrada natural a la ciudad." },
          { q:"¿Qué edificio con forma de balneario preside La Caleta?", opts:["El Balneario de la Palma","Un rascacielos","Una estación de tren"], ans:0, exp:"Es un antiguo balneario de principios del siglo XX, cuando la gente iba a bañarse al mar por salud." },
          { q:"¿En qué barrio marinero de Cádiz está La Caleta?", opts:["En el barrio de La Viña","En Chamberí","En el Raval"], ans:0, exp:"La Viña es el barrio de pescadores de Cádiz, famoso también por sus carnavales." },
          { q:"¿Cómo es la playa de La Caleta?", opts:["Pequeña y recogida entre dos castillos","Inmensa y llena de nieve","De arena negra volcánica"], ans:0, exp:"Es una cala diminuta, muy protegida del viento justo por estar encajada entre los dos castillos." },
          { q:"¿Qué océano baña las playas de Cádiz?", opts:["El océano Atlántico","El océano Índico","El océano Pacífico"], ans:0, exp:"Cádiz está en el suroeste de España, ya fuera del Mediterráneo: el estrecho de Gibraltar separa los dos mares." }
        ]
      },
      {
        name:"Castillo de San Sebastián",
        img:"images/cadiz/san-sebastian.jpg",
        questions:[
          { q:"¿Cómo se llega andando al Castillo de San Sebastián?", opts:["Por un largo camino sobre el mar","En helicóptero","En submarino"], ans:0, exp:"Un paseo de unos 750 metros construido sobre el agua une el castillo con la ciudad." },
          { q:"¿Qué construcción del castillo servía para guiar a los barcos de noche?", opts:["Un faro","Una piscina","Un campo de fútbol"], ans:0, exp:"Su faro fue uno de los primeros de España en usar luz eléctrica." },
          { q:"¿Dónde está construido el Castillo de San Sebastián?", opts:["Sobre un islote en el mar","En la cima de una montaña","Bajo tierra"], ans:0, exp:"Está en un pequeño islote separado de Cádiz, lo que lo hacía muy difícil de atacar." },
          { q:"¿Para qué se construyó el Castillo de San Sebastián?", opts:["Para defender la ciudad de los ataques","Para jugar al escondite","Para cultivar naranjas"], ans:0, exp:"Cádiz era la puerta del comercio con América, así que era un objetivo constante de piratas y flotas enemigas." },
          { q:"¿Qué playa queda justo al lado del Castillo de San Sebastián?", opts:["La Caleta","La Malvarrosa","La Concha"], ans:0, exp:"La Malvarrosa está en Valencia y La Concha en San Sebastián, la ciudad del País Vasco: no confundir con este castillo." }
        ]
      },
      {
        name:"Parque Genovés",
        img:"images/cadiz/parque-genoves.jpg",
        questions:[
          { q:"¿Qué sorpresa esconde la gruta con cascada del Parque Genovés?", opts:["Unos dinosaurios de piedra","Una montaña rusa","Un circuito de karts"], ans:0, exp:"Hay figuras de dinosaurios junto a la cascada y el lago artificial, y es lo que más gusta a los niños del parque." },
          { q:"¿Cómo están recortados muchos árboles del Parque Genovés?", opts:["Con formas geométricas, como esculturas","En forma de letras","Todos en forma de seta"], ans:0, exp:"Esa técnica de recortar plantas con formas se llama topiaria, y en este parque hay más de cien especies así." },
          { q:"¿Junto a qué se encuentra el Parque Genovés?", opts:["Junto a la muralla y el mar","Junto a un pantano","Junto a un puerto de montaña"], ans:0, exp:"Está pegado a las murallas de Cádiz, en la parte que mira al Atlántico." },
          { q:"¿Qué es el Parque Genovés?", opts:["El jardín histórico más importante de Cádiz","Un estadio de fútbol","Un museo de trenes"], ans:0, exp:"Es un jardín del siglo XIX, protegido como Bien de Interés Cultural." },
          { q:"¿Qué se puede hacer en el estanque del Parque Genovés?", opts:["Ver la cascada y los patos","Pescar tiburones","Bucear entre corales"], ans:0, exp:"Es un lago artificial poco profundo, hecho para pasear alrededor, no para bañarse." }
        ]
      },
      {
        name:"Puente de la Constitución de 1812",
        img:"images/cadiz/puente-pepa.jpg",
        questions:[
          { q:"¿Cómo se conoce popularmente al Puente de la Constitución de 1812?", opts:["Puente de la Pepa","Puente de la Concha","Puente del Sol"], ans:0, exp:"A la Constitución de 1812 la llamaron 'La Pepa' porque se aprobó el 19 de marzo, día de San José." },
          { q:"¿Qué une el Puente de la Pepa?", opts:["Cádiz con Puerto Real, cruzando la bahía","Cádiz con Marruecos","Cádiz con Mallorca"], ans:0, exp:"Cruza la bahía por encima del agua y ahorra un buen rodeo por tierra." },
          { q:"¿Qué tiene de especial el tramo central del Puente de la Pepa?", opts:["Se puede levantar para que pasen los barcos grandes","Es de cristal","Gira sobre sí mismo"], ans:0, exp:"Tiene un tramo móvil que se eleva, porque por debajo tienen que pasar barcos muy altos hacia los astilleros." },
          { q:"¿Sobre qué está construido el Puente de la Pepa?", opts:["Sobre la bahía de Cádiz","Sobre el río Ebro","Sobre un lago de montaña"], ans:0, exp:"La bahía de Cádiz es una gran entrada de mar, y el puente la cruza de lado a lado." },
          { q:"¿Por qué se llama 'de la Constitución de 1812'?", opts:["Por la Constitución que se aprobó en Cádiz ese año","Porque el puente se construyó en 1812","Por un rey llamado Constitución"], ans:0, exp:"El puente se inauguró en 2015, pero recuerda la primera Constitución española, que se firmó precisamente en Cádiz en 1812." }
        ]
      }
    ]
  },
  "Huelva": {
    emoji:"⛵",
    country:"🇪🇸",
    label:"Huelva (Donde viven los abuelos Andrés y Felisa)",
    cityImg:"images/huelva/huelva.jpg",
    welcome:"¡Huelva! 👵👴 Aquí viven <strong>los abuelos Andrés y Felisa</strong>, y ya han puesto la mesa. Pero antes hay trabajo: en esta tierra, donde se juntan dos ríos antes de llegar al Atlántico, zarparon las carabelas de Colón, y la Smart-Rotom se ha vuelto loca entre los muelles de hierro y los monasterios.",
    places:[
      {
        name:"Muelle del Tinto",
        img:"images/huelva/muelle-tinto.jpg",
        questions:[
          { q:"¿Para qué se construyó el Muelle del Tinto de Huelva?", opts:["Para cargar en los barcos el mineral de las minas","Para pescar sardinas","Para aterrizar aviones"], ans:0, exp:"Los trenes llegaban cargados de mineral desde las minas y lo descargaban directamente en los barcos." },
          { q:"¿De qué material está hecho el Muelle del Tinto?", opts:["De hierro","De cristal","De hielo"], ans:0, exp:"Es una gran estructura de hierro del siglo XIX, de la época en que se construían así los puentes y las estaciones." },
          { q:"¿Qué se hace hoy en el Muelle del Tinto?", opts:["Pasear sobre el agua al atardecer","Carreras de coches","Saltos de esquí"], ans:0, exp:"Ya no se usa para el mineral: se ha convertido en un paseo y es uno de los símbolos de la ciudad." },
          { q:"¿Sobre qué río se adentra el Muelle del Tinto?", opts:["El río Odiel","El río Duero","El río Guadalquivir"], ans:0, exp:"El muelle se mete en la ría del Odiel. El Duero pasa por Zamora y el Guadalquivir por Sevilla." },
          { q:"¿De dónde venía el mineral que se cargaba en este muelle?", opts:["De las minas de Riotinto","De Sierra Nevada","De las islas Canarias"], ans:0, exp:"De las minas de Riotinto, en el interior de la provincia de Huelva, de donde se saca cobre desde hace miles de años." }
        ]
      },
      {
        name:"Monumento a la Fe Descubridora",
        img:"images/huelva/monumento-colon.jpg",
        questions:[
          { q:"¿A quién representa el gran monumento blanco de la Punta del Sebo?", opts:["A Cristóbal Colón","A un torero","A un futbolista"], ans:0, exp:"Es una figura enorme con hábito de fraile que representa a Colón mirando hacia América." },
          { q:"¿En qué lugar exacto se levanta el monumento?", opts:["Donde se juntan los ríos Tinto y Odiel","En la cima de un monte nevado","En una isla del Mediterráneo"], ans:0, exp:"La Punta del Sebo es la lengua de tierra donde el Tinto y el Odiel se unen antes de llegar al mar." },
          { q:"¿Quién regaló este monumento a Huelva?", opts:["Una escultora estadounidense","El rey de Marruecos","Un equipo de fútbol"], ans:0, exp:"Lo hizo y lo donó la escultora estadounidense Gertrude Vanderbilt Whitney, y se inauguró en 1929." },
          { q:"¿De qué material es la enorme figura del monumento?", opts:["De piedra blanca","De chocolate","De plástico"], ans:0, exp:"Está construido con grandes bloques de piedra clara, y por eso destaca tanto sobre la ría." },
          { q:"¿Qué se ve desde el monumento de la Punta del Sebo?", opts:["La ría de Huelva y sus barcos","Los Alpes nevados","Un desierto de dunas"], ans:0, exp:"Desde ahí se ve entrar y salir los barcos por la ría, igual que hacían las carabelas." }
        ]
      },
      {
        name:"Monasterio de La Rábida",
        img:"images/huelva/la-rabida.jpg",
        questions:[
          { q:"¿Quién se alojó en el Monasterio de La Rábida antes de su gran viaje?", opts:["Cristóbal Colón","Julio César","Napoleón"], ans:0, exp:"Colón se quedó allí con su hijo Diego y encontró en los frailes el apoyo que necesitaba para su plan." },
          { q:"¿En qué pueblo de Huelva está el Monasterio de La Rábida?", opts:["Palos de la Frontera","Bilbao","Alcalá de Henares"], ans:0, exp:"Palos de la Frontera está a orillas del río Tinto, muy cerca de la ciudad de Huelva." },
          { q:"¿Qué frailes vivían en el Monasterio de La Rábida?", opts:["Franciscanos","Samuráis","Vikingos"], ans:0, exp:"Eran frailes franciscanos. Dos de ellos, fray Juan Pérez y fray Antonio de Marchena, ayudaron a Colón a convencer a los Reyes Católicos." },
          { q:"¿Por qué es famoso el Monasterio de La Rábida?", opts:["Allí se preparó el viaje que llevó al descubrimiento de América","Allí se inventó el fútbol","Allí nació el chocolate"], ans:0, exp:"En sus salas se discutió y se preparó el viaje de 1492, y por eso se le llama 'el lugar del descubrimiento'." },
          { q:"¿En qué siglo llegó Colón a La Rábida?", opts:["En el siglo XV","En el siglo XXI","En el siglo I"], ans:0, exp:"Llegó en 1485, y el siglo XV son los años del 1400 al 1499." }
        ]
      },
      {
        name:"Muelle de las Carabelas",
        img:"images/huelva/muelle-carabelas.jpg",
        questions:[
          { q:"¿Qué se puede visitar en el Muelle de las Carabelas?", opts:["Las réplicas de la Niña, la Pinta y la Santa María","Un parque de atracciones","Una fábrica de coches"], ans:0, exp:"Son copias a tamaño real de los tres barcos con los que Colón cruzó el Atlántico." },
          { q:"¿Cuántos barcos replicados del viaje de Colón se pueden ver?", opts:["Tres","Diez","Uno"], ans:0, exp:"Tres: la Niña y la Pinta, que eran carabelas, y la Santa María, que era algo más grande y se llamaba nao." },
          { q:"¿Se puede subir a bordo de los barcos del Muelle de las Carabelas?", opts:["Sí, se camina por sus cubiertas","No, están hundidos bajo el agua","Solo se ven en fotografías"], ans:0, exp:"Se puede subir y recorrerlos por dentro, y así se comprueba lo pequeños que eran para un viaje tan largo." },
          { q:"¿Junto a qué monasterio está el Muelle de las Carabelas?", opts:["La Rábida","El Escorial","Montserrat"], ans:0, exp:"Está a los pies de La Rábida. El Escorial está en Madrid y Montserrat en Barcelona." },
          { q:"¿Desde qué puerto de Huelva partió Colón en 1492?", opts:["Palos de la Frontera","Barcelona","Santander"], ans:0, exp:"Zarpó de Palos de la Frontera el 3 de agosto de 1492." }
        ]
      },
      {
        name:"Barrio Reina Victoria",
        img:"images/huelva/barrio-reina-victoria.jpg",
        questions:[
          { q:"¿Qué tienen de raro las casas del Barrio Reina Victoria de Huelva?", opts:["Parecen casitas inglesas","Están hechas de hielo","Flotan sobre el agua"], ans:0, exp:"Tienen tejados a dos aguas, ladrillo visto y jardincitos: parece un pueblo inglés en medio de Andalucía." },
          { q:"¿Quién construyó el Barrio Reina Victoria?", opts:["Una compañía minera británica, para sus trabajadores","Los romanos","Unos astronautas"], ans:0, exp:"Lo levantó la Rio Tinto Company Limited a partir de 1916 para alojar a sus empleados." },
          { q:"¿Con qué otro nombre se conoce al Barrio Reina Victoria?", opts:["Barrio Obrero","Barrio Marino","Barrio Dorado"], ans:0, exp:"Se le llama Barrio Obrero porque se construyó para los obreros de la mina." },
          { q:"¿Por qué este barrio de Huelva tiene nombre de reina inglesa?", opts:["Porque lo hicieron los ingleses de las minas de Riotinto","Porque allí vivió una reina","Porque ganó un concurso"], ans:0, exp:"Los británicos que explotaban las minas lo dedicaron a su reina Victoria." },
          { q:"¿Qué tienen delante las casas del Barrio Reina Victoria?", opts:["Pequeños jardines","Piscinas olímpicas","Pistas de aterrizaje"], ans:0, exp:"Cada casa tiene su jardín delantero, algo muy típico de las casas inglesas y muy poco habitual en el sur de España." }
        ]
      },
      {
        name:"Santuario de la Cinta",
        img:"images/huelva/santuario-cinta.jpg",
        questions:[
          { q:"¿Quién es la patrona de Huelva, a la que está dedicado este santuario?", opts:["La Virgen de la Cinta","La Virgen del Pilar","La Virgen de Covadonga"], ans:0, exp:"La Virgen del Pilar es la patrona de Zaragoza y la de Covadonga la de Asturias." },
          { q:"¿Qué famoso navegante visitó esta ermita al volver de América?", opts:["Cristóbal Colón","Marco Polo","Fernando de Magallanes"], ans:0, exp:"Se cuenta que Colón fue a cumplir una promesa a esta ermita tras sobrevivir a la tormenta del viaje de vuelta." },
          { q:"¿Dónde está situado el Santuario de la Cinta?", opts:["En un cerro con vistas sobre Huelva","En el fondo del mar","En una isla desierta"], ans:0, exp:"Está en el cerro de la Cinta, en alto, desde donde se ve la ciudad y la ría." },
          { q:"¿Cómo son los azulejos que decoran el Santuario de la Cinta?", opts:["Andaluces, pintados a mano","Chinos","Egipcios"], ans:0, exp:"Los pintó el artista Daniel Zuloaga, y son uno de los grandes tesoros del santuario." },
          { q:"¿Cuándo se celebran las fiestas de la Virgen de la Cinta en Huelva?", opts:["En septiembre","En Nochevieja","En Semana Santa"], ans:0, exp:"Su romería y sus fiestas son a comienzos de septiembre, y es la gran celebración de la ciudad." }
        ]
      }
    ]
  }
};
