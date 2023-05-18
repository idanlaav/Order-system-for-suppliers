import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';
import { ProductModel } from '../models/product-model';
import { fetchProductsAction } from '../redux/products-state';
import store from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    // Get all products: 
    public async getAllProducts() {
        const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
        store.dispatch(fetchProductsAction(products));
        return store.getState().productsState.products;
    }

    // Get one product: 
    public async getOneProductById(productId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            if (store.getState().productsState.products.length === 0) {
                const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
                store.dispatch(fetchProductsAction(products));
            }
            const product = store.getState().productsState.products.find(p => p.productId === productId);
            return product;
        }
        else {
            return null;
        }
    }

}


