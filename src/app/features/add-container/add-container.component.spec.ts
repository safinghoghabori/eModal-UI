import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContainerComponent } from './add-container.component';

describe('AddContainerComponent', () => {
  let component: AddContainerComponent;
  let fixture: ComponentFixture<AddContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
