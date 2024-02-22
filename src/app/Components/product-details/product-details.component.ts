import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../Models/i-product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productDetails();
  }
  productDetails() {
    let id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.product = this._ProductsService.getproductDetails(id)!;
    console.log(this.product);
  }
}
