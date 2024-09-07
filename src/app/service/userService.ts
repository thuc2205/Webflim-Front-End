import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { evironment } from '../enviroment/evironment'; // Đảm bảo đường dẫn chính xác
import { RegisterDTO } from './../dtos/RegisterDTO';
import { LoginDTO } from './../dtos/loginDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `http://localhost:8080/api/v1/user/register`;
  private apiLogin = `http://localhost:8080/api/v1/user/login`;
  private apiUser = `http://localhost:8080/api/v1/user`; // URL cho API getUser
  
  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  
  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, { headers: this.createHeaders() });
  }
  
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<any>(this.apiLogin, loginDTO, { headers: this.createHeaders() });
  }

  // Thêm phương thức getUser để gọi API GET
  getUser(username: string): Observable<any> {
    const url = `${this.apiUser}/${username}`;
    return this.http.get<any>(url, { headers: this.createHeaders() });
  }
}
