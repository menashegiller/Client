import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[as-password]'
    // exportAs: 'pwddir'
})

export class PasswordDirective {
    @HostBinding() type: string;
    constructor() {
        this.type = 'password';
    }
    changeType(type: string): void {
        this.type = type;
    }
}
