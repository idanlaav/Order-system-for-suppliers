import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthHomeComponent } from './components/auth-area/auth-home/auth-home.component';
import { AuthGuard } from './components/auth-area/guards/auth.guard';
import { NoAuthGuard } from './components/auth-area/guards/no-auth.guard';
import { HomeComponent } from './components/home-area/home/home.component';

const routes: Routes = [
    {path: '', pathMatch : 'full', redirectTo: 'home'},
    {path:'auth', component: AuthHomeComponent, canActivate:[NoAuthGuard]},
    {path:"home", component: HomeComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
