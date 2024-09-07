import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './../../assets/styles/style.scss'
})
export class UserProfileModalComponent implements OnInit {
  @Input() username: string | null = '';
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
