import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Slider } from 'primeng/slider';
import { ProgressBar } from 'primeng/progressbar';
import { ProductService } from 'src/app/api/products/products.service';

@Component({
  selector: 'app-product',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.less',
  standalone: true,
})
export class ProductComponent implements OnInit {
  listProducts = [];
  

  ngOnInit() {
    this.getListProduct();
  }

  async getListProduct() {
    try{
          const response = await ProductService.getAll();
          if(response){
           this.listProducts = response.data
          }
        }catch(err){
          alert('err');
        }
  }

  
}
