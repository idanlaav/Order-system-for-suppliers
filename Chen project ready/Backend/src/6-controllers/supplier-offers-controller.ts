import express, { NextFunction, Request, Response } from "express";
import SupplierOfferModel from "../4-models/supplier-offer";
import supplierOffersLogic from "../5-logic/supplier-offers-logic";

const router = express.Router();

// http://localhost:3001/api/supplier-offers
router.get("/supplier-offers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const supplierOffer = await supplierOffersLogic.getAllSupplierOffers();
        response.json(supplierOffer);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/supplier-offers/12
router.get("/supplier-offers/:supplierOfferId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const supplierOfferId = +request.params.supplierOfferId;
        const supplierOffer = await supplierOffersLogic.getSupplierOfferById(supplierOfferId);        
        response.json(supplierOffer);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/supplier-offers
router.post("/supplier-offers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const supplierOffer = new SupplierOfferModel(request.body);
        const addedSupplierOffer = await supplierOffersLogic.addSupplierOffer(supplierOffer);
        response.status(201).json(addedSupplierOffer);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/supplier-offers/12
router.put("/supplier-offers/:supplier-offerId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.supplierOfferId = +request.params.supplierOfferId;
        const supplierOffer = new SupplierOfferModel(request.body);
        const updatedSupplierOffer= await supplierOffersLogic.updateFullSupplierOffer(supplierOffer);
        response.json(updatedSupplierOffer);
    }
    catch (err: any) {
        next(err);
    }
})

export default router;
