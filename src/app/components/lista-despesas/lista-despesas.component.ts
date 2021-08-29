import { Despesa } from './../../shared/despesa';
import { DespesasService } from './../../services/despesas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css']
})
export class ListaDespesasComponent implements OnInit, OnDestroy {
  despesas: Despesa[] = [];
  despesasForamAlteradasSubscription!: Subscription;
  despesasFoiSelecionadaSubscription!: Subscription;
  idDespesaSelecionada: string = '';
  radioDespesaSelecionada!: HTMLInputElement;
  carregando: boolean = false;
  erroCarregarDespesas: boolean = false;
  textoErro: string = '';
  valorTotalDespesas: number = 0;

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.criarSubscriptions();
  }

  cancelarSelecaoDespesa(): void {
    this.idDespesaSelecionada = '';
    if (this.radioDespesaSelecionada != undefined) {
      this.radioDespesaSelecionada.checked = false;
    }
  }

  excluirDespesa() {
    this.despesasService
      .excluirDespesa(this.idDespesaSelecionada)
      .subscribe();
  }

  criarSubscriptions(): void {
    this.carregando = true;
    this.despesasService.getDespesas()
      .subscribe(
        resposta => {
          this.carregando = false;
        },
        erro => {
          this.carregando = false;
          this.erroCarregarDespesas = true;
          this.textoErro = erro;
        }
      );
    this.despesasForamAlteradasSubscription =
      this.despesasService
        .listaDespesaFoiAtualizada
        .subscribe(
          despesas => {
            this.despesas = despesas;
            this.valorTotalDespesas =
              this.despesasService.getValorTotalDespesas();
            this.cancelarSelecaoDespesa();
          }
        );
    this.despesasFoiSelecionadaSubscription =
      this.despesasService
        .despesaFoiSelecionada
        .subscribe(
          radioDespesaSelecionada => {
            this.idDespesaSelecionada =
              radioDespesaSelecionada.id;
            this.radioDespesaSelecionada =
              radioDespesaSelecionada;
          }
        );
  }

  ngOnDestroy(): void {
    this.despesasForamAlteradasSubscription.unsubscribe();
    this.despesasFoiSelecionadaSubscription.unsubscribe();
  }
}