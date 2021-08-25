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
      this.despesasService.despesaFoiIncluida
        .subscribe(() => {
          this.mostrarAlerta = true;
          this.textoAlerta = 'Despesa incluída com sucesso!'
        });
    this.despesaFoiAlteradaSubscription =
      this.despesasService.despesaFoiAlterada
        .subscribe(() => {
          this.mostrarAlerta = true;
          this.textoAlerta = 'Despesa alterada com sucesso!'
        });
    this.despesaFoiExcluidaSubscription =
      this.despesasService.despesaFoiExcluida
        .subscribe(() => {
          this.mostrarAlerta = true;
          this.textoAlerta = 'Despesa excluída com sucesso!'
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
