const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", 
    database: "crud"    
});

// connect
connection.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to database");

  // table auto-create 
    const createTable = `
        CREATE TABLE IF NOT EXISTS mydata (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )`;
    connection.query(createTable, (err) => {
        if (err) console.error("Error creating table:", err);
        else console.log("Table ready: mydata");
    });
});

module.exports = connection;
