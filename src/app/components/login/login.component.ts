import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../service/userService';
import { TokenService } from './../../service/TokenService';
import { LoginDTO } from './../../dtos/loginDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './../../assets/styles/style.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginDTO: LoginDTO = {
      username: this.loginForm.get('username')?.value as string,
      password: this.loginForm.get('password')?.value as string,
    };

    this.userService.login(loginDTO).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Kiểm tra phản hồi
        this.tokenService.setToken(response.token);
    
        const username = loginDTO.username as string;
    
        this.userService.getUser(username).subscribe({
          next: (user) => {
            console.log('User data:', user); // Kiểm tra dữ liệu người dùng
            localStorage.setItem('username', user.username);
    
            if (user.role && user.role.includes('ADMIN')) {
              this.router.navigate(['/homeAdmin']);
              console.log('User is an admin');
            } else {
              this.router.navigate(['/home']);
              console.log('User is not an admin');
            }
          },
          error: (error) => {
            console.error('Error fetching user data:', error);
          }
        });
      },
      error: (error) => {
        console.error('Login failed:', error); // Kiểm tra lỗi đăng nhập
      }
    });
    
  }
}
