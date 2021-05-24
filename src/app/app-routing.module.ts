import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth/services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/services/role-guard.service';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
