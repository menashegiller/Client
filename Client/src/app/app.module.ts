import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule,HttpModule }   from '@angular/http';

import { AUTH_PROVIDERS }           from 'angular2-jwt';
import { MyDatePickerModule }       from 'mydatepicker';
import { MdlModule }                from 'angular2-mdl';
import { AgGridModule } from "ag-grid-angular/main";

import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { APP_PROVIDERS }                from './app.providers';
import { AppComponent }                 from './app.component';
import { appRoutingProviders, routing } from './app.routing';

import { WebStorageModule }          from 'common/modules/webStorage/index';

import { AccordionModule }          from 'common/directives/accordion/index';
import { PasswordDirective }        from 'common/directives/password/password.directive';

import { HomeComponent }            from './features/home/home.component';

import { ForgotPasswordComponent }  from './features/forgotPassword/forgotPassword.component';
import { LoginWithSmsComponent }    from './features/login/loginWithSms/loginWithSms.component';
import { LoginWithEmailComponent }  from './features/login/loginWithEmail/loginWithEmail.component';
import { LoginComponent }           from './features/login/login.component';
import { EmployeeComponent }        from './features/employee/employee.component';
import { FormEmployeeComponent }    from './features/employee/features/formEmployee/formEmployee.component';
import { HeaderComponent }          from './shared/features/header/header.component';
import { FooterComponent }          from './shared/features/footer/footer.component';
import { TableDecisionsComponent }        from './features/tableDecisions/tableDecisions.component';
import { FilterReportComponent }        from './features/filterReport/filterReport.component';
/*import { FilterComponent }        from './features/filterReport/features/filter/filter.component';*/
import { ReportComponent }        from './features/filterReport/features/report/report.component';
import { MenuComponent } from './features/menu/menu.component';
import { FormTestComponent } from './features/formTest/formTest.component';
import { StudentFormComponent } from './features/home/features/employee/studentForm.component';

import * as moment_ from 'moment';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        LoginWithSmsComponent,
        LoginWithEmailComponent,
        ForgotPasswordComponent,
        HeaderComponent,
        FooterComponent,
        EmployeeComponent,
        FormEmployeeComponent,
        PasswordDirective,
        TableDecisionsComponent,
        PdfViewerComponent,
        FilterReportComponent,
        // FilterComponent,
        ReportComponent,
        MenuComponent,
        FormTestComponent,
        StudentFormComponent
    ],
    imports: [
        BrowserModule,
        JsonpModule,
        FormsModule,
        HttpModule,
        MdlModule,
        MyDatePickerModule,
        AccordionModule,
        routing,
        ReactiveFormsModule,
        AgGridModule.withComponents(
            [ReportComponent]
        )/*,
        MomentModule*/
    ],
    providers: [ APP_PROVIDERS, appRoutingProviders],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
