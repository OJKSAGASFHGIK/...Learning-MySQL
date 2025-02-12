const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Setting up MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // admin db login
    password: "", // admin db password
    database: "login_system", // database name
});

// Connect to database
db.connect((err) => {
    if (err){
        console.error("Error to connect to the database... :", err);
    } else { console.log("Connected successfully...") }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rote for login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Verify e-mail and password
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email], [password], (err, results) => {
        if (err){
            console.error("Error in query... :", err);
            return res.status(500).json({ message: "Error in server..." });
        }

        if (results.lenght > 0){
            res.status(200).json({ message: "Login success..." })
        } else {
            res.status(400).json({ message: "Invalid credentials..." })
        }
    });

});

// Start server
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});