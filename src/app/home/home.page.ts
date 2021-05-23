import { Component } from '@angular/core';
let fraseAnalizar;
let fraseEntera;
let recorrido;
let recorrido2;
const presentAlert = () => {
  const alert = document.createElement('ion-alert');
  alert.header = 'No escribiste nada';
  alert.subHeader = 'Por favor escribe algo';

  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  return alert.present();
};
const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
const isEmpty = (str) => !str.trim().length;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  analizar(frase) {
    fraseAnalizar = frase.value;
    fraseEntera = frase.value;
    if (isEmpty(fraseAnalizar)) {
      presentAlert();
      return;
    }
    fraseAnalizar = fraseAnalizar.toLowerCase();
    fraseAnalizar = fraseAnalizar.replace(/ /g, '');
    fraseAnalizar = removeAccents(fraseAnalizar);
    let list = new Linkedlist();
    let arreglo = fraseAnalizar.split('');

    arreglo.forEach((element) => {
      list.append(element);
    });
    recorrido = list.print();
    recorrido2 = list.reversePrint();

    if (recorrido == recorrido2) {
      presentAlertAceptado();
    } else {
      presentAlertFallo();
    }
  }
}
class Noding<T> {
  public value: T;
  public prev: any | null;
  public next: any | null;
  constructor(value: T, prev: any | null, next: any | null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

// doubly linked list implementation
class Linkedlist {
  public head: any;
  public tail: any;
  constructor() {
    this.head = this.tail = null;
  }

  //append to the end list / tail
  append(value: any) {
    // if list is empty
    if (!this.tail) {
      this.head = this.tail = new Noding(value, null, null);
    } else {
      let oldTail = this.tail;
      this.tail = new Noding(value, null, null);
      oldTail.next = this.tail;
      this.tail.prev = oldTail;
    }
  }

  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.value;
      current = current.next;
    }

    return result;
  }

  reversePrint() {
    let current = this.tail;
    let result = '';
    while (current) {
      result += current.value;
      current = current.prev;
    }

    return result;
  }
}
const presentAlertAceptado = () => {
  const alert = document.createElement('ion-alert');
  alert.header = 'TU FRASE: "' + fraseEntera + '"  ES UN PALINDROMO!!!!';
  alert.subHeader = 'Derecho= ' + recorrido + ' Reves= ' + recorrido2;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  return alert.present();
};

const presentAlertFallo = () => {
  const alert = document.createElement('ion-alert');
  alert.header = 'Por desgracia: "' + fraseEntera + '" NO es un palindromo';
  alert.subHeader = 'Porfavor escribe un palindromo';
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  return alert.present();
};
