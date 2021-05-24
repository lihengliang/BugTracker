import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: LogoutComponent,
    path: 'logout'
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: ChangePasswordComponent,
    path: 'changepassword'
  },
  {
    component: ForgotPasswordComponent,
    path: 'forgotpassword'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
