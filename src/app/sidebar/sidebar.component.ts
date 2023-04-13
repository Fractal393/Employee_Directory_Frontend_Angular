import { Component, Input } from '@angular/core';
import { departments, jobTitles, offices } from '../model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() sidebarOpen!: boolean;

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
}

//signals
