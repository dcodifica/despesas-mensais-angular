import { DespesasService } from './services/despesas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  despesaAdicionada: boolean = false;
  despesaFoiIncluidaSubscription!: Subscription;

  constructor(private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.despesaFoiIncluidaSubscription =
      this.despesasService.despesaFoiIncluida
        .subscribe(() => {
          this.despesaAdicionada = true;
        });
  }

  ngOnDestroy(): void {
    this.despesaFoiIncluidaSubscription.unsubscribe();
  }

  ocultarAlertDespesaIncluida(): void {
    this.despesaAdicionada = false;
  }
}
