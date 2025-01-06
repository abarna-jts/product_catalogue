import express from "express";
import { createProduct} from "../controllers/product.js";
import { getProducts } from "../controllers/product.js";
import { editProduct } from "../controllers/product.js";
import { deleteProduct } from "../controllers/product.js";
const router = express.Router();

router.post("/create_product", createProduct);
router.get("/get_products", getProducts);
router.post("/edit_product", editProduct);
router.delete("/delete_product/:id", deleteProduct);

export default router;
