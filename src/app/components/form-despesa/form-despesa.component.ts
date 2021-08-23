import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    form.reset();
  }
}
