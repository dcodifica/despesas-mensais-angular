import { Despesa } from './../../shared/despesa';
import { DespesasService } from './../../services/despesas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-despesas',
  templateUrl: './lista-despesas.component.html',
  styleUrls: ['./lista-despesas.component.css']
})
export class ListaDespesasComponent implements OnInit {
  despesas!: Despesa[];
  mesAtual: string = 'SET/2021';

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesas = this.despesasService.getDespesas();
  }
}
