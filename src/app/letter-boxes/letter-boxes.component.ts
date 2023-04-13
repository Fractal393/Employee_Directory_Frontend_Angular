import { Component } from '@angular/core';
import { alphabets } from '../model';
@Component({
  selector: 'app-letter-boxes',
  templateUrl: './letter-boxes.component.html',
  styleUrls: ['./letter-boxes.component.css'],
})
export class LetterBoxesComponent {
  alphabets = [...alphabets];
}
