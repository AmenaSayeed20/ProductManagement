import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as M from 'minimatch';
import { ProductService } from '../../service/product.service';
import { Camera, Memory, Ram } from '../../models/product.model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  productForm!: FormGroup;
  allMemories: Array<Memory> = [];
  allCameras: Array<Camera> = [];
  allRams: Array<Ram> = [];
  productId!: string | null;
  productAdded: boolean = false;
  productType!: string;

  constructor(
    public formbuilder: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      name: ['', Validators.required],
      memory: ['', Validators.required],
      camera: ['', Validators.required],
      price: ['', Validators.required],
      ram: ['', Validators.required],
    });

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.getProductsById(Number(this.productId)).subscribe((res) => {
        console.log(res);
        this.productForm.patchValue(res);
      });
    }

    this.getMobileDetails();
  }

  addProduct() {
    if (this.productForm.valid) {
      let obj = {
        data: this.productForm.value,
      };
      if (this.productId) {
        this.productType = 'Updated';
        obj.data['id'] = JSON.parse(this.productId);
        this.productService.editProduct(obj).subscribe((res) => {
          console.log(res);
          this.productForm.reset();
          this.productAdded = true;
          setTimeout(() => {
            this.productAdded = false;
            this.router.navigate(['/products']);
          }, 500);
        });
      } else {
        this.productType = 'Added';

        this.productService.addProduct(obj).subscribe((res) => {
          this.productForm.reset();
          this.productAdded = true;
          setTimeout(() => {
            this.productAdded = false;
            this.router.navigate(['/products']);
          }, 500);
        });
      }
    } else {
      alert('Please Enter All Fields');
    }
  }

  // get mobile details
  getMobileDetails() {
    this.productService
      .getMobileDetails()

      .subscribe((res: any) => {
        console.log(res);
        this.allMemories = res.memoryData;
        this.allCameras = res.cameraData;
        this.allRams = res.ramData;
      });
  }
}
