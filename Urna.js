class Urna {
    constructor(cant) {
        this.cantidad = cant;
        this.resetearUrna();
    }

    resetearUrna() {
        this.arreglo = [];
        for (let i = 0; i < this.cantidad; i++) {
            this.arreglo.push(i);
        }
    }

    sacarNumero() {
        if (this.arreglo.length === 0) {
            this.resetearUrna();
        }
        let cual = int(random(0,11));
        let valor = this.arreglo.splice(cual, 1);
        return valor[0];
    }
}





