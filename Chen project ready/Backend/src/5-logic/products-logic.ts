import dal from "../2-utils/dal";
import ProductModel from "../4-models/product-model";
import { ResourceNotFoundError } from "../4-models/errors-model";


async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`;
    const products = await dal.execute(sql);
    return products;
}

async function getOneProductById(productId: number): Promise<ProductModel> {
    const sql = `SELECT * FROM products WHERE productId = ?`;
    const values = [productId];
    const products = await dal.execute(sql, values);
    const product = products[0];
    if (!product) {
        throw new ResourceNotFoundError(productId);
    }
    return product;
}

export default {
    getAllProducts,
    getOneProductById,
}