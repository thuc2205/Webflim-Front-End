import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dangki',
  templateUrl: './dangki.component.html',
  styleUrl: '../../assets/styles/style.scss',
  standalone : false
})
export class DangkiComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  private apiRegister = `http://localhost:8080/api/v1/user/register`;

  constructor(private http: HttpClient) {}

  onClickHandler() { 
    // handle stuff 
    console.log("HEHEHE");
  } 

  register() {
    console.log('Phương thức đăng ký được gọi');
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const registerDto = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    console.log('Đang gửi yêu cầu POST đến API:', this.apiRegister);
    this.http.post(this.apiRegister, registerDto, { headers })
      .subscribe({
        next: (response) => {
          console.log('Đăng ký thành công', response);
          // Xử lý đăng ký thành công, ví dụ: chuyển hướng đến trang đăng nhập
        },
        error: (error) => {
          console.error('Lỗi đăng ký', error);
          // Xử lý lỗi đăng ký
        }
      });
  }
}
