const express = require("express");
const app = express();  // create express app
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get all data
app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

// Create new data
app.post("/api/post", (req, res)=>{
    const {name, email, contact} =req.body;
    const sqlInsert ="INSERT INTO contact_db (name, email, contact) VALUES(?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//Delete data
app.delete("/api/remove/:id", (req, res)=>{
    const {id} =req.params;
    const sqlRemove =" DELETE FROM contact_db  WHERE id=?";
    db.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});
 // Get data by ID
app.get("/api/get/:id", (req, res)=>{
    const {id}= req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet, id, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

// Update the data
app.put("/api/update/:id", (req, res)=>{
    const {id}= req.params;
    const {name, email, contact}= req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

// Check the database with send the data
app.get("/", (req, res)=>{
    // const sqlInsert ="INSERT INTO contact_db (name, email, contact) VALUES('shimul shil', 'shimul_ustc@yahoo.com', 42347239)";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express Server")
    // }); 
});

// View the running port number in consol
app.listen(5000, () =>{
    console.log("Server running on the port 5000");
})