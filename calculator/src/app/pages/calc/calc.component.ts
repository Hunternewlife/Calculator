import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalcComponent {

  valor = '0';
  primerValor: number = null;
  operador: any = null;
  nuevocursor = false;
  isc = false;
  iscomma = false;
  historial = [];

  constructor() {}

  click(val: any) {
    switch (val) {
      case 'ac':
        this.valor = '0';
        this.primerValor = null;
        this.operador = null;
        this.nuevocursor = false;
        break;
      case 'c':
        this.valor = '0';
        this.isc = false;
        break;
      case '+/-':
        if (Math.sign(parseInt(this.valor, 0)) === 1) {
          const sign = -Math.abs(parseInt(this.valor, 0));
          this.valor = sign.toString();
        } else if (Math.sign(parseInt(this.valor, 0)) === -1) {
          const sign = Math.abs(parseInt(this.valor, 0));
          this.valor = sign.toString();
        } else {
          this.valor = this.valor;
        }
        break;
      case '%':
        this.anadirPorcentaje();
        break;
      case ':':
        this.anadirOperador(':');
        break;
      case 'X':
        this.anadirOperador('X');
        break;
      case '-':
        this.anadirOperador('-');
        break;
      case '+':
        this.anadirOperador('+');
        break;
      case '/':
        this.anadirOperador('/');
        break;
      case '=':
        if (this.primerValor !== null && this.operador !== null) {
          this.puntuacion();
        }
        this.operador = null;
        break;
      case '0':
        this.anadirNumero('0');
        break;
      case '1':
        this.anadirNumero('1');
        break;
      case '2':
        this.anadirNumero('2');
        break;
      case '3':
        this.anadirNumero('3');
        break;
      case '4':
        this.anadirNumero('4');
        break;
      case '5':
        this.anadirNumero('5');
        break;
      case '6':
        this.anadirNumero('6');
        break;
      case '7':
        this.anadirNumero('7');
        break;
      case '8':
        this.anadirNumero('8');
        break;
      case '9':
        this.anadirNumero('9');
        break;
      case ',':
        this.anadirComa();
        break;
    }
  }

  anadirComa() {
    if (this.iscomma === false) {
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
  }

  anadirNumero(nbr: string) {
    if (nbr === '0') {
      if (this.nuevocursor === true) {
        this.valor = nbr;
        this.nuevocursor = false;
      } else if (this.valor !== '0') {
        if (this.iscomma === true) {
          this.valor = `${this.valor.toString()}.${nbr}`;
        } else {
          this.valor = this.valor.toString() + nbr;
        }
      } else if (this.valor === '0') {
        if (this.iscomma === true) {
          this.valor = `${this.valor.toString()}.${nbr}`;
        }
      }
    } else {
      if (this.nuevocursor === true) {
        this.valor = nbr;
        this.nuevocursor = false;
      } else if (this.valor === '0') {
        if (this.iscomma === true) {
          if (this.valor.toString().indexOf('.') > -1) {
            this.valor = this.valor.toString() + nbr;
          } else {
            this.valor = `${this.valor.toString()}.${nbr}`;
          }
        } else {
          this.valor = nbr;
        }
      } else {
        if (this.iscomma === true) {
          if (this.valor.toString().indexOf('.') > -1) {
            this.valor = this.valor.toString() + nbr;
          } else {
            this.valor = `${this.valor.toString()}.${nbr}`;
          }
        } else {
          this.valor = this.valor.toString() + nbr;
        }
      }
    }
    this.isc = true;
  }

  anadirPorcentaje() {
    this.iscomma = false;
    const dispval = parseInt(this.valor, 0) / 100;
    this.valor = dispval.toString();
  }

  anadirOperador(op: string) {
    if (this.nuevocursor === false) {
      if (this.primerValor === null) {
        if (this.iscomma === true) {
          this.primerValor = parseFloat(this.valor);
        } else {
          this.primerValor = parseInt(this.valor, 0);
        }
      }
      if (this.primerValor !== null && this.operador !== null) {
        this.puntuacion();
      }
    }
    this.iscomma = false;
    this.operador = op;
    this.nuevocursor = true;
  }

  puntuacion() {
    switch (this.operador) {
      case 'X':
        if (this.iscomma === true) {
          this.historial.push(this.primerValor.toString() + " * " + this.valor + " = " + (this.primerValor * parseFloat(this.valor)).toString());
          this.primerValor = (this.primerValor * parseFloat(this.valor));
        } else {
          this.historial.push(this.primerValor.toString() + " * " + this.valor + " = " + (this.primerValor * parseInt(this.valor, 0)).toString());
          this.primerValor = (this.primerValor * parseInt(this.valor, 0));
        }
        break;
      case '-':
        if (this.iscomma === true) {
          this.historial.push(this.primerValor.toString() + " - " + this.valor + " = " + (this.primerValor - parseFloat(this.valor)).toString());
          this.primerValor = (this.primerValor - parseFloat(this.valor));
        } else {
          this.historial.push(this.primerValor.toString() + " - " + this.valor + " = " + (this.primerValor - parseInt(this.valor, 0)).toString());
          this.primerValor = (this.primerValor - parseInt(this.valor, 0));
        }
        break;
      case '+':
        if (this.iscomma === true) {
          this.historial.push(this.primerValor.toString() + " + " + this.valor + " = " + (this.primerValor + parseFloat(this.valor)).toString())
          this.primerValor = (this.primerValor + parseFloat(this.valor));
        } else {
          this.historial.push(this.primerValor.toString() + " + " + this.valor + " = " + (this.primerValor + parseInt(this.valor, 0)).toString());
          this.primerValor = (this.primerValor + parseInt(this.valor, 0));
        }
        break;
      case '/':
        if (this.iscomma === true) {
          this.historial.push(this.primerValor.toString() + " / " + this.valor + " = " + (this.primerValor / parseFloat(this.valor)).toString())
          this.primerValor = (this.primerValor / parseFloat(this.valor));
        } else {
          this.historial.push(this.primerValor.toString() + " / " + this.valor + " = " + (this.primerValor / parseInt(this.valor, 0)).toString());
          this.primerValor = (this.primerValor / parseInt(this.valor, 0));
        }
        break;
    }
    this.valor = this.primerValor.toString();
  }
}
