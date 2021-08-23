import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, Memory, Product, Ram } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

// declare var $: any;
@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: Array<Product> = [];
  deleteProductId!: number;
  showDelete: boolean = false;
  allMemories: Array<Memory> = [];
  allCameras: Array<Camera> = [];
  allRams: Array<Ram> = [];

  constructor(public productService: ProductService, public router: Router) {}

  ngOnInit(): void {
    this.getallProducts();
    this.getMobiledetails();
  }

  getMobiledetails() {
    this.productService.getMobileDetails().subscribe((res: any) => {
      console.log(res);
      this.allMemories = res.memoryData;
      this.allCameras = res.cameraData;
      this.allRams = res.ramData;
    });
  }
  getallProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        console.log(res);
        this.allProducts = res.data;
      },
      (error) => {
        alert(error);
      }
    );
  }

  deleteProduct(val: any) {
    this.deleteProductId = val.id;
  }

  delete() {
    this.productService.deleteProducts(this.deleteProductId).subscribe(
      (res: any) => {
        if (res.message == 'Mobile detail deleted Successfully.') {
          this.getallProducts();
          location.reload();
          // this.close();
          this.showDelete = true;
          setTimeout(() => {
            this.showDelete = false;
          }, 3000);
        }
      },
      (error) => {
        alert(error);
      }
    );
  }
}
