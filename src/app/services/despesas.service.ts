import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Despesa } from '../shared/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  despesaFoiSelecionada: Subject<HTMLInputElement> =
    new Subject<HTMLInputElement>();
  listaDespesaFoiAtualizada: Subject<Despesa[]> =
    new Subject<Despesa[]>();
  despesaFoiModificada: Subject<string> = new Subject<string>();
  private firebaseUrl: string =
    'https://despesas-mensais-angular-default-rtdb.firebaseio.com/despesas.json';
  private despesas: Despesa[] = [];

  constructor(private http: HttpClient) { }

  getDespesas(callback: Function): void {
    this.http.get<Despesa[]>(this.firebaseUrl)
      .pipe(map(resposta => {
        let despesasArray: Despesa[] = [];
        for (let key in resposta) {
          despesasArray.push({ ...resposta[key], id: key });
        }
        return despesasArray;
      }))
      .subscribe(
        resposta => {
          this.despesas = resposta;
          callback();
          this.notificarAtualizacaoListaDespesas();
        }
      );
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

  incluirDespesa(despesa: Despesa, callback: Function): void {
    const novaDespesa =
      this.tratarPropriedadesDespesa(despesa);
    this.http.post(
      this.firebaseUrl,
      novaDespesa,
      { observe: 'response' }
    ).subscribe(
      resposta => {
        callback();
      }
    );
  }

  editarDespesa(despesa: Despesa): void {
    despesa = this.tratarPropriedadesDespesa(despesa);
    const indexDespesa = this.getDespesaIndex(despesa.id);
    this.despesas[indexDespesa] = despesa;
    this.notificarDespesaModificada('ALTERADA');
  }

  excluirDespesa(idDespesa: string): void {
    const despesas =
      this.despesas.filter(despesa => {
        return despesa.id != idDespesa;
      });
    this.despesas = despesas;
    this.notificarDespesaModificada('EXCLUIDA');
  }

  notificarDespesaSelecionada(
    radioDespesaSelecionada: HTMLInputElement): void {
    this.despesaFoiSelecionada.next(radioDespesaSelecionada);
  }

  notificarAtualizacaoListaDespesas(): void {
    this.listaDespesaFoiAtualizada.next(this.despesas.slice());
  }

  notificarDespesaModificada(operacao: string) {
    this.notificarAtualizacaoListaDespesas();
    this.despesaFoiModificada.next(operacao);
  }
}