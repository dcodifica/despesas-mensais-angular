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
  despesas!: Despesa[];
  mesAtual: string = 'SET/2021';
  despesasForamAlteradasSubscription!: Subscription;
  despesasFoiSelecionadaSubscription!: Subscription;
  idDespesaSelecionada: string = '';
  radioDespesaSelecionada!: HTMLInputElement;

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesas = this.despesasService.getDespesas();
    this.despesasForamAlteradasSubscription =
      this.despesasService.listaDespesaAtualizada
        .subscribe(
          despesas => {
            this.despesas = despesas;
            this.cancelarSelecaoDespesa();
          }
        );
    this.despesasFoiSelecionadaSubscription =
      this.despesasService.despesaFoiSelecionada
        .subscribe(
          radioDespesaSelecionada => {
            this.idDespesaSelecionada =
              <string>radioDespesaSelecionada.id.split('-').pop();
            this.radioDespesaSelecionada = radioDespesaSelecionada;
          }
        );
  }

  cancelarSelecaoDespesa(): void {
    this.idDespesaSelecionada = '';
    this.radioDespesaSelecionada.checked = false;
  }

  excluirDespesa() {
    this.despesasService.excluirDespesa(this.idDespesaSelecionada);
  }

  ngOnDestroy(): void {
    this.despesasForamAlteradasSubscription.unsubscribe();
    this.despesasFoiSelecionadaSubscription.unsubscribe();
  }
}
