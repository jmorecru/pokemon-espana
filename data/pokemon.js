// Los Pokemon: los legendarios que puede tocar y el catalogo del que sale
// uno por monumento.

const LEGENDARIOS = [
  {name:"Mewtwo", id:150},
  {name:"Ho-Oh", id:250},
  {name:"Lugia", id:249},
  {name:"Rayquaza", id:384},
  {name:"Entei", id:244},
  {name:"Suicune", id:245},
  {name:"Raikou", id:243},
  {name:"Latios", id:381},
  {name:"Latias", id:380},
  {name:"Articuno", id:144}
];

const RANDOM_POKEMON_POOL = [
  {name:"Pikachu",id:25},{name:"Raichu",id:26},{name:"Sandshrew",id:27},{name:"Nidoran♀",id:29},{name:"Nidoran♂",id:32},
  {name:"Clefairy",id:35},{name:"Vulpix",id:37},{name:"Jigglypuff",id:39},{name:"Oddish",id:43},{name:"Paras",id:46},
  {name:"Venonat",id:48},{name:"Meowth",id:52},{name:"Psyduck",id:54},{name:"Growlithe",id:58},{name:"Poliwag",id:60},
  {name:"Abra",id:63},{name:"Machop",id:66},{name:"Bellsprout",id:69},{name:"Tentacool",id:72},{name:"Geodude",id:74},
  {name:"Ponyta",id:77},{name:"Slowpoke",id:79},{name:"Magnemite",id:81},{name:"Farfetch’d",id:83},{name:"Doduo",id:84},
  {name:"Seel",id:86},{name:"Gastly",id:92},{name:"Onix",id:95},{name:"Krabby",id:98},{name:"Exeggcute",id:102},
  {name:"Cubone",id:104},{name:"Hitmonlee",id:106},{name:"Lickitung",id:108},{name:"Koffing",id:109},{name:"Rhyhorn",id:111},
  {name:"Tangela",id:114},{name:"Horsea",id:116},{name:"Staryu",id:120},{name:"Mr. Mime",id:122},{name:"Scyther",id:123},
  {name:"Electabuzz",id:125},{name:"Magmar",id:126},{name:"Pinsir",id:127},{name:"Tauros",id:128},{name:"Magikarp",id:129},
  {name:"Lapras",id:131},{name:"Eevee",id:133},{name:"Porygon",id:137},{name:"Snorlax",id:143},{name:"Dragonair",id:148},
  {name:"Chikorita",id:152},{name:"Cyndaquil",id:155},{name:"Totodile",id:158},{name:"Mareep",id:179},{name:"Sudowoodo",id:185},
  {name:"Hoppip",id:187},{name:"Aipom",id:190},{name:"Yanma",id:193},{name:"Misdreavus",id:200},{name:"Girafarig",id:203},
  {name:"Dunsparce",id:206},{name:"Snubbull",id:209},{name:"Sneasel",id:215},{name:"Teddiursa",id:216},{name:"Swinub",id:220},
  {name:"Skarmory",id:227},{name:"Houndour",id:228},{name:"Phanpy",id:231},{name:"Stantler",id:234},{name:"Treecko",id:252},
  {name:"Torchic",id:255},{name:"Mudkip",id:258},{name:"Poochyena",id:261},{name:"Zigzagoon",id:263},{name:"Lotad",id:270},
  {name:"Seedot",id:273},{name:"Taillow",id:276},{name:"Wingull",id:278},{name:"Ralts",id:280},{name:"Skitty",id:300},
  {name:"Mawile",id:303},{name:"Aron",id:304},{name:"Meditite",id:307},{name:"Electrike",id:309},{name:"Plusle",id:311},
  {name:"Minun",id:312},{name:"Roselia",id:315},{name:"Trapinch",id:328},{name:"Swablu",id:333},{name:"Corphish",id:341},
  {name:"Baltoy",id:343},{name:"Feebas",id:349},{name:"Shuppet",id:353},{name:"Absol",id:359},{name:"Spheal",id:363}
];
