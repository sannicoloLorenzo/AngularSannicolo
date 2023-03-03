import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { NopageComponent } from './nopage/nopage.component';

const routes: Routes = [
  {path:'bookList', component: ListComponent},
  {path:'bookAdd', component: AddComponent},
  {path:'', redirectTo:'bookList', pathMatch:'full'},
  {path:'**', component: NopageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
