import mysql from "mysql";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("logo");

// Create a connection pool
const db = mysql.createPool({
  host: "localhost", // Replace with your database host
  user: "root",      // Replace with your database username
  password: "",      // Replace with your database password
  database: "prd_catalogue", // Replace with your database name
});

// Create Product with Logo
export const createProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: "Failed to upload logo" });
    }

    const { products_name, product_detail, product_amount, category_id } = req.body;
    const product_logo = req.file ? `uploads/logos/${req.file.filename}` : null;

    if (!products_name || !product_detail || !product_amount || !category_id || !product_logo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate if the category_id exists in the categories table
    const validateCatalogueQuery = "SELECT category_name FROM categories WHERE id = ?";
    db.query(validateCatalogueQuery, [category_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to validate category ID" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Category ID not found" });
      }

      const category_name = results[0].category_name;

      // Insert the product with the category_id and logo
      const query = `
        INSERT INTO products (products_name, product_detail, product_amount, category_id, category_name, logo) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(
        query,
        [products_name, product_detail, product_amount, category_id, category_name, product_logo],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to create product" });
          }
          res.status(201).json({ 
            message: "Product created successfully", 
            productId: result.insertId 
          });
        }
      );
    });
  });
};

export const getProducts = (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10); // Use query for categoryId

  if (!categoryId || isNaN(categoryId)) {
    return res.status(400).json({ message: "Valid Category ID is required" });
  }

  const query = "SELECT * FROM products WHERE category_id = ?";
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error("Error fetching products by category:", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(results);
  });
};

export const editProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: "Failed to upload logo" });
    }

    const { product_id, products_name, product_detail, product_amount } = req.body;
    const product_logo = req.file ? `uploads/logos/${req.file.filename}` : null;

    // Validate required fields
    if (!product_id || !products_name || !product_detail || !product_amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let query = "UPDATE products SET products_name = ?, product_detail = ?, product_amount = ?";
    const queryParams = [products_name, product_detail, product_amount];

    if (product_logo) {
      query += ", logo = ?";
      queryParams.push(product_logo);
    }

    query += " WHERE id = ?";
    queryParams.push(product_id);

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    });
  });
};

  // Delete a product
export const deleteProduct = (req, res) => {
  const productID = req.params.id; // Extract ID from the URL params

  console.log("Product ID to delete:", productID); // Debugging

  // Validate if productID is provided
  if (!productID) {
      return res.status(400).json({ message: "Product ID is required." });
  }

  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [productID], (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database query failed", error: err });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Product not found." });
      }

      return res.status(200).json({ message: "Product deleted successfully!" });
  });
};

// export const getallProduct =(req, res)=>{
//   const q="Select * from products";
  
// }

export const getallProduct = (req, res) => {
  

  const query = "Select * from products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(results);
  });
};


