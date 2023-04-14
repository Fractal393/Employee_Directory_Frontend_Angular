import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  /* departments = [...departments];
  offices = [...offices]; */
  /* jobTitles = [...jobTitles];

  limit = 2; */

  /* showMore() {
    this.limit = this.jobTitles.length;
  }

  showLess() {
    this.limit = 2;
  } */

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
