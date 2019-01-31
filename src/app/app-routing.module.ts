import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',},
  { path: '', redirectTo: 'login', pathMatch:'full'},
{ path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'list-details/:id', loadChildren: './list-details/list-details.module#ListDetailsPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
