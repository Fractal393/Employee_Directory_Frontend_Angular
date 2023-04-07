import { Component } from '@angular/core';
import { departments, jobTitles, offices } from '../model';
import { of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  departments = [...departments];
  offices = [...offices];
  jobTitles = [...jobTitles];

  limit = 2;

  showMore() {
    this.limit = this.jobTitles.length;
  }

  showLess() {
    this.limit = 2;
  }

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
