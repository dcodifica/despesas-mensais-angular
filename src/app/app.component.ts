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
        if (operacao == 'INCLUIDA') {
          this.mostraAlerta = true;
          this.textoAlerta = 'Despesa incluída com sucesso!'
        } else if (operacao == 'ALTERADA') {
          this.mostraAlerta = true;
          this.textoAlerta = 'Despesa alterada com sucesso!'
        } else if (operacao == 'EXCLUIDA') {
          this.mostraAlerta = true;
          this.textoAlerta = 'Despesa excluída com sucesso!'
        }
      });
  }

  ngOnDestroy(): void {
    this.despesaFoiModificada.unsubscribe();
  }

  ocultarAlerta(): void {
    this.mostraAlerta = false;
  }
}
