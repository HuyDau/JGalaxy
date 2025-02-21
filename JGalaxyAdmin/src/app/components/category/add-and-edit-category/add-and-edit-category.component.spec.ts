import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditCategoryComponent } from './add-and-edit-category.component';

describe('AddAndEditCategoryComponent', () => {
  let component: AddAndEditCategoryComponent;
  let fixture: ComponentFixture<AddAndEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAndEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
