import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'common/models/login.interface';
import { AuthService } from 'common/services/auth/auth.service';
import { HttpService } from 'common/services/http.service';
import { LoginResolve } from 'shared/resolvers/login.resolver';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'as-formTest',
    templateUrl: 'formTest.html'
})
export class FormTestComponent  implements OnInit {
    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    passValid = 0;
    constructor(private _fb: FormBuilder,public authService: AuthService,public router: Router, public httpService: HttpService,
    public loginResolve: LoginResolve,) { }

    ngOnInit() {
        // the long way
        // this.myForm = new FormGroup({
        //     name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
        //     address: new FormGroup({
        //         address1: new FormControl('', <any>Validators.required),
        //         postcode: new FormControl('8000')
        //     })
        // });

        // the short way
        this.myForm = this._fb.group({
            Email: ['', [<any>Validators.required]],
            passWord: ['', [<any>Validators.required]]
        });

        // subscribe to form changes  
        this.subcribeToFormChanges();
        
        // Update single value
      
        // Update form model
        // const people = {
        // 	name: 'Jane',
        // 	address: {
        // 		street: 'High street',
        // 		postcode: '94043'
        // 	}
        // };
        
        // (<FormGroup>this.myForm)
        //     .setValue(people, { onlySelf: true });

    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    save(model: Login, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }
     login(model: Login, isValid: boolean) {
        event.preventDefault();
         this.submitted = true;
        // this.validationService.validateEmail(user);
     /*   this.emailValid = this.validationService.validateEmail(model.Email);
        this.passValid = this.validationService.validationPassword(model.passWord);
        if (this.emailValid !== 0 || this.passValid !== 0) {
            return;
        }*/
        this.router.navigate([this.loginResolve.resolveHomeRoute()]);
      /*  this.authService.loginNew(model).subscribe(
            () => {
                // this.setMessage();
                if (this.authService.currentUser.isLoggedIn) {
                    // Redirect the user
                    this.httpService.isGood = 3;
                  //  this.httpService.isEmployee = false;
                    this.router.navigate([this.loginResolve.resolveHomeRoute()]);
                }
            },
            (err) => {
                console.log('Error: ', err);
                this.passValid = 2;
                // this.setMessage();
            });*/
    }
}