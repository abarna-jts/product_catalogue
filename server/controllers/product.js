import mysql from "mysql";

// Create a connection pool
const db = mysql.createPool({
  host: "localhost", // Replace with your database host
  user: "root",      // Replace with your database username
  password: "",      // Replace with your database password
  database: "catalogue_db", // Replace with your database name
});

export const createProduct = (req, res) => {
  const { products_name, product_detail, product_amount } = req.body;

  if (!products_name || !product_detail || !product_amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO products (products_name, product_detail, product_amount) VALUES (?, ?, ?)";
  db.query(query, [products_name, product_detail, product_amount], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create product" });
    }
    res.status(201).json({ message: "Product created successfully", productId: result.insertId });
  });
};

export const getProducts = (req, res) => {
    const query = "SELECT * FROM products";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch products" });
      }
      res.status(200).json(results);
    });
  };

  // Edit a product
export const editProduct = (req, res) => {
    const { product_id, products_name, product_detail, product_amount } = req.body;
  
    // Validate required fields
    if (!product_id || !products_name || !product_detail || !product_amount) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const query = "UPDATE products SET products_name = ?, product_detail = ?, product_amount = ? WHERE id = ?";
    db.query(query, [products_name, product_detail, product_amount, product_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update product" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully" });
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
