import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "catalogue_db"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
    }
});

export const countCatalogue = (req, res) => {
    const query = "SELECT COUNT(*) AS count FROM catalogues"; // Replace with your table name
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json({ count: results[0].count });
        }
    });
};
