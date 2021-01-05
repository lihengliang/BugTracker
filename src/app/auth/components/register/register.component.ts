import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userCreated = false;
  errorMsgs: Array<string>;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ],
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ],
      ],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    console.log('submitting');
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid form');
      return;
    }

    this.userService.postRegister(this.registerForm.value).subscribe(
      res => {
        this.userCreated = true;
      },
      err => {
        if (err.status === 422) {
          this.errorMsgs = err.error;
        }
      }
    );
  }
}
