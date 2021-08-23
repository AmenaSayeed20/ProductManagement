import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../core/components/header/header.component';

@NgModule({
  declarations: [ManageProductComponent, ProductListComponent, HeaderComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FeaturesModule {}
