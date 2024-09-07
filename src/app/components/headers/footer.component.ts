import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './../../service/TokenService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../assets/styles/style.scss']
})
export class FooterComponent implements OnInit {
  username: string | null = '';

  constructor(private router: Router,private token :TokenService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username');
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token.removeToken();
      localStorage.removeItem('username');
      this.username = null;
      this.router.navigate(['/login']);
    }
  }


  navigateToFavorites(): void {
    if (this.username) {
      this.router.navigate([`/favorites/${this.username}`]); // Điều hướng đến trang yêu thích với username
    }
  }
}
