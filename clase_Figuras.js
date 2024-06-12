class Figuras {
    constructor(numrandom) {
        imageMode(CENTER);
        this.figura = [];
        for (let i = 0; i < 50; i++) {
            this.figura.push(loadImage('img/F' + i + '.png'));
        }
        this.num = numrandom;
        this.numIni = numrandom;

        this.dirI = [
            radians(),
            radians(),
            radians(),
            radians(129),
            radians(120),
            radians(120),
            radians(118),
            radians(-138),
            radians(122),
            radians(123),
            radians(177),
            radians(133),
            radians(120),
            radians(120),
            radians(136),
            radians(-92),
            radians(122),
            radians(121),
            radians(128),
            radians(),
            radians(),
            radians(),
            radians(-170),
            radians(-176),
            radians(133),
            radians(-148),
            radians(-165),
            radians(-160),
            radians(104),
            radians(-157),
            radians(-162),
            radians(),
            radians(),
            radians(177),
            radians(91),
            radians(-173),
            radians(168),
            radians(-130),
            radians(119),
            radians(-177),
            radians(-169),
            radians(-170),
            radians(-179),
            radians(-178),
            radians(),
            radians(),
            radians(),
            radians(),
            radians(),
            radians(168)
        ];
        
        this.dirD = [
            radians(),
            radians(),
            radians(),
            radians(-51),
            radians(-60),
            radians(-60),
            radians(-62),
            radians(42),
            radians(-58),
            radians(-57),
            radians(-3),
            radians(-47),
            radians(-60),
            radians(-60),
            radians(-56),
            radians(88),
            radians(-58),
            radians(-59),
            radians(-62),
            radians(),
            radians(),
            radians(),
            radians(10),
            radians(4),
            radians(-47),
            radians(32),
            radians(15),
            radians(20),
            radians(-86),
            radians(23),
            radians(18),
            radians(),
            radians(),
            radians(-3),
            radians(-89),
            radians(7),
            radians(-12),
            radians(60),
            radians(-59),
            radians(3),
            radians(11),
            radians(10),
            radians(1),
            radians(2),
            radians(),
            radians(),
            radians(),
            radians(),
            radians(),
            radians(-12)
        ];

        this.posx = [380 /*0*/, 220 /*1*/, 350 /*2*/, 100 /*3*/, 80 /*4*/, 90 /*5*/, 200 /*6*/, 400 /*7*/, 520 /*8*/, 350 /*9*/, 550 /*10*/, 550 /*11*/, 420 /*12*/, 130 /*13*/, 90 /*14*/, 180 /*15*/, 100 /*16*/, 260 /*17*/, 440 /*18*/, 300 /*19*/, 370 /*20*/, 150 /*21*/, 70 /*22*/, 480 /*23*/, 200 /*24*/, 620 /*25*/, 350 /*26*/, 450 /*27*/, 580 /*28*/, 610 /*29*/, 610 /*30*/, 350 /*31*/, 330 /*32*/, 270 /*33*/, 360 /*34*/, 370 /*35*/, 500 /*36*/, 50 /*37*/, 450 /*38*/, 350 /*39*/, 350 /*40*/, 500 /*41*/, 170 /*42*/, 590 /*43*/, 520 /*44*/, 200 /*45*/, 200 /*46*/, 500 /*47*/, 420 /*48*/, 350 /*49*/];

        this.posy = [350 /*0*/, 200 /*1*/, 420 /*2*/, 200 /*3*/, 300 /*4*/, 100 /*5*/, 70 /*6*/, 100 /*7*/, 160 /*8*/, 290 /*9*/, 500 /*10*/, 600 /*11*/, 620 /*12*/, 650 /*13*/, 600 /*14*/, 530 /*15*/, 520 /*16*/, 500 /*17*/, 650 /*18*/, 200 /*19*/, 350 /*20*/, 200 /*21*/, 300 /*22*/, 530 /*23*/, 600 /*24*/, 70 /*25*/, 300 /*26*/, 350 /*27*/, 350 /*28*/, 290 /*29*/, 310 /*30*/, 250 /*31*/, 200 /*32*/, 340 /*33*/, 640 /*34*/, 640 /*35*/, 570 /*36*/, 60 /*37*/, 230 /*38*/, 300 /*39*/, 520 /*40*/, 560 /*41*/, 350 /*42*/, 650 /*43*/, 250 /*44*/, 300 /*45*/, 200 /*46*/, 350 /*47*/, 300 /*48*/, 450 /*49*/];

        this.vel = int (random(5,10));
        this.tamancho;
        this.tamalto;
        this.staticFigures = [0, 1, 2, 19, 20, 21, 31, 32, 44, 45, 46, 47, 48];
    }

    muestra(numIni, num, c, ancho, alto) {
        this.num = num;
        this.numIni = numIni;
        this.c = c;
        this.tamalto = alto;
        this.tamancho = ancho;

        push();
        tint(color(c));
        image(this.figura[this.num], this.posx[this.numIni], this.posy[this.numIni], this.tamancho, this.tamalto);
        pop();

        this.posx[this.numIni] = ( this.posx[this.numIni]>width ? this.posx[this.numIni]-width : this.posx[this.numIni]);
        this.posx[this.numIni] = ( this.posx[this.numIni]<0 ? this.posx[this.numIni]+width : this.posx[this.numIni]);
        this.posy[this.numIni] = ( this.posy[this.numIni]>height ? this.posy[this.numIni]-height : this.posy[this.numIni] );
        this.posy[this.numIni] = ( this.posy[this.numIni]<0 ? this.posy[this.numIni]+height : this.posy[this.numIni] );
    }

    mover(frec){
     
        if (amp>0.01 && frec>0.2){  //grave

            for (let i=0; i<50; i++){
                if (this.staticFigures.includes(i)) continue;
                let dx = this.vel * cos( this.dirD[i] );
                let dy = this.vel * sin( this.dirD[i] );
                this.posx[i] += dx;
                this.posy[i] += dy; 
                
            }
    
            } else if (amp>0.01 && frec<0.5){ //agudo
            for (let i=0; i<50; i++){
                if (this.staticFigures.includes(i)) continue;
                let dx = this.vel * cos( this.dirI[i] );
                let dy = this.vel * sin( this.dirI[i] );
                this.posx[i] += dx;
                this.posy[i] += dy; 
                
            }
        }
    
    }


}