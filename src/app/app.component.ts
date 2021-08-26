import { DespesasService } from './services/despesas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mostrarAlerta: boolean = false;
  despesaFoiIncluidaSubscription!: Subscription;
  despesaFoiAlteradaSubscription!: Subscription;
  despesaFoiExcluidaSubscription!: Subscription;
  textoAlerta: string = '';

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesaFoiIncluidaSubscription =
      this.despesasService.despesaFoiModificada
        .subscribe((operacao) => {
          if (operacao == 'INCLUIDA') {
            this.mostrarAlerta = true;
            this.textoAlerta = 'Despesa incluída com sucesso!'
          } else if (operacao == 'ALTERADA') {
            this.mostrarAlerta = true;
            this.textoAlerta = 'Despesa alterada com sucesso!'
          } else if (operacao == 'EXCLUIDA') {
            this.mostrarAlerta = true;
            this.textoAlerta = 'Despesa excluída com sucesso!'
          }
        });
  }

  ngOnDestroy(): void {
    this.despesaFoiIncluidaSubscription.unsubscribe();
    this.despesaFoiAlteradaSubscription.unsubscribe();
    this.despesaFoiExcluidaSubscription.unsubscribe();
  }

  ocultarAlertDespesaIncluida(): void {
    this.mostrarAlerta = false;
  }
}
