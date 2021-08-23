import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { forkJoin, observable } from 'rxjs';
import { Addpayload, Editpayload } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public http: HttpClient) {}

  addProduct(obj:Addpayload) {
    return this.http.post(environment.apiEndPoint + 'addmobile', obj);
  }

  editProduct(obj:Editpayload) {
    return this.http.put(environment.apiEndPoint + 'editmobile', obj);
  }

  getProducts() {
    return this.http.get(environment.apiEndPoint + 'getmobiles');
  }

  deleteProducts(id: number) {
    return this.http.delete(environment.apiEndPoint + 'deleteMobile/' + id);
  }

  getProductsById(id:number) {
    return this.http.get(environment.apiEndPoint + 'getMobile/' + id);
  }

  getMobileDetails() {
    return forkJoin({
      memoryData: this.http.get(environment.apiEndPoint + 'lookup/memory'),
      cameraData: this.http.get(environment.apiEndPoint + 'lookup/camera'),
      ramData: this.http.get(environment.apiEndPoint + 'lookup/ram'),
    });
  }
}
