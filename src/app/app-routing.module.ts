import { FormDespesaComponent } from './components/form-despesa/form-despesa.component';
import { ListaDespesasComponent } from './components/lista-despesas/lista-despesas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'despesas', component: ListaDespesasComponent },
  { path: 'adicionar-despesa', component: FormDespesaComponent },
  { path: '', redirectTo: '/despesas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
