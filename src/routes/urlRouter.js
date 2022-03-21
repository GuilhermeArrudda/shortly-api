import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { generateUrl, getUrl } from "../controllers/urlController.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchemaMiddleware(urlSchema), validateTokenMiddleware, generateUrl);
urlRouter.get("/urls/:shortUrl", getUrl);

export default urlRouter;