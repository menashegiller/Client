import { AuthService } from 'common/services/auth/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { StaffGuard } from './shared/guards/staff.guard';
import { SuperUserGuard } from './shared/guards/superuser.guard';
import { HttpService } from 'common/services/http.service';
import { FilterService } from 'common/services/filter.service';
import { ValidationService } from 'common/services/validation.service';
import { HelpService } from 'common/services/help.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService }          from 'common/modules/webStorage/index';
import { LoginResolve } from './shared/resolvers/login.resolver';

export const APP_PROVIDERS = [
    AuthGuard, StaffGuard, SuperUserGuard,
    AuthService, 
    // {provide: AuthService, useFactory: () => {return new AuthService(Http)} },
        HttpService, ValidationService , FilterService,
    HelpService, DatePipe, LocalStorageService,
    LoginResolve
];
