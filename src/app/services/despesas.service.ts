import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
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
    'https://despesas-mensais-angular-default-rtdb.firebaseio.com/';
  private despesas: Despesa[] = [];

  constructor(private http: HttpClient) { }

  getDespesas(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.firebaseUrl + 'despesas.json')
      .pipe(
        map(resposta => {
          let despesasArray: Despesa[] = [];
          for (let key in resposta) {
            despesasArray.push({ ...resposta[key], id: key });
          }
          return despesasArray;
        }),
        tap((resposta) => {
          this.despesas = resposta;
          this.notificarAtualizacaoListaDespesas();
        }),
        catchError(this.tratarErrosHttp)
      );
  }

  getDespesa(idDespesa: string): Despesa {
    return this.despesas.filter(
      despesa => {
        return despesa.id == idDespesa;
      })[0];
  }

  getValorTotalDespesas(): number {
    let total = 0;
    for (const despesa of this.despesas) {
      total += despesa.valor;
    }
    return total;
  }

  trocarStatusDespesa(despesa: Despesa): Observable<any> {
    return this.editarDespesa(despesa, true);
  }

  tratarDespesa(despesa: Despesa): Despesa {
    despesa.valor = +despesa.valor;
    despesa.paga = despesa.paga.toString() == 'true';
    return despesa;
  }

  getDespesaIndex(idDespesa: string): number {
    return this.despesas.map(despesa => {
      return despesa.id;
    }).indexOf(idDespesa);
  }

  incluirDespesa(despesa: Despesa): Observable<{ name: string }> {
    const novaDespesa = this.tratarDespesa(despesa);
    return this.http.post<{ name: string }>(
      this.firebaseUrl + 'despesas.json',
      novaDespesa,
    ).pipe(
      tap(() => {
        this.notificarDespesaModificada('adicionada');
      }),
      catchError(this.tratarErrosHttp)
    );
  }

  editarDespesa(despesa: Despesa, apenasTrocouStatus: boolean): Observable<any> {
    const despesaEditada = this.tratarDespesa(despesa);
    if (apenasTrocouStatus == true) {
      despesaEditada.paga = !despesaEditada.paga;
    }
    return this.http.patch(
      this.firebaseUrl + 'despesas/' + despesaEditada.id + '.json',
      despesaEditada
    ).pipe(
      tap(() => {
        this.notificarDespesaModificada('alterada');
      }),
      catchError(this.tratarErrosHttp)
    );
  }

  excluirDespesa(idDespesa: string): Observable<any> {
    return this.http.delete(
      this.firebaseUrl + 'despesas/' + idDespesa + '.json'
    ).pipe(
      tap(() => {
        const despesas =
          this.despesas.filter(despesa => {
            return despesa.id != idDespesa;
          });
        this.despesas = despesas;
        this.notificarDespesaModificada('removida');
      }),
      catchError(this.tratarErrosHttp)
    );
  }

  tratarErrosHttp(erro: HttpErrorResponse) {
    return throwError(
      'Erro ao executar o procedimento: ' +
      erro.statusText);
  }

  notificarDespesaSelecionada(
    radioDespesaSelecionada: HTMLInputElement): void {
    this.despesaFoiSelecionada
      .next(radioDespesaSelecionada);
  }

  notificarAtualizacaoListaDespesas(): void {
    this.listaDespesaFoiAtualizada
      .next(this.despesas.slice());
  }

  notificarDespesaModificada(operacao: string) {
    this.notificarAtualizacaoListaDespesas();
    this.despesaFoiModificada.next(operacao);
  }
}