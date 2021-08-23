import { Injectable } from '@angular/core';
import { Despesa } from '../shared/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  private despesas: Despesa[] = [
    { id: '1', nome: 'Internet', valor: 99.99, paga: false },
    { id: '0', nome: 'Aluguel', valor: 1400.00, paga: true },
    { id: '2', nome: 'Energia', valor: 427.72, paga: true }
  ];

  constructor() { }

  getDespesas(): Despesa[] {
    return this.despesas.slice();
  }
}
