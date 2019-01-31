import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  constructor( private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      'user':['',Validators.required],
      'password':['',Validators.required],
    });


  }
  iniciar(): void{
    if(this.formLogin.value.user=="leo14" && this.formLogin.value.password=="leo1234"){
      console.log("entre")
      this.router.navigateByUrl('/tabs');
    }
  }

}
