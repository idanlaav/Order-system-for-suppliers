import Joi from "joi";

class SupplierOfferModel {
    public supplierOfferId: number;
    public firstItemName: string;
    public firstItemStock: number;
    public secondItemName: string;
    public secondItemStock: number;
    public thirdItemName: string;
    public thirdItemStock: string;
    public fourItemName: string;
    public fourItemStock: number;
    public fiveItemName: string;
    public fiveItemStock: number;
    public countryName: string;
    public customerName: string;
    public marketingMan: string;
    public offerPrice: number;

    public constructor(supplierOffer: SupplierOfferModel) {
        this.supplierOfferId = supplierOffer.supplierOfferId;
        this.firstItemName = supplierOffer.firstItemName;
        this.firstItemStock = supplierOffer.firstItemStock;
        this.secondItemName = supplierOffer.secondItemName;
        this.secondItemStock = supplierOffer.secondItemStock;
        this.thirdItemName = supplierOffer.thirdItemName;
        this.thirdItemStock = supplierOffer.thirdItemStock;
        this.fourItemName = supplierOffer.fourItemName;
        this.fourItemStock = supplierOffer.fourItemStock;
        this.fiveItemName = supplierOffer.fiveItemName;
        this.fiveItemStock = supplierOffer.fiveItemStock;
        this.countryName = supplierOffer.countryName;
        this.customerName = supplierOffer.customerName;
        this.marketingMan = supplierOffer.marketingMan;
        this.offerPrice = supplierOffer.offerPrice;
    }

    private static postValidationSchema = Joi.object ({
        supplierOfferId: Joi.forbidden(),
        firstItemName: Joi.string().required().min(1).max(50),
        firstItemStock: Joi.number().required().min(1).max(10000),
        secondItemName: Joi.string().optional(),
        secondItemStock: Joi.number().optional(),
        thirdItemName: Joi.string().optional(),
        thirdItemStock: Joi.number().optional(),
        fourItemName: Joi.string().optional(),
        fourItemStock: Joi.number().optional(),
        fiveItemName: Joi.string().optional(),
        fiveItemStock: Joi.number().optional(),
        countryName: Joi.string().optional().min(1).max(50),
        customerName: Joi.string().optional().min(1).max(50),
        marketingMan: Joi.string().optional().min(1).max(50),
        offerPrice: Joi.number().required().min(1).max(9999999)
    });

    private static putValidationSchema = Joi.object ({
        supplierOfferId: Joi.number().required().integer().min(1),
        firstItemName: Joi.string().optional().min(1).max(50),
        firstItemStock: Joi.number().optional().min(1).max(10000),
        secondItemName: Joi.string().optional(),
        secondItemStock: Joi.number().optional(),
        thirdItemName: Joi.string().optional(),
        thirdItemStock: Joi.number().optional(),
        fourItemName: Joi.string().optional(),
        fourItemStock: Joi.number().optional(),
        fiveItemName: Joi.string().optional(),
        fiveItemStock: Joi.number().optional(),
        countryName: Joi.string().optional().min(1).max(50),
        customerName: Joi.string().optional().min(1).max(50),
        marketingMan: Joi.string().optional().min(1).max(50),
        offerPrice: Joi.number().optional().min(1).max(9999999)
    });

    public validatePost(): string {
        const result = SupplierOfferModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = SupplierOfferModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

}

export default SupplierOfferModel;
