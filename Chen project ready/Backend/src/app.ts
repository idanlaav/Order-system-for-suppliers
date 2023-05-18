import express, { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "./4-models/errors-model";
import cors from "cors";
import path from "path";
import expressFileUpload from "express-fileupload";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import sanitize from "./3-middleware/sanitize";
import authController from "./6-controllers/auth-controller";
import productsController from "./6-controllers/products-controller";
import supplierOffersController from "./6-controllers/supplier-Offers-controller";

const expressServer = express();

if (config.isDevelopment) expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(sanitize);
expressServer.use("/api", authController);
expressServer.use("/api", productsController);
expressServer.use("/api", supplierOffersController);
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if(config.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
})

expressServer.use(catchAll);

expressServer.listen(config.port, () => console.log("Listening..."));


