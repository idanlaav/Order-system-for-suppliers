import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// http://localhost:3001/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
})

// http://localhost:3001/api/products/1
router.get("/products/:productId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productId = +request.params.productId;
        const product = await productsLogic.getOneProductById(productId);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
})

export default router;
