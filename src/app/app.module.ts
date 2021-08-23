import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDespesasComponent } from './components/lista-despesas/lista-despesas.component';
import { MoedaPipe } from './pipes/moeda.pipe';
import { FormDespesaComponent } from './components/form-despesa/form-despesa.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaDespesasComponent,
    MoedaPipe,
    FormDespesaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
