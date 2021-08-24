import { DespesasService } from './../../services/despesas.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {
  constructor(
    private despesasService: DespesasService,
    private router: Router) { }

  ngOnInit(): void { }

  onSubmitForm(form: NgForm) {
    let despesa = form.value;
    this.despesasService.incluirDespesa(despesa);
    this.router.navigate(['/despesas']);
  }
}
