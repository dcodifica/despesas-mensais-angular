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
  listaDespesaAtualizada: Subject<Despesa[]> =
    new Subject<Despesa[]>();
  despesaFoiIncluida: Subject<void> =
    new Subject<void>();
  despesaFoiAlterada: Subject<void> =
    new Subject<void>();
  despesaFoiExcluida: Subject<void> =
    new Subject<void>();
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
          setTimeout(() => {
            callback();
            this.notificarAtualizacaoListaDespesas();
          }, 1000);
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

  incluirDespesa(despesa: Despesa, callback: Function): void {
    const novaDespesa =
      this.tratarPropriedadesDespesa(despesa);
    this.http.post(
      this.firebaseUrl,
      novaDespesa,
      { observe: 'response' }
    ).subscribe(
      resposta => {
        console.log(resposta);
        callback();
      }
    );
  }

  editarDespesa(despesa: Despesa): void {
    despesa = this.tratarPropriedadesDespesa(despesa);
    const indexDespesa = this.getDespesaIndex(despesa.id);
    this.despesas[indexDespesa] = despesa;
    this.notificarDespesaAlterada();
  }

  excluirDespesa(idDespesa: string): void {
    const despesas =
      this.despesas.filter(despesa => {
        return despesa.id != idDespesa;
      });
    this.despesas = despesas;
    this.notificarDespesaExcluida();
  }

  notificarDespesaSelecionada(
    radioDespesaSelecionada: HTMLInputElement): void {
    this.despesaFoiSelecionada.next(radioDespesaSelecionada);
  }

  notificarAtualizacaoListaDespesas(): void {
    this.listaDespesaAtualizada.next(this.despesas.slice());
  }

  notificarDespesaIncluida() {
    this.notificarAtualizacaoListaDespesas();
    this.despesaFoiIncluida.next();
  }

  notificarDespesaAlterada() {
    this.notificarAtualizacaoListaDespesas();
    this.despesaFoiAlterada.next();
  }

  notificarDespesaExcluida() {
    this.notificarAtualizacaoListaDespesas();
    this.despesaFoiExcluida.next();
  }
}
