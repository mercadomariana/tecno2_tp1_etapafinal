let figura;
let urna;

let tamAnchoIni = [347 /*0*/, 210 /*1*/, 550 /*2*/, 120 /*3*/, 90 /*4*/, 110 /*5*/, 50 /*6*/, 44 /*7*/, 140 /*8*/, 250 /*9*/, 150 /*10*/, 103 /*11*/, 85 /*12*/, 88 /*13*/, 65 /*14*/, 40 /*15*/, 90 /*16*/, 30 /*17*/, 55 /*18*/, 200 /*19*/, 190 /*20*/, 250 /*21*/, 77 /*22*/, 60 /*23*/, 90 /*24*/, 120 /*25*/, 320 /*26*/, 150 /*27*/, 40 /*28*/, 80 /*29*/, 50 /*30*/, 440 /*31*/, 180 /*32*/, 150 /*33*/, 100 /*34*/, 210 /*35*/, 50 /*36*/, 80 /*37*/, 90 /*38*/, 200 /*39*/, 500 /*40*/, 100 /*41*/, 100 /*42*/, 50 /*43*/, 250 /*44*/, 120 /*45*/, 350 /*46*/, 70 /*47*/, 30 /*48*/, 600 /*49*/];

let tamAltoIni = [359 /*0*/, 321 /*1*/, 70 /*2*/, 150 /*3*/, 120 /*4*/, 160 /*5*/, 80 /*6*/, 60 /*7*/, 200 /*8*/, 420 /*9*/, 60 /*10*/, 105 /*11*/, 140 /*12*/, 91 /*13*/, 95 /*14*/, 40 /*15*/, 120 /*16*/, 50 /*17*/, 77 /*18*/, 382 /*19*/, 470 /*20*/, 250 /*21*/, 44 /*22*/, 30 /*23*/, 110 /*24*/, 110 /*25*/, 100 /*26*/, 50 /*27*/, 40 /*28*/, 30 /*29*/, 20 /*30*/, 440 /*31*/, 180 /*32*/, 50 /*33*/, 100 /*34*/, 50 /*35*/, 30 /*36*/, 90 /*37*/, 100 /*38*/, 10 /*39*/, 80 /*40*/, 30 /*41*/, 30 /*42*/, 20 /*43*/, 250 /*44*/, 350 /*45*/, 350 /*46*/, 650 /*47*/, 500 /*48*/, 50 /*49*/];

let tamAnchoFin = [347 /*0*/, 210 /*1*/, 550 /*2*/, 180 /*3*/, 150 /*4*/, 160 /*5*/, 90 /*6*/, 80 /*7*/, 140 /*8*/, 350 /*9*/, 190 /*10*/, 170 /*11*/, 120 /*12*/, 120 /*13*/, 105 /*14*/, 80 /*15*/, 120 /*16*/, 55 /*17*/, 80 /*18*/, 200 /*19*/, 190 /*20*/, 250 /*21*/, 97 /*22*/, 80 /*23*/, 130 /*24*/, 150 /*25*/, 350 /*26*/, 190 /*27*/, 70 /*28*/, 110 /*29*/, 70 /*30*/, 440 /*31*/, 180 /*32*/, 170 /*33*/, 130 /*34*/, 240 /*35*/, 70 /*36*/, 110 /*37*/, 120 /*38*/, 220 /*39*/, 580 /*40*/, 130 /*41*/, 120 /*42*/, 80 /*43*/, 250 /*44*/, 120 /*45*/, 350 /*46*/, 70 /*74*/, 30 /*48*/, 620 /*49*/];

let tamAltoFin = [359 /*0*/, 321 /*1*/, 70 /*2*/, 200 /*3*/, 190 /*4*/, 200 /*5*/, 140 /*6*/, 90 /*7*/, 200 /*8*/, 500 /*9*/, 90 /*10*/, 170 /*11*/, 170 /*12*/, 110 /*13*/, 135 /*14*/, 80 /*15*/, 160 /*16*/, 75 /*17*/, 97 /*18*/, 382 /*19*/, 470 /*20*/, 250 /*21*/, 64 /*22*/, 50 /*23*/, 150 /*24*/, 140 /*25*/, 140 /*26*/, 90 /*27*/, 70 /*28*/, 60 /*29*/, 40 /*30*/, 440 /*31*/, 180 /*32*/, 70 /*33*/, 130 /*34*/, 80 /*35*/, 50 /*36*/, 120 /*37*/, 120 /*38*/, 30 /*39*/, 150 /*40*/, 60 /*41*/, 50 /*42*/, 40 /*43*/, 250/*44*/, 350 /*45*/, 350 /*46*/, 650 /*47*/, 500 /*48*/, 70 /*49*/];

let paleta;
let colores;
let cantAplausos = 0;
let label;
let classifier;

let AMP_MIN = 0.001;
let AMP_MAX = 0.5;

let FREC_MIN = 125;
let FREC_MAX = 270;

//----AUDIO----
let mic;

let amp;
let ampCruda;
let frec;

let gestorAmp;
let gestorFrec;
let audioContext;
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
const options = { probabilityThreshold: 0.9 };

let aplausoDetectado = false;
let img;

// IA ----------------
//let soundModel = 'https://teachablemachine.withgoogle.com/models/bOYAT_BCf/';
let soundModel = 'https://teachablemachine.withgoogle.com/models/7VRLdWBBG/';

function preload() {
    // Load SpeechCommands18w sound classifier model
    classifier = ml5.soundClassifier(soundModel + 'model.json', options);
}
//--------------

function setup() {
    createCanvas(700, windowHeight);
    urna = new Urna(22);
    numrandom = urna.sacarNumero();
    figura = new Figuras(numrandom);
    seleccionarFigurasPeque();
    seleccionarFigurasGrandes();
    classifier.classify(gotResult);

    //--------SONIDO-------------

    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(startPitch);
  
    userStartAudio(); // forzar el inicio del audio en el navegador
  
    gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
    gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);

    //------------------------------

    paleta = [
        color(2,28,92), //0
		 color(66,119,66), //1
		 color(37,27,35), //2
         color(40,41,43), //3
         color(213,156,44), //4
         color(34,35,36), //5
         color(40,41,42), //6
         color(16,43,116),//7
         color(208,172,32),//8
         color(169,69,43),//9
         color(217,161,40),//10
         color(208,164,179),//11
         color(172,63,35),//12
         color(209,148,33),//13
         color(191,81,43),//14
         color(189,86,47),//15
         color(184,73,36),//16
         color(204,169,38),//17
         color(209,172,40),//18
         color(33,32,38),//19
         color(216,56,45),//20
         color(245,167,3),//21
         color(180,51,44),//22
         color(189,39,32),//23
         color(29,26,33),//24
         color(99,134,180),//25
         color(217,167,41),//26
         color(107,50,74),//27
         color(129,30,25),//28
         color(38,34,38),//29
         color(94,126,95),//30
         color(58,58,57),//31
         color(194,153,35),//32
         color(63,112,176),//33
         color(170,31,13),//34
         color(216,157,47),//35
         color(59,100,162),//36
         color(34,33,36),//37
         color(61,111,177),//38
         color(73,93,51),//39
         color(44,49,53),//40
         color(175,36,18),//41
         color(217,160,44),//42
         color(74,93,55),//43
         color(29,47,69),//44
         color(163,47,40),//45
         color(234,177,70),//46
         color(21,24,29),//47
         color(21,24,29),//48
         color(32,30,97),//49
		 
    ];

    colores = [1];
    colores[0] = paleta[0];
    colores[1] = paleta[1];
    colores[2] = paleta[2];
    colores[3] = paleta[3];
    colores[4] = paleta[4];
    colores[5] = paleta[5];
    colores[6] = paleta[6];
    colores[7] = paleta[7];
    colores[8] = paleta[8];
    colores[9] = paleta[9];
    colores[10] = paleta[10];
    colores[11] = paleta[11];
    colores[12] = paleta[12];
    colores[13] = paleta[13];
    colores[14] = paleta[14];
    colores[15] = paleta[15];
    colores[16] = paleta[16];
    colores[17] = paleta[17];
    colores[18] = paleta[18];
    colores[19] = paleta[19];
    colores[20] = paleta[20];
    colores[21] = paleta[21];
    colores[22] = paleta[22];
    colores[23] = paleta[23];
    colores[24] = paleta[24];
    colores[25] = paleta[25];
    colores[26] = paleta[26];
    colores[27] = paleta[27];
    colores[28] = paleta[28];
    colores[29] = paleta[29];
    colores[30] = paleta[30];
    colores[31] = paleta[31];
    colores[32] = paleta[32];
    colores[33] = paleta[33];
    colores[34] = paleta[34];
    colores[35] = paleta[35];
    colores[36] = paleta[36];
    colores[37] = paleta[37];
    colores[38] = paleta[38];
    colores[39] = paleta[39];
    colores[40] = paleta[40];
    colores[41] = paleta[41];
    colores[42] = paleta[42];
    colores[43] = paleta[43];
    colores[44] = paleta[44];
    colores[45] = paleta[45];
    colores[46] = paleta[46];
    colores[47] = paleta[47];
    colores[48] = paleta[48];
    colores[49] = paleta[49];

}
//solo pueden aparecer 3 figuras grandes maximo siempre que se recargue la pagina

function seleccionarFigurasPeque() {
    let numFigurasPeque = [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,21,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,39,40,41,42,43,47,48,49];
     seleccionadasPeque = [];
    for (let i = 0; i < 15; i++) {
        let randomIndex = int(random(numFigurasPeque.length));
        seleccionadasPeque.push(numFigurasPeque[randomIndex]);
    }
}

function seleccionarFigurasGrandes(){
    let numFigurasGrandes = [0,2, 19, 20, 31, 44,45];
     seleccionadasGrandes = [];
    for (let i = 0; i < 3; i++) {
        let randomIndex = int(random(numFigurasGrandes.length));
        seleccionadasGrandes.push(numFigurasGrandes[randomIndex]);
    }
}

function draw() {

    //-----------SONIDO---------------

    gestorAmp.actualizar(mic.getLevel());// la señal directa (cruda) del mic la administra el gestor


    ampCruda = mic.getLevel();// solo para monitorear la diferencia 
    amp = gestorAmp.filtrada;
    //frec = gestorFrec.filtrada;
   
    background(245,245,220);

    //----------------------------------
    
    for (let i = 0; i < seleccionadasPeque.length; i++) {
        let idx = seleccionadasPeque[i];     
        figura.muestra(idx, idx, colores[idx], tamAnchoIni[idx], tamAltoIni[idx]);
    }
    
    for (let i = 0; i < seleccionadasGrandes.length; i++) {
        let idx = seleccionadasGrandes[i];
        figura.muestra(idx, idx, colores[idx], tamAnchoIni[idx], tamAltoIni[idx]);
    }

    figura.mover(frec, amp);
    seHaceSonido();
    
   }

function seHaceSonido(){
    if(label == "aplauso"){
        seleccionarFigurasGrandes();
        seleccionarFigurasPeque();
        console.log("aplauso activo");
        label = "";
    }

    if(label == "shhh"){
      cambiarColores();
      label = "";
    }
}


function cambiarColores(){
	let se_uso;
	let col;
	for (i=0; i<49; i++){
		se_uso = true;
		while (se_uso){
			col = paleta[int(random(0,paleta.length-0.01))];
			se_uso = false;
			if (i>0){
				for(x=0; x<i; x++){
					if (col == colores[x]){
						se_uso = true;
					}
					if (se_uso){break;}
				}
			}
		}
		colores[i] = col;
	}
}

//----- DETECCION DE FRECUENCIA-----
function startPitch() {
    pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded);
  }
  
  function modelLoaded() {
    getPitch();
  }
  
  function getPitch() {
    pitch.getPitch(function(err, frequency) {
      if (frequency) {
        gestorFrec.actualizar(frequency);
        frec = gestorFrec.filtrada;
      } else {
      }
      getPitch();
    })
  }
  
function imprimir(){
  
    push();
    
    fill(0);
    stroke(2);
    textSize(20);
    
    let texto = "amp: " + amp;
    text(texto, 20, 20)
    
    texto = "frec: " + frec;
    text(texto, 20, 40)
    
    gestorAmp.dibujar( 20, 50);
    gestorFrec.dibujar( 20, 150);
    
    let y = height - amp * height;
    ellipse(width/2 -50, y, 50, 50);
    
    y = height - ampCruda * height;
    ellipse(width/2 + 50, y, 50, 50);
    
    pop();
}

//-------- CLASIFICADOR------
function gotResult(error, results) {
    // Display error in the console
    if (error) {
      console.error(error);
    }
    // The results are in an array ordered by confidence.
    console.log(results);
    label = results[0].label;
    //console.log(label);
    
  }