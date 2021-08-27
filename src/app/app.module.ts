import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDespesasComponent } from './components/lista-despesas/lista-despesas.component';
import { MoedaPipe } from './pipes/moeda.pipe';
import { FormDespesaComponent } from './components/form-despesa/form-despesa.component';
import { DespesaItemComponent } from './components/despesa-item/despesa-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaDespesasComponent,
    MoedaPipe,
    FormDespesaComponent,
    DespesaItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
