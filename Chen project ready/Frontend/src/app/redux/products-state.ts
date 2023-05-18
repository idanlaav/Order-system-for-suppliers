import { ProductModel } from 'src/app/models/product-model';

// Products State: 
export class ProductsState {
    public products: ProductModel[] = [];
}

// Product Action Types:
export enum ProductActionType {
    FetchProducts = "FetchProducts",
}

// Product Action: 
export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

// Product Action Creators: 
export function fetchProductsAction(products: ProductModel[]): ProductAction {
    return { type: ProductActionType.FetchProducts, payload: products };
}

// Products Reducer:
export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {
        case ProductActionType.FetchProducts: // Here payload is all products (ProductModel[])
            newState.products = action.payload;
            break;
    }

    return newState;
    
}