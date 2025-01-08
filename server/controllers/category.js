import db from "../db.js";

export const createCategory = (req, res) => {
  const { catalogueId, categoryName } = req.body;

  if (!catalogueId || !categoryName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const q =
    "INSERT INTO categories (catalogue_id, category_name) VALUES (?, ?)";
  const values = [catalogueId, categoryName];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(201).json({
      message: "Category Created Successfully",
      data: data,
    });
  });
};

export const getCategories = (req, res) => {
  const catalogueId = req.query.catalogueId;

  const q = `
      SELECT 
          categories.id, 
          categories.category_name, 
          categories.catalogue_id, 
          catalogues.catalogue_name
      FROM categories
      JOIN catalogues ON categories.catalogue_id = catalogues.id
      WHERE categories.catalogue_id = ?
      ORDER BY categories.id DESC
  `;

  db.query(q, [catalogueId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }
    return res.status(200).json(data);
  });
};

export const editCategory = (req, res) => {
  const { categoryId, categoryName } = req.body;

  // Check if both categoryId and categoryName are provided
  if (!categoryId || !categoryName) {
    return res
      .status(400)
      .json({ message: "Category ID and name are required." });
  }

  // SQL query to update the category name based on the ID
  const q = "UPDATE categories SET category_name = ? WHERE id = ?";

  // Execute the query
  db.query(q, [categoryName, categoryId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }

    if (result.affectedRows === 0) {
      // No rows affected means the ID doesn't exist
      return res
        .status(404)
        .json({ message: "Category not found or no changes made." });
    }

    // Successful update
    return res.status(201).json({ message: "Category updated successfully!" });
  });
};

export const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  // Check if categoryId is provided
  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required." });
  }

  // SQL query to delete the category based on the ID
  const q = "DELETE FROM categories WHERE id = ?";

  // Execute the query
  db.query(q, [categoryId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database query failed", error: err });
    }

    if (result.affectedRows === 0) {
      // No rows affected means the ID doesn't exist
      return res.status(404).json({ message: "Category not found." });
    }

    // Successful deletion
    return res.status(200).json({ message: "Category deleted successfully!" });
  });
};


export const getCategoriesprd = (req, res) => {
  const query = "SELECT id, category_name FROM categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
    res.status(200).json(results);
  });
};