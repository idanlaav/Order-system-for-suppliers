import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";
import { supplierOffersReducer } from "./supplier-offers-state";


const reducers = combineReducers({
    authState: authReducer,
    productsState: productsReducer,
    supplierOffersState: supplierOffersReducer
});

const store = createStore(reducers);

export default store;