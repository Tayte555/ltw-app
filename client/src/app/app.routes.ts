import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './views/register/register.component';
import { LandingComponent } from './views/landing/landing.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { AboutComponent } from './views/about/about.component';
import { FaqComponent } from './views/faq/faq.component';
import { SupportComponent } from './views/support/support.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'competitions',
    component: CompetitionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'support', component: SupportComponent },
  { path: '**', redirectTo: '' },
];
