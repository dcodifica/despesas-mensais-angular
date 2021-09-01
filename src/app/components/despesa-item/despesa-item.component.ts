import { DespesasService } from './../../services/despesas.service';
import { Despesa } from './../../shared/despesa';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-despesa-item',
  templateUrl: './despesa-item.component.html',
  styleUrls: ['./despesa-item.component.css']
})
export class DespesaItemComponent implements OnInit {
  @Input() despesa!: Despesa;
  @Output() erroTrocarStatusDespesa: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void { }

  trocarStatusDespesa(): void {
    this.despesasService
      .trocarStatusDespesa(this.despesa)
      .subscribe(
        resposta => { },
        erro => {
          this.erroTrocarStatusDespesa.emit(erro);
        }
      );
  }

  selecionarDespesa(event: MouseEvent): void {
    const radioDespesaSelecionada = <HTMLInputElement>event.target;
    this.despesasService.notificarDespesaSelecionada(radioDespesaSelecionada);
  }
}
