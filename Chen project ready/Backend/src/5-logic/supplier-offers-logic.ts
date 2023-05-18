import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import SupplierOfferModel from "../4-models/supplier-offer";

async function getAllSupplierOffers(): Promise<SupplierOfferModel[]> {
    const sql = `SELECT * FROM supplierOffers`;
    const supplierOffer = await dal.execute(sql);
    return supplierOffer;
}

async function getSupplierOfferById(supplierOfferId: number): Promise<SupplierOfferModel> {
    const sql = `SELECT * FROM supplierOffers WHERE supplierOfferId = ?`;
    
    const values = [supplierOfferId];
    const supplierOffers = await dal.execute(sql, values);
    const thisSupplierOffer = supplierOffers[0];
    if (!thisSupplierOffer) {
        throw new ResourceNotFoundError(supplierOfferId);
    }
    return thisSupplierOffer;
}

async function addSupplierOffer(supplierOffer: SupplierOfferModel): Promise<SupplierOfferModel> {
    const sql = "INSERT INTO supplierOffers VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const values = [supplierOffer.firstItemName, supplierOffer.firstItemStock, supplierOffer.secondItemName, supplierOffer.secondItemStock,
         supplierOffer.thirdItemName, supplierOffer.thirdItemStock, supplierOffer.fourItemName, supplierOffer.fourItemStock, 
         supplierOffer.fiveItemName, supplierOffer.fiveItemStock, supplierOffer.countryName, 
         supplierOffer.customerName, supplierOffer.marketingMan, supplierOffer.offerPrice];
    const addedSupplierOffer = await dal.execute(sql, values);
    return addedSupplierOffer;
}

async function updateFullSupplierOffer(supplierOffer: SupplierOfferModel): Promise<SupplierOfferModel> {    
    const errors = supplierOffer.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `UPDATE supplierOffers SET
    firstItemName = ?,
    firstItemStock = ?,
    secondItemName = ?,
    secondItemStock = ?,
    thirdItemName = ?,
    thirdItemStock = ?,
    fourItemName = ?,
    fourItemStock = ?,
    fiveItemName = ?,
    fiveItemStock = ?,
    countryName = ?,
    customerName = ?,
    marketingMan = ?,
    offerPrice = ?
                 WHERE supplierOfferId = ?`;
    const values = [supplierOffer.firstItemName, supplierOffer.firstItemStock, supplierOffer.secondItemName, supplierOffer.secondItemStock ,supplierOffer.thirdItemName, supplierOffer.thirdItemStock,
         supplierOffer.fourItemName,supplierOffer.fourItemStock,supplierOffer.fiveItemName,supplierOffer.fiveItemStock,supplierOffer.countryName,supplierOffer.customerName,supplierOffer.marketingMan,supplierOffer.offerPrice];
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(supplierOffer.supplierOfferId);
    }
    return supplierOffer;
}

export default {
    getAllSupplierOffers,
    getSupplierOfferById,
    addSupplierOffer,
    updateFullSupplierOffer
}