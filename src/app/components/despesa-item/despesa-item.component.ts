import { DespesasService } from './../../services/despesas.service';
import { Despesa } from './../../shared/despesa';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-despesa-item',
  templateUrl: './despesa-item.component.html',
  styleUrls: ['./despesa-item.component.css']
})
export class DespesaItemComponent implements OnInit {
  @Input() despesa!: Despesa;

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void { }

  trocarStatusDespesa(idDespesa: string): void {
    this.despesasService
      .trocarStatusDespesa(idDespesa)
      .subscribe();
  }

  selecionarDespesa(event: MouseEvent): void {
    const radioDespesaSelecionada = <HTMLInputElement>event.target;
    this.despesasService.notificarDespesaSelecionada(radioDespesaSelecionada);
  }
}
