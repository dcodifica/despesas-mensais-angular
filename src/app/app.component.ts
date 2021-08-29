import { DespesasService } from './services/despesas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mostraAlerta: boolean = false;
  despesaFoiModificada!: Subscription;
  textoAlerta: string = '';
  tipoAlerta: string = 'success';

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesaFoiModificada = this.despesasService
      .despesaFoiModificada
      .subscribe((operacao) => {
        this.mostraAlerta = true;
        this.textoAlerta = 'Despesa ' + operacao + ' com sucesso.';
      });
  }

  ngOnDestroy(): void {
    this.despesaFoiModificada.unsubscribe();
  }

  ocultarAlerta(): void {
    this.mostraAlerta = false;
  }
}
