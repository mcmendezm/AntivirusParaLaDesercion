import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NewsComponent } from './components/pages/news/news.component';
import { OurteamComponent } from './components/pages/ourteam/ourteam.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component'; 
import { AdminComponent } from './components/pages/admin/admin.component';
import { AdminGuard } from '../app/guard/auth.guard';
import { AuthenticatedGuard } from './guard/auth.guard.user';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'news', component: NewsComponent, canActivate: [AuthenticatedGuard] },
  { path: 'ourteam', component: OurteamComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { } 