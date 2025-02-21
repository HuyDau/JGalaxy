import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/api/categories/categoryModel';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CategoriesService } from 'src/app/api/categories/categories.service';
import { AddAndEditCategoryComponent } from './add-and-edit-category/add-and-edit-category.component';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-category',
  imports: [TableModule, IconFieldModule, InputIconModule, AddAndEditCategoryComponent, Toast, ConfirmDialog],
  templateUrl: './category.component.html',
  styleUrl: './category.component.less',
  providers: [CategoriesService, MessageService, ConfirmationService],
})
export class CategoryComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;
  listCategories: CategoryModel[] = [];
  selectedCategories!: CategoryModel;
  categoryId!: string;
  loading: boolean = true;
  mode: 'add' | 'edit' = 'add';
  visible: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService
      .getAll()
      .then((response) => {
        this.listCategories = response.data.categoryList ?? [];
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        this.loading = false;
      });
  }

  onFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }

  showDialog( mode: 'add' | 'edit', id?: string) {
    if(id){
      this.categoryId = id;
    }
    
    this.mode = mode;
    this.visible = true;
  }

  delete(event: Event, id: string){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete category',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
              this.loading = true;
              this.categoriesService.delete(id).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted' });
                this.getAllCategories();
              }).finally(() => {
                this.loading = false;
              });
            },
    })
  }
}
