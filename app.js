const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const util = require("util");
const multer = require("multer");
const app = express();
const port = 3100;
const connection = require("D:\\Dev\\hack-ruia\\backend\\SQLdb.js");
const awaitquery = util.promisify(connection.query).bind(connection);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

const find_in_user = async()=>{
    let rows = [];
    rows = await awaitquery("SELECT * from ruia.user");
    if(rows.length == 0){
        return "Data not found";
    } else {
        return rows;
    }
}

const add_user = async(id,name,email,password)=>{
    let rows = [];
    rows = await awaitquery(`INSERT INTO ruia.user(user_id, name, email, password) VALUES (${id}, "${name}", "${email}", "${password}");`);
}

app.get("/addUser",async(req,resp)=>{
    let temp = await find_in_user();
    let id = temp.length + 1;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let data = await add_user(id,name,email,password);
})

app.listen(port,()=>{
    console.log(`Server running at : http://localhost:${port}/`)
})