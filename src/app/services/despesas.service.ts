import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Despesa } from '../shared/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  despesasForamAlteradas: Subject<Despesa[]> = new Subject<Despesa[]>();
  private despesas: Despesa[] = [
    { id: '0', nome: 'Internet', valor: 99.99, paga: false },
    { id: '1', nome: 'Aluguel', valor: 4700.11, paga: false },
    { id: '2', nome: 'Energia', valor: 427.72, paga: false },
    { id: '3', nome: 'Netflix', valor: 79.99, paga: true },
    { id: '4', nome: 'Nubank', valor: 200.00, paga: false }
  ];

  constructor() { }

  getDespesas(): Despesa[] {
    return this.despesas.slice();
  }

  trocarStatusDespesa(idDespesa: string): void {
    const indexDespesa = this.despesas.map(despesa => {
      return despesa.id;
    }).indexOf(idDespesa);
    this.despesas[indexDespesa].paga = !this.despesas[indexDespesa].paga;
    this.notificarAlteracao();
  }

  private notificarAlteracao(): void {
    this.despesasForamAlteradas.next(this.getDespesas());
  }
}
