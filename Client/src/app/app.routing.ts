import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { StaffGuard } from './shared/guards/staff.guard';
import { SuperUserGuard } from './shared/guards/superuser.guard';

import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { ForgotPasswordComponent } from './features/forgotPassword/forgotPassword.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { TableDecisionsComponent } from './features/tableDecisions/tableDecisions.component';
import { FilterReportComponent } from './features/filterReport/filterReport.component';
import { LoginResolve } from './shared/resolvers/login.resolver';

import { StudentFormComponent }            from './features/home/features/employee/studentForm.component';

const appRoutes: Routes = [
    { 
        path: '',  
        component: LoginComponent,
        resolve: {
            login: LoginResolve
        }
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
    {
      path: 'home',
     // canActivate: [ AuthGuard ],
      component: HomeComponent// ,
    },
    {
      path: 'studentForm',
     // canActivate: [ StaffGuard ],
      component: StudentFormComponent// ,
    },
    { 
        path: 'forgetpsw',  
        component: ForgotPasswordComponent
    },
    {
      path: 'employee',
       canActivate: [ SuperUserGuard ],
      component: EmployeeComponent// ,
     },
     {
      path: 'tableDecisions',
  //   canActivate: [ AuthGuard ],
      component: TableDecisionsComponent// ,
     },
      {
      path: 'filterReport',
  //   canActivate: [ AuthGuard ],
      component: FilterReportComponent// ,
     }

];


export const appRoutingProviders: any[] = [
// {path: '*other', redirectTo: ['Login']}
];

export const routing = RouterModule.forRoot(appRoutes);
