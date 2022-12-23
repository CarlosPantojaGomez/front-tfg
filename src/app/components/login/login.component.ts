import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventManagerService } from 'src/app/services/eventManager.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
  })

  export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    @Output() valueChange = new EventEmitter();
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private ls: EventManagerService
    ) { 
        // redirect to home if already logged in
        /* if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        } */
    }

    ngOnInit() {
        
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    /* logIn() {
        
        console.log(this.usuario.nickname);
        
        this._loginService.getusuario( this.usuario.nickname).subscribe( data=>{
            if(data != null){
                
                if(data.password != this.usuario.password){
                    this.router.navigate(['/login']);
                }else{
                    this.router.navigate(['/home',data.username]);
                }
                
            }else{

                this.router.navigate(['/login']);
                
            }
            
        },
        error=> console.error(error));
      

    } */

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.body == null) {
                        this.error = 'Usuario o contraseña erroneo';
                        this.loading = false;
                    } else {
                        this.router.navigate([this.returnUrl]);
                        this.ls.setEventLoggedEmitter(true); 
                        
                    }
                    
                    /* this.router.navigate([this.returnUrl]); */
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
        }
   
    
}