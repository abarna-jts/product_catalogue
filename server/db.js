import mysql from "mysql"

 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prd_catalogue"
});

export default db;