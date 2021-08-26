import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Despesa } from '../shared/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  despesaFoiSelecionada: Subject<HTMLInputElement> =
    new Subject<HTMLInputElement>();
  listaDespesaAtualizada: Subject<Despesa[]> =
    new Subject<Despesa[]>();
  despesaFoiIncluida: Subject<void> =
    new Subject<void>();
  despesaFoiAlterada: Subject<void> =
    new Subject<void>();
  despesaFoiExcluida: Subject<void> =
    new Subject<void>();
  private despesas: Despesa[] = [
    { id: '0', nome: 'Internet', valor: 124.90, paga: false },
    { id: '1', nome: 'Nubank', valor: 200, paga: false }
  ];

  constructor(private http: HttpClient) { }

  getDespesas(): Despesa[] {
    return this.despesas.slice();
  }

  getDespesa(idDespesa: string): Despesa {
    return this.despesas.filter(
      despesa => {
        return despesa.id == idDespesa;
      })[0];
  }

  trocarStatusDespesa(idDespesa: string): void {
    const indexDespesa = this.getDespesaIndex(idDespesa);
    this.despesas[indexDespesa].paga =
      !this.despesas[indexDespesa].paga;
    this.notificarAtualizacaoListaDespesas();
  }

  tratarPropriedadesDespesa(despesa: Despesa): Despesa {
    despesa.valor = +despesa.valor;
    despesa.paga = despesa.paga.toString() == 'true';
    return despesa;
  }

  getDespesaIndex(idDespesa: string): number {
    return this.despesas.map(despesa => {
      return despesa.id;
    }).indexOf(idDespesa);
  }

  gerarIdUnico(): string {
    const indexUltimaDespesa = this.despesas.length - 1;
    let novoId = 0;
    if (indexUltimaDespesa == -1) {
      return novoId.toString();
    } else {
      const ultimaDespesaNoCadastro: Despesa =
        <Despesa>this.despesas[indexUltimaDespesa];
      novoId = +ultimaDespesaNoCadastro.id + 1;
      return novoId.toString();
    }
  }


  incluirDespesa(despesa: Despesa): void {
    despesa.id = this.gerarIdUnico();
    despesa = this.tratarPropriedadesDespesa(despesa);
    this.despesas.push(despesa);
    this.notificarAtualizacaoListaDespesas();
    this.notificarDespesaIncluida();
  }

  editarDespesa(despesa: Despesa): void {
    despesa = this.tratarPropriedadesDespesa(despesa);
    const indexDespesa = this.getDespesaIndex(despesa.id);
    this.despesas[indexDespesa] = despesa;
    this.notificarAtualizacaoListaDespesas();
    this.notificarDespesaAlterada();
  }

  excluirDespesa(idDespesa: string): void {
    const despesas =
      this.despesas.filter(despesa => {
        return despesa.id != idDespesa;
      });
    this.despesas = despesas;
    this.notificarAtualizacaoListaDespesas();
    this.notificarDespesaExcluida();
  }

  notificarDespesaSelecionada(
    radioDespesaSelecionada: HTMLInputElement): void {
    this.despesaFoiSelecionada.next(radioDespesaSelecionada);
  }

  notificarAtualizacaoListaDespesas(): void {
    this.listaDespesaAtualizada.next(this.getDespesas());
  }

  notificarDespesaIncluida() {
    this.despesaFoiIncluida.next();
  }

  notificarDespesaAlterada() {
    this.despesaFoiAlterada.next();
  }

  notificarDespesaExcluida() {
    this.despesaFoiExcluida.next();
  }
}
