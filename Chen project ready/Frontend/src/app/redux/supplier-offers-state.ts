import { SupplierOfferModel } from '../models/supplier-offer-model';

export class SupplierOffersState {
    public supplierOffers: SupplierOfferModel[] = [];
}

export enum SupplierOffersActionType {
    FetchSupplierOffers = "FetchSupplierOffers",
    AddSupplierOffer = "AddSupplierOffer",
    UpdateSupplierOffer = "UpdateSupplierOffer"
}

export interface SupplierOffersAction {
    type: SupplierOffersActionType;
    payload: any;
}

export function fetchSupplierOffersActions(supplierOffer: SupplierOfferModel[]): SupplierOffersAction {
    return { type: SupplierOffersActionType.FetchSupplierOffers, payload: supplierOffer };
}
export function addSupplierOfferAction(supplierOffer: SupplierOfferModel): SupplierOffersAction {
    return { type: SupplierOffersActionType.AddSupplierOffer, payload: supplierOffer };
}
export function updateSupplierOfferAction(supplierOffer: SupplierOfferModel): SupplierOffersAction {
    return { type: SupplierOffersActionType.UpdateSupplierOffer, payload: supplierOffer };
}

export function supplierOffersReducer(currentState: SupplierOffersState = new SupplierOffersState(), action: SupplierOffersAction): SupplierOffersState {

    const newState = { ...currentState };

    switch (action.type) {
        case SupplierOffersActionType.FetchSupplierOffers:
            newState.supplierOffers = action.payload;
            break;
        case SupplierOffersActionType.AddSupplierOffer:
            newState.supplierOffers.push(action.payload);
            break;
        case SupplierOffersActionType.UpdateSupplierOffer: {
            const indexToUpdate = newState.supplierOffers.findIndex(s => s.supplierOfferId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.supplierOffers[indexToUpdate] = action.payload;
            }
            break;
        }
    }

    return newState;
}