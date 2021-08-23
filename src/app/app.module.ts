import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDespesasComponent } from './components/lista-despesas/lista-despesas.component';
import { MoedaPipe } from './pipes/moeda.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaDespesasComponent,
    MoedaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
