import express from "express";
import { createCategory, deleteCategory, editCategory, getCategories, getCategoriesprd, getallCategory } from "../controllers/category.js";

const router = express.Router();

router.post("/create_category", createCategory);
router.get("/get_categories", getCategories);
router.post("/edit_category", editCategory);
router.delete('/delete_category/:id', deleteCategory);
router.get("/categories", getCategoriesprd);
router.get("/get_all_category", getallCategory);

export default router;
