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
  mostrarErro: boolean = false;
  textoErro: string = '';
  erroAoCarregarDespesas: boolean = false;
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

  excluirDespesa(): void {
    this.despesasService
      .excluirDespesa(this.idDespesaSelecionada)
      .subscribe(
        resposta => { },
        erro => {
          this.mostrarErroAoGerenciarDespesa(erro);
          this.cancelarSelecaoDespesa();
        }
      );
  }

  mostrarErroAoGerenciarDespesa(textoErro: string): void {
    this.textoErro = textoErro;
    this.mostrarErro = true;
    this.erroAoCarregarDespesas = false;
  }

  ocultarAlerta(): void {
    if (this.erroAoCarregarDespesas == false) {
      this.mostrarErro = false;
    }
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
          this.mostrarErro = true;
          this.textoErro = erro;
          this.erroAoCarregarDespesas = true;
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