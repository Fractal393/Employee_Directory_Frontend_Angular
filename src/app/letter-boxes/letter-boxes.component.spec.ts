import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxesComponent } from './letter-boxes.component';

describe('LetterBoxesComponent', () => {
  let component: LetterBoxesComponent;
  let fixture: ComponentFixture<LetterBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterBoxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
