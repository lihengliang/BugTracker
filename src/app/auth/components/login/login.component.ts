import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginSuccess = false;
  errorMsgs: Array<string>;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ],
      ]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.postLogin(this.loginForm.value).subscribe(
      res => {
        this.loginSuccess = true;
      },
      err => {
        if (err.status === 422) {
          this.errorMsgs = err.error;
        }
      }
    );
  }
}
