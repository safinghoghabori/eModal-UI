import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEdiComponent } from './upload-edi.component';

describe('UploadEdiComponent', () => {
  let component: UploadEdiComponent;
  let fixture: ComponentFixture<UploadEdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadEdiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadEdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
