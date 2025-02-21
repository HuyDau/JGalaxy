import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/api/categories/categories.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-and-edit-category',
  standalone: true,
  imports: [Dialog, ButtonModule, FormsModule, CommonModule],
  templateUrl: './add-and-edit-category.component.html',
  styleUrl: './add-and-edit-category.component.less',
})
export class AddAndEditCategoryComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() categoryId!: string;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() visibleChange = new EventEmitter<boolean>();
  catName: string = '';

  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categoryId'] && this.mode === 'edit' && this.categoryId){
      this.getCategoryById();
    }
  }

  getCategoryById() {
    this.categoriesService.getById(this.categoryId).then((response) => {
      this.catName = response.data.category.name;
    }).catch((error) => {
      console.error('Error fetching category info:', error);
    });
  }

  save(){
    if(this.mode === 'add'){
      this.categoriesService.create({name: this.catName}).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add category success' });
        this.modalSave.emit();
        this.closeDialog();
      });
    }else{
      this.categoriesService.update(this.categoryId, {name: this.catName}).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update category success' });
        this.modalSave.emit();
        this.closeDialog();
      });
    }
  }
  closeDialog() {
    this.visibleChange.emit(false);
  }
}
