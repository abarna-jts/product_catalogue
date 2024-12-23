import mysql from "mysql"

 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "catalogue_db"
});

export default db;