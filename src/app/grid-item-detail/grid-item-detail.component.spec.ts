import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemDetailComponent } from './grid-item-detail.component';

describe('GridItemDetailComponent', () => {
  let component: GridItemDetailComponent;
  let fixture: ComponentFixture<GridItemDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridItemDetailComponent]
    });
    fixture = TestBed.createComponent(GridItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
