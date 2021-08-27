import { Despesa } from './../../shared/despesa';
import { DespesasService } from './../../services/despesas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {
  @ViewChild('formDespesa') formDespesa!: NgForm;
  titulo: string = 'Incluir Despesa';
  modoEdicao: boolean = false;
  despesa!: Despesa;
  salvando: boolean = false;
  mostraAlerta: boolean = false;
  textoAlerta: string = '';

  constructor(
    private despesasService: DespesasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const idDespesa = params['id'];
        if (idDespesa != undefined) {
          this.modoEdicao = true;
          this.titulo = 'Editar Despesa';
          this.despesa = this.despesasService.getDespesa(idDespesa);
        }
      });
  }

  ocultarAlerta(): void {
    this.mostraAlerta = false;
  }

  onSubmitForm() {
    this.salvando = true;
    if (this.modoEdicao == true) {
      this.despesasService
        .editarDespesa(this.despesa)
        .subscribe(
          resposta => {
            this.salvando = false;
            this.router.navigate(['/despesas']);
          },
          erro => {
            this.salvando = false;
            this.mostraAlerta = true;
            this.textoAlerta = erro;
          }
        );
    } else {
      this.despesasService
        .incluirDespesa(this.formDespesa.value)
        .subscribe(
          resposta => {
            this.salvando = false;
            this.router.navigate(['/despesas']);
          },
          erro => {
            this.salvando = false;
            this.mostraAlerta = true;
            this.textoAlerta = erro;
          }
        );
    }
  }
}
