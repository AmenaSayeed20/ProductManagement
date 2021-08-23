import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginSuccess: boolean = false;

  constructor(
    public formbuilder: FormBuilder,
    public loginServ: LoginService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginServ.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.isAdmin == true) {
            this.loginSuccess = true;

            setTimeout(() => {
              this.loginSuccess = false;
              localStorage.setItem('userLogin', 'true');
              this.router.navigate(['/products']);
            }, 2000);
          }
        },
        (error) => {
          alert(error);
        }
      );
    } else {
      alert('Enter UserNAme And Password');
    }
  }
}
