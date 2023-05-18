import Joi from "joi";

class ProductModel {
    public productId: number;
    public productName: string;
    public productStock: number;
    public productPrice: number;

    public constructor(product: ProductModel) {
        this.productId = product.productId;
        this.productName = product.productName;
        this.productStock = product.productStock;
        this.productPrice = product.productPrice;
    }

    private static postValidationSchema = Joi.object ({
        productId: Joi.forbidden(),
        productName: Joi.string().required().min(2).max(50),
        productStock: Joi.number().required().min(1).max(10000),
        productPrice: Joi.number().required().min(1).max(200000)
    });

    private static putValidationSchema = Joi.object ({
        productId: Joi.number().required().integer().min(1),
        productName: Joi.string().required().min(2).max(50),
        productStock: Joi.number().required().min(1).max(10000),
        productPrice: Joi.number().required().min(1).max(200000)
    });

    private static patchValidationSchema = Joi.object ({
        productId: Joi.number().required().integer().min(1),
        productName: Joi.string().optional().min(2).max(50),
        productStock: Joi.number().required().min(1).max(10000),
        productPrice: Joi.number().optional().min(1).max(200000)
    });

    public validatePost(): string {
        const result = ProductModel.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = ProductModel.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = ProductModel.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default ProductModel;
