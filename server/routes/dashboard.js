import express from 'express';
import db from "../db.js";
const router = express.Router();

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Route to get the count of catalogues
router.get('/countCatalogue', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM catalogues', (err, result) => {
        if (err) {
            console.error('Error querying database for catalogues:', err);
            return res.status(500).json({ error: 'Database query error for catalogues' });
        }
        res.json({ count: result[0].count }); // Explicitly name the returned data
    });
});

// Route to get the count of categories
router.get('/countCategories', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM categories', (err, result) => {
        if (err) {
            console.error('Error querying database for categories:', err);
            return res.status(500).json({ error: 'Database query error for categories' });
        }
        res.json({ count: result[0].count }); // Return the count of categories
    });
});

// Route to get the count of products
router.get('/countProducts', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM products', (err, result) => {
        if (err) {
            console.error('Error querying database for products:', err);
            return res.status(500).json({ error: 'Database query error for products' });
        }
        res.json({ count: result[0].count }); // Return the count of categories
    });
});

// Route to get the most recent catalogue
router.get('/recentCatalogue', (req, res) => {
    db.query('SELECT * FROM catalogues ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) {
            console.error('Error fetching the most recent catalogue:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(result[0]); // Return the most recent catalogue
    });
});

// Route to get the most recent Categories
router.get('/recentCategories', (req, res) => {
    db.query('SELECT * FROM categories ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) {
            console.error('Error fetching the most recent categories:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(result[0]); // Return the most recent catalogue
    });
});

// Route to get the most recent Products
router.get('/recentProducts', (req, res) => {
    db.query('SELECT * FROM products ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) {
            console.error('Error fetching the most recent products:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(result[0]); // Return the most recent catalogue
    });
});


export default router;
