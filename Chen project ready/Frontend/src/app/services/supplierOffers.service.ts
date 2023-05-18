import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import store from '../redux/store';
import { AuthGuard } from '../components/auth-area/guards/auth.guard';
import { SupplierOfferModel } from '../models/supplier-offer-model';
import { addSupplierOfferAction, fetchSupplierOffersActions, updateSupplierOfferAction } from '../redux/supplier-offers-state';


@Injectable({
    providedIn: 'root'
})
export class SupplierOffersService {

    constructor(private http: HttpClient, private authGard: AuthGuard) { }

    public async getAllSupplierOffers() {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const supplierOffers = await firstValueFrom(this.http.get<SupplierOfferModel[]>(environment.supplierOffersUrl));
            store.dispatch(fetchSupplierOffersActions(supplierOffers))
            return store.getState().supplierOffersState.supplierOffers;
        }
        else {
            return null;
        }
    }

    public async getSupplierOfferById(supplierOfferId: number) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const supplierOffer= await firstValueFrom(this.http.get<SupplierOfferModel[]>(environment.supplierOffersUrl + supplierOfferId));
            store.dispatch(fetchSupplierOffersActions(supplierOffer));
            return store.getState().supplierOffersState.supplierOffers;
        }
        else {
            return null;
        }
    }

    public async addSupplierOffer(supplierOffer: SupplierOfferModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const addedSupplierOffer = await firstValueFrom(this.http.post<SupplierOfferModel>(environment.supplierOffersUrl, supplierOffer))
            store.dispatch(addSupplierOfferAction(addedSupplierOffer));
            return addedSupplierOffer;
        }
        else {
            return null;
        }
    }

    public async updateSupplierOffer(supplierOffer: SupplierOfferModel) {
        const permission = this.authGard.canActivate(null, null);
        if (permission) {
            const formData = new FormData();
            formData.append("supplierOfferId", supplierOffer.supplierOfferId.toString());
            formData.append("firstItemName", supplierOffer.firstItemName);
            formData.append("firstItemStock", supplierOffer.firstItemStock.toString());
            formData.append("secondItemName", supplierOffer.secondItemName);
            formData.append("secondItemStock", supplierOffer.secondItemStock.toString());
            formData.append("thirdItemName", supplierOffer.thirdItemName);
            formData.append("thirdItemStock", supplierOffer.thirdItemStock.toString());
            formData.append("fourItemName", supplierOffer.fourItemName);
            formData.append("fourItemStock", supplierOffer.fourItemStock.toString());
            formData.append("fiveItemName", supplierOffer.fiveItemName);
            formData.append("fiveItemStock", supplierOffer.fiveItemStock.toString());
            formData.append("countryName", supplierOffer.countryName);
            formData.append("customerName", supplierOffer.customerName);
            formData.append("marketingMan", supplierOffer.marketingMan);
            formData.append("offerPrice", supplierOffer.offerPrice.toString());
            const updatedSupplierOffer= await firstValueFrom(this.http.put<SupplierOfferModel>(environment.supplierOffersUrl + supplierOffer.supplierOfferId, formData));
            store.dispatch(updateSupplierOfferAction(updatedSupplierOffer));
            return updatedSupplierOffer;
        }
        else {
            return null;
        }
    }

}


