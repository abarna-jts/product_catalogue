import express from "express";
import {
  createCatalogue,
  getCatalogues,
  editCatalogue,
  deleteCatalogue,
  getCatalogueById,
} from "../controllers/catalogue.js";

const router = express.Router();

router.post("/create_catalogue", createCatalogue);
router.get("/get_catalogues", getCatalogues);
router.get("/get_catalogue_by_id", getCatalogueById);
router.put("/edit_catalogue/:id", editCatalogue);
router.delete("/delete_catalogue/:id", deleteCatalogue);

export default router;
