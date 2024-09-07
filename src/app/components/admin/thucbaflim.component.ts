import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thucbaflim',
  standalone: false,
  templateUrl: './thucbaflim.component.html',
  styleUrl: './thucbaflim.component.scss'
})
export class ThucbaflimComponent implements OnInit {
  username: string | null = '';

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username');
    }
  }
}
