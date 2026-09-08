// Todo lo de la musica: la tabla de afinacion, las tres melodias de estilo
// 8 bits y el sintetizador que las suena con la Web Audio API.

// ---------------------------------------------------------------------------
// Musica chiptune generada en el propio navegador con la Web Audio API.
//
// Antes esto eran tres rutas a mp3 (audio/city.mp3, battle.mp3 y legend.mp3)
// que nunca llegaron a existir, asi que el boton de musica solo servia para
// mostrar "Sin audio". Se sintetizan aqui melodias propias de estilo 8 bits en
// lugar de usar las bandas sonoras originales de Pokemon, que no se pueden
// redistribuir en un repositorio publico. De paso no pesa nada, funciona sin
// conexion y no hay que servir ningun fichero.

const MASTER_VOL = 0.2;

const NOTE_STEPS = { C:0, "C#":1, D:2, "D#":3, E:4, F:5, "F#":6, G:7, "G#":8, A:9, "A#":10, B:11 };

function noteFreq(name) {
  const m = /^([A-G]#?)(-?\d)$/.exec(name || "");
  if (!m) return 0;
  const midi = (Number(m[2]) + 1) * 12 + NOTE_STEPS[m[1]];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Cada pista son dos voces alineadas paso a paso (corcheas): la melodia en
// onda cuadrada y el bajo en triangular. null = silencio en ese paso.
const CHIPTUNE = {
  // Tema de exploracion: alegre, en do mayor, para pasear por la ciudad.
  city: {
    tempo: 128, loop: true, hats: false,
    lead: [
      "E5","G5","A5","G5","E5","D5","C5","D5",
      "E5","G5","C6","B5","A5","G5","E5","D5",
      "F5","A5","C6","A5","G5","F5","E5","D5",
      "C5","E5","G5","B5","C6",null ,"G5",null ,
      "A5","G5","E5","G5","A5","C6","B5","A5",
      "G5","E5","D5","E5","G5","A5","G5","E5",
      "F5","E5","D5","C5","D5","E5","F5","G5",
      "E5","C5","D5","E5","C5",null ,null ,null
    ],
    bass: [
      "C3",null ,"C3",null ,"G2",null ,"G2",null ,
      "A2",null ,"A2",null ,"E3",null ,"E3",null ,
      "F2",null ,"F2",null ,"C3",null ,"C3",null ,
      "G2",null ,"G2",null ,"C3",null ,"G2",null ,
      "A2",null ,"A2",null ,"E3",null ,"E3",null ,
      "C3",null ,"C3",null ,"G2",null ,"G2",null ,
      "F2",null ,"F2",null ,"C3",null ,"C3",null ,
      "G2",null ,"G2",null ,"C3",null ,null ,null
    ]
  },
  // Tema de combate: mas rapido, en la menor, con percusion de ruido.
  battle: {
    tempo: 176, loop: true, hats: true,
    lead: [
      "A4","E5","A5","E5","C5","E5","A4","C5",
      "G4","D5","G5","D5","B4","D5","G4","B4",
      "F4","C5","F5","C5","A4","C5","F4","A4",
      "E4","B4","E5","G5","F5","E5","D5","C5"
    ],
    bass: [
      "A2","A2",null ,"A2","A2",null ,"A2","A2",
      "G2","G2",null ,"G2","G2",null ,"G2","G2",
      "F2","F2",null ,"F2","F2",null ,"F2","F2",
      "E2","E2",null ,"E2","E2","E2","E2","E2"
    ]
  },
  // Fanfarria de victoria: suena una vez, al capturar al legendario.
  legend: {
    tempo: 120, loop: false, hats: false,
    lead: [
      "G4",null ,"G4",null ,"G4",null ,"C5",null ,
      null ,null ,"C5",null ,"E5",null ,null ,null ,
      "G5",null ,null ,null ,"E5",null ,"G5",null ,
      "C6",null ,null ,null ,null ,null ,"B5",null ,
      "C6",null ,null ,null ,null ,null ,null ,null
    ],
    bass: [
      "C3",null ,null ,null ,"C3",null ,"C3",null ,
      null ,null ,"G2",null ,"C3",null ,null ,null ,
      "C3",null ,null ,null ,"G2",null ,"G2",null ,
      "C3",null ,null ,null ,null ,null ,"G2",null ,
      "C3",null ,null ,null ,null ,null ,null ,null
    ]
  }
};

// El iPhone silencia un AudioContext "pelado" cuando el interruptor lateral
// esta en silencio: iOS manda ese sonido por la via del timbre, no por la de la
// musica. En cuanto hay un <audio> de verdad reproduciendose, iOS cambia a la
// via de la musica y entonces la Web Audio se oye igual que un video.
//
// Asi que se mantiene sonando un WAV mudo en bucle mientras haya musica. Son
// 0,05 s de silencio en 8 bits a 8 kHz: 444 bytes, no se nota en nada. No se
// puede bajar el volumen a cero por codigo (iOS no deja tocar el volumen de un
// elemento de audio), pero da igual: el fichero ya es silencio.
const SILENCIO_WAV = "data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA";

let promotorSesion = null;

// Hay que llamarla desde un gesto real del usuario (el boton de musica).
function promoverSesionAudio() {
  if (!promotorSesion) {
    promotorSesion = document.createElement("audio");
    promotorSesion.src = SILENCIO_WAV;
    promotorSesion.loop = true;
    // Sin playsinline, iOS puede querer abrirlo a pantalla completa.
    promotorSesion.setAttribute("playsinline", "");
    promotorSesion.setAttribute("webkit-playsinline", "");
  }
  const p = promotorSesion.play();
  if (p && p.catch) p.catch(function(){ /* si no deja, se oira solo con el timbre activo */ });
}

function pararPromotorSesion() {
  if (promotorSesion) {
    promotorSesion.pause();
    try { promotorSesion.currentTime = 0; } catch (e) { /* da igual */ }
  }
}

let audioCtx = null;
let masterGain = null;
let noiseBuffer = null;
let activeVoices = [];
let musicTimer = null;
let musicTrackKey = null;
let musicLooping = false;
let musicStep = 0;
let musicNextTime = 0;

function ensureAudioCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = MASTER_VOL;
    masterGain.connect(audioCtx.destination);
  }
  // El navegador arranca el contexto en suspenso hasta que hay un gesto del
  // usuario. Ojo: iOS tiene un estado propio, "interrupted", en el que cae al
  // bloquear el telefono o al entrar una llamada, asi que no vale comprobar
  // solo "suspended".
  if (audioCtx.state !== "running") audioCtx.resume();
  return audioCtx;
}

// Al volver a la pestana el contexto puede haberse quedado suspendido —en iOS
// pasa cada vez que se bloquea el telefono— y la musica moriria en silencio.
document.addEventListener("visibilitychange", function(){
  if (document.visibilityState !== "visible") return;
  if (!state.musicEnabled || !audioCtx) return;
  if (audioCtx.state !== "running") audioCtx.resume();
  promoverSesionAudio();
});

function trackVoice(node) {
  activeVoices.push(node);
  node.onended = function(){
    const k = activeVoices.indexOf(node);
    if (k > -1) activeVoices.splice(k, 1);
  };
}

function killVoices() {
  activeVoices.forEach(function(node){
    try { node.stop(); } catch (e) { /* ya habia terminado */ }
  });
  activeVoices = [];
}

function scheduleTone(freq, start, dur, type, peak) {
  if (!freq) return;
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(peak, start + 0.01);
  env.gain.setValueAtTime(peak, start + dur * 0.65);
  env.gain.linearRampToValueAtTime(0, start + dur);
  osc.connect(env);
  env.connect(masterGain);
  osc.start(start);
  osc.stop(start + dur);
  trackVoice(osc);
}

function scheduleHat(start) {
  if (!noiseBuffer) {
    const frames = Math.floor(audioCtx.sampleRate * 0.12);
    noiseBuffer = audioCtx.createBuffer(1, frames, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = audioCtx.createBufferSource();
  const env = audioCtx.createGain();
  const hp = audioCtx.createBiquadFilter();
  src.buffer = noiseBuffer;
  hp.type = "highpass";
  hp.frequency.value = 6000;
  env.gain.setValueAtTime(0.08, start);
  env.gain.exponentialRampToValueAtTime(0.001, start + 0.05);
  src.connect(hp);
  hp.connect(env);
  env.connect(masterGain);
  src.start(start);
  src.stop(start + 0.06);
  trackVoice(src);
}

// Va dejando notas programadas medio segundo por delante del reloj de audio:
// con setInterval a secas el ritmo se iria notando cada vez que el navegador
// se despista.
function musicScheduler() {
  const track = CHIPTUNE[musicTrackKey];
  if (!track) return;
  const stepDur = 30 / track.tempo;
  const horizon = audioCtx.currentTime + 0.5;

  while (musicNextTime < horizon) {
    const len = track.lead.length;
    if (!musicLooping && musicStep >= len) {
      window.clearInterval(musicTimer);
      musicTimer = null;
      musicTrackKey = null;
      return;
    }
    const i = musicStep % len;
    scheduleTone(noteFreq(track.lead[i]), musicNextTime, stepDur * 0.9, "square", 0.16);
    scheduleTone(noteFreq(track.bass[i]), musicNextTime, stepDur * 0.85, "triangle", 0.3);
    if (track.hats && i % 2 === 1) scheduleHat(musicNextTime);
    musicNextTime += stepDur;
    musicStep++;
  }
}
