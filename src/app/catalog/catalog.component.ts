import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
  //styles:['a{font-weight:bold}']
})
export class CatalogComponent {
  products: IProduct[];
  filter: string = '';


  constructor(
    private cartService: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.products = [];
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartService.add(product);
    this.router.navigate(['/cart'])
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((p) => p.category === this.filter)
  }
}
