import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainersWatchlistComponent } from './containers-watchlist.component';

describe('ContainersWatchlistComponent', () => {
  let component: ContainersWatchlistComponent;
  let fixture: ComponentFixture<ContainersWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainersWatchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainersWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
