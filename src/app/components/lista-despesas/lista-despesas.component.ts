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
  idDespesaSelecionada: string = '';
  radioDespesaSelecionada!: HTMLInputElement;

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesas = this.despesasService.getDespesas();
    this.despesasForamAlteradasSubscription =
      this.despesasService.despesasForamAlteradas
        .subscribe(
          despesas => {
            this.despesas = despesas;
          }
        );
  }

  trocarStatusDespesa(idDespesa: string): void {
    this.despesasService.trocarStatusDespesa(idDespesa);
  }

  selecionarDespesa(idDespesa: string, radioSelecaoDespesa: HTMLInputElement): void {
    this.radioDespesaSelecionada = radioSelecaoDespesa;
    this.idDespesaSelecionada = idDespesa;
  }

  cancelarSelecaoDespesa(): void {
    this.idDespesaSelecionada = '';
    this.radioDespesaSelecionada.checked = false;
  }

  ngOnDestroy(): void {
    this.despesasForamAlteradasSubscription.unsubscribe();
  }
}
