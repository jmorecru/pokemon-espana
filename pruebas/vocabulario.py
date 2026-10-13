# -*- coding: utf-8 -*-
# Comprueba que los temas de repaso no se salen de los apuntes.
#
#   python pruebas/vocabulario.py
#
# La regla del usuario para los idiomas: los sustantivos tienen que salir todos
# de los apuntes, ni uno mas, ni siquiera como opcion equivocada; las palabras
# basicas (infinitivos, articulos, preposiciones) si valen. Con cien preguntas
# eso no se garantiza a ojo, asi que aqui estan transcritos los apuntes.
#
# Aleman: en aleman los sustantivos van SIEMPRE en mayuscula, asi que basta con
# mirar las palabras en mayuscula que no empiezan frase. Si alguna no esta en
# los apuntes, falla.
#
# Ingles (Science): todo el texto es ingles y no hay forma automatica de
# separar "vocabulario del tema" de "ingles normal", asi que no falla: lista las
# palabras que no aparecen en los apuntes para mirarlas a ojo.
#
# AL ANADIR UN TEMA: transcribir sus apuntes aqui abajo y anadirlo a TEMAS.
import pathlib, re, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
RUTA = RAIZ / "data" / "repaso.js"

# --- Apuntes de aleman, en el orden en que llegaron -------------------------
ALEMAN_CASA = """
MEIN HAUS, MEINE STADT
das Haus  das Fenster  die Tür  der Garten
Balkon  Esszimmer  Küche  Sitzzimmer  Wohnzimmer  Schlafzimmer  Bad  Malzimmer
Das lernst du: die Wohnung und das Kinderzimmer beschreiben
den Wohnort vorstellen  den Schulweg beschreiben
Hör zu. Zeig auf dem Bild. Sprich nach.
Wie ist das Haus? Formuliert Sätze.
Das Fenster ist ...   Der Garten ist ...
groß klein rund schön grün braun
Wie viele Zimmer hat das Haus?
Was denkt ihr: Wer wohnt hier?
Wo sind die Hobbits? Ordne die Bilder zu.
im Wohnzimmer   in der Küche  im Schlafzimmer  im Garten  im Bad   auf dem Balkon
Die Hobbits kochen. Sie sind in der Küche.
Die Hobbits lesen ein Buch. Sie sind auf dem Balkon.
Die Hobbits machen Musik. Sie sind im Wohnzimmer.
Die Hobbits schlafen. Sie sind im Schlafzimmer.
Die Hobbits spielen Ball. Sie sind im Garten.
Die Hobbits duschen. Sie sind im Bad.
Wo machen die Hobbits was? Mach dein Buch zu. Nein, falsch.
der Tisch  der Stuhl  der Schrank  das Regal  der Computer
die Lampe  das Bett  das Bild
Was ist im Kinderzimmer? Lies die Texte. Wer wohnt im Zimmer oben?
Ben: Mein Zimmer ist nicht sehr groß, aber hell. Ich habe ein Bett, einen
Schreibtisch und einen Schrank. Natürlich habe ich auch einen Computer. Ich
spiele gern am Computer und höre Musik. Ich teile mein Zimmer mit Tim, das ist
mein kleiner Bruder. Er hat auch ein Bett und viele Spielsachen.
Daniel: Mein Zimmer ist klein. Da sind nur mein Bett und mein Tisch. Und meine
Regale. Ich lese sehr gern und ich mag meine Bücher. Aber ich brauche noch eine
Leselampe. Mein Zimmer ist ziemlich dunkel. Ich male auch gern, meine Bilder
hängen an der Wand.
Anna: Mein Zimmer ist groß und schön! Da stehen mein Bett, mein Regal, mein
Schrank, mein Tisch und mein Stuhl. Auf dem Tisch sind meine Stifte und eine
Lampe. Ich habe einen Teppich, der ist schön bunt. Ich mag mein Zimmer!
Cuaderno: das Zimmer  das Badezimmer
"""

ALEMAN_POSESIVOS = """
Die Possessivadjektive
Das ist mein Kuli. Das ist mein Buch. Das ist meine Schwester.
Das sind meine Katzen.
dein deine: Das ist dein Buch. Das ist deine Schwester. Das sind deine Katzen.
sein seine: Das ist sein Buch. Das ist seine Schwester. Das sind seine Katzen.
ihr ihre: Das ist ihr Buch. Das ist ihre Schwester. Das sind ihre Katzen.
Mein Vater ist 44 Jahre alt, sein Zimmer ist groß, da stehen sein Bett,
sein Schrank und sein Tisch.
Meine Mutter ist 40 Jahre alt, ihr Zimmer ist groß, da stehen ihr Tisch,
ihr Schrank und ihr Bett.
Wie heißt du? Ich heiße Alvaro. Woher kommst du? Ich komme aus Spanien.
Wo wohnst du? Ich wohne in Madrid. Wie alt bist du? Ich bin 6 Jahre alt.
"""

# --- Apuntes de Science: Energy ----------------------------------------------
SCIENCE_ENERGY = """
What is energy? Energy is the ability to do work. Energy can take many forms,
including heat energy, electrical energy, mechanical energy, and nuclear energy.
Energy is also found in the human body, and it allows the body to run, play
sports, eat, and operate organ systems required for survival. The Sun is the
most important energy source. The Sun produces radiant (light) and heat energy,
which creates an environment on Earth that allows plants and animals to grow
and live. Humans need to use and store energy for a variety of purposes like
powering vehicles, heating houses, and cooking food. One of the most common and
useful forms of energy is electrical energy. It is used to power many household
devices and electronics, such as computers, televisions, lightbulbs, and fridges.
What types of things in your house require energy?
Energy is what makes things move, change and carry out work. Examples of types
of energy. Electrical: the movement of electrons usually through a wire such as
electricity. Lightning is also an example. Thermal heat: energy that comes from
the temperature of matter. It is transferred from hotter objects to cooler ones.
Sound: travels in waves and is produced when a force causes an object or
substance to vibrate. Light: travels in waves, such as visible light or x-rays.
Chemical: energy stored in the bonds of atoms and molecules. Mechanical: energy
related to the movement and position of objects.
Types of mechanical energy. Kinetic energy: the energy an object possesses
because it is moving. For example, a moving car, a flying bird, or a rolling
ball all have kinetic energy. Potential energy: the energy an object has stored
due to its position or condition. Gravitational potential energy: energy stored
by an object's height above the ground. A book on a shelf has more
gravitational potential energy than one on the floor. Elastic potential energy:
energy stored in objects that can be stretched or compressed, like a spring or a
rubber band.
Energy transformations. The law of conservation of energy states that energy
can neither be created nor destroyed, only transferred or transformed from one
form of energy to another. When energy changes form, it is called energy
transformation. Energy changes form whenever it is used to do work. Another
name for energy transformation is energy conversion.
Chemical light, chemical mechanical, electrical light, electrical heat, light
chemical. battery flashlight fuel car food bike cyclist plug lamp oven sun tree.
Comparing conduction, convection and radiation. Conduction is heat transfer
through direct contact between objects or substances. Touching a hot pan,
heating a metal rod at one end, or warming your hands by holding a cup of hot
coffee. Convection transfers heat by moving fluids (liquids or gases). Boiling
water, air circulation in a room with a heater, or sea breezes at the coast.
Radiation is the transfer of heat through electromagnetic waves. Feeling the
warmth of the Sun, heat transfer from a fire, or using an infrared camera.
Match the energy types with the correct picture. A form of energy resulting
from moving electric charges. Energy that flows from hot objects to cold
objects. Energy that is stored in a sound wave. A form of energy which our eyes
can detect. Energy stored in the bonds that connect atoms and molecules
together. Energy that is stored in stretched or squashed materials. Energy in
an object stored due to its height above the ground. The energy an object
possesses because it is moving. Sound light heat kinetic elastic potential
chemical electrical gravitational potential.
Energy is the ability to do work or cause change. Energy can be converted, or
changed, from one form to another. Word bank: energy of motion, electrical
energy, heat energy, light energy, sound energy. An alarm clock that is plugged
into the wall makes a loud sound. A fan is plugged into the wall. As the fan's
blades turn, it produces a breeze. Solar panels capture sunlight to power
devices that are plugged into the wall. When riding a bike, you begin to sweat.
An ice cream cone melts in the sun. You clap your hands to make noise. This is
an example of electrical energy converting to sound energy.
Write the words to complete the diagrams. apple cyclist battery flashlight plug
lamp fuel pump car sun plant toaster. Look at the pictures and write the words
in the correct place. Kinetic Mechanical Radiant Stored Potential Light
Chemical Nuclear Sound Elastic Electrical Heat. food running batteries radio.
Heat transfer. Read each bubble and determine if the phrase is describing heat
transfer by convection, radiation or conduction. Boiling water, the cold water
starts to sink and the warm water rises. Holding a hot water bottle to keep you
warm. Touching a metal spoon that has been in boiling water. Heating a pot on
the stove. Standing in the sun to keep warm. Hot chocolate, the heat of the
liquid makes the warm air rise. A radiant bathroom heat lamp. Using an electric
blanket to get warm. Holding a hot cup of tea to warm your hands. Warm air
rising in a hot air balloon. Transfer of heat through currents in liquids and
gases. Convection oven. The ocean currents. Warming hands by placing them near
a fire. Standing near a light bulb that had been on for a long time. Transfer
of heat through infrared rays. Heat moves from warmer to colder areas in solid
objects. The sand on the beach getting hot on a sunny day.
"""

TEMAS = [
    # (nombre del tema en repaso.js, apuntes, modo)
    ("Alemán: la casa y los muebles", ALEMAN_CASA, "aleman"),
    # Los posesivos usan tambien las palabras de la casa, que ya estan dadas.
    ("Alemán: los posesivos", ALEMAN_CASA + ALEMAN_POSESIVOS, "aleman"),
    ("Science: Energy", SCIENCE_ENERGY, "ingles"),
]

# Palabras que el detector de aleman podria tomar por sustantivos y no lo son.
NO_ES_ALEMAN = {"pokémon", "smart", "rotom"}
FIN_DE_FRASE = re.compile(r"[.!?:;¿¡(\-—]\s*$")


def bloque_del_tema(texto, nombre):
    marca = '"' + nombre + '": ['
    if marca not in texto:
        sys.exit("no encuentro el tema: " + nombre)
    return texto.split(marca, 1)[1].split("\n    ]", 1)[0]


def campos(bloque):
    out = []
    for etiqueta, patron in [("pregunta", r'q:"([^"]*)"'), ("explicacion", r'exp:"([^"]*)"'),
                             ("respuesta", r'resp:"([^"]*)"'), ("pista", r'pista:"([^"]*)"')]:
        for m in re.finditer(patron, bloque):
            out.append((etiqueta, m.group(1)))
    for m in re.finditer(r'(?:opts|acepta):\[([^\]]*)\]', bloque):
        for o in re.findall(r'"([^"]*)"', m.group(1)):
            out.append(("opcion", o))
    return out


def sustantivos_alemanes(frase):
    limpio = re.sub(r"</?strong>", "", frase)
    fuera = []
    for m in re.finditer(r"[A-Za-zÀ-ÿß]+", limpio):
        palabra = m.group(0)
        if palabra.lower() in NO_ES_ALEMAN:
            continue
        if "ß" in palabra or any(c in palabra for c in "üöäÜÖÄ"):
            fuera.append(palabra)
            continue
        if not palabra[:1].isupper():
            continue
        antes = limpio[:m.start()]
        if not antes.strip() or FIN_DE_FRASE.search(antes):
            continue
        fuera.append(palabra)
    return fuera


texto = RUTA.read_text(encoding="utf-8")
hay_fallos = False

for nombre, apuntes, modo in TEMAS:
    permitidas = set(re.findall(r"[a-zà-ÿß]+", apuntes.lower()))
    # Las pistas ensenan a escribir sin dieresis ni ss alemana (Kueche, Kuche,
    # gross): son la misma palabra, no vocabulario nuevo.
    for p in list(permitidas):
        for a, b in (("ü", "ue"), ("ö", "oe"), ("ä", "ae"), ("ß", "ss")):
            if a in p:
                permitidas.add(p.replace(a, b))
                permitidas.add(p.replace(a, b[0]))
    cs = campos(bloque_del_tema(texto, nombre))
    print("=" * 70)
    print(nombre)
    print("  preguntas: %d | de escribir: %d | palabras en los apuntes: %d"
          % (sum(1 for k, _ in cs if k == "pregunta"),
             sum(1 for k, _ in cs if k == "respuesta"), len(permitidas)))

    if modo == "aleman":
        malas = {}
        for clase, valor in cs:
            for p in sustantivos_alemanes(valor):
                if p.lower() not in permitidas and p[:1].isupper():
                    malas.setdefault(p, (clase, valor[:70]))
        if malas:
            hay_fallos = True
            print("  *** SUSTANTIVOS FUERA DE LOS APUNTES ***")
            for p, (clase, v) in sorted(malas.items()):
                print("     %-16s %s: %s" % (p, clase, v))
        else:
            print("  OK: ni un sustantivo aleman fuera de los apuntes")

    else:
        nuevas = {}
        for clase, valor in cs:
            for p in re.findall(r"[a-z]+", re.sub(r"<[^>]+>", " ", valor).lower()):
                if len(p) > 3 and p not in permitidas:
                    nuevas[p] = nuevas.get(p, 0) + 1
        print("  Palabras que no salen en los apuntes (mirar a ojo que sean ingles")
        print("  normal y no un concepto nuevo):")
        print("    " + ", ".join(sorted(nuevas)))

print("=" * 70)
sys.exit(1 if hay_fallos else 0)
