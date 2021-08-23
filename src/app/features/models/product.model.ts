export interface Memory {
  code: number;
  label: string;
}

export interface Camera {
  code: number;
  label: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  ram: string;
  memory: string;
  camera: string;
  price: string;
}

export interface Ram {
  code: number;
  label: string;
}
export interface Addpayload {
  data: Adddata;
}
export interface Adddata {
  camera: string;
  id: string;
  memory: string;
  name: string;
  price: number;
  ram: string;
}
export interface Editpayload {
  data: Editdata;
}
export interface Editdata {
  camera: string;
  id: number;
  memory: string;
  name: string;
  price: number;
  ram: string;
}
