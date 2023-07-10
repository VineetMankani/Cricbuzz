require('dotenv/config');
const express = require('express');
const app = express();

const connection = require('./database');
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




// 0. Get All Users
app.get('/', (req, res) => {
    let sql = "SELECT * FROM user";
    connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
        // res.render('users', {data});
    })
});

// 1. Register Admin
app.post('/api/admin/signup', async(req, res) => {
    const {username, password, email} = req.body;
    const user_id = uuidv4();
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(password, salt);
    let sql = "INSERT INTO user (user_id, username, password, email) VALUES (?,?,?,?)";
    connection.query(sql, [user_id, username, encryptedPassword, email], (err, data) => {
        if(err) res.send({status: "Failed to create Admin Account", status_code: err.status_code})
        res.send({status: "Admin Account successfully created", status_code: 200, user_id});
    });
});

// 2. Login User
app.post('/api/admin/login', async(req, res)=>{
    const { username, password } = req.body;
    const sql = "SELECT password, user_id FROM user WHERE username=?"
    connection.query(sql, [username], async(err, data)=>{
        if(err) throw err;
        if(data.length){
            const token = jwt.sign({username, password}, process.env.SECRETKEY, {expiresIn: '2d'});
            const user_id = data[0].user_id;
            const truePassword = data[0].password;
            const comparePassword = bcrypt.compareSync(password, truePassword);
            if(comparePassword) res.send({status: "Login successful", status_code: 200, user_id, access_token: token});
            else res.send({status : "Incorrect username/password provided. Please retry", status_code: 401});
        }
        else res.send({status : "Incorrect username/password provided. Please retry", status_code: 401});
    });
});

// // 2. Login User
// app.post('/api/admin/login', async(req, res)=>{
//     const { username, password } = req.body;
//     const sql = "SELECT password FROM user WHERE username=?"
//     connection.query(sql, [username], async(err, data)=>{
//         if(err) throw err;
//         if(data.length){
//             const truePassword = data[0].password;
//             const comparePassword = bcrypt.compareSync(password, truePassword);
//             if(comparePassword) res.send({status: "Login successful", status_code: 200});
//             else res.send({status : "Incorrect username/password provided. Please retry", status_code: 401});
//         }
//         else res.send({status : "Incorrect username/password provided. Please retry", status_code: 401});
//     });
// });

// 3. Create Matches
app.post('/api/matches', async(req,res)=>{
    const {team_1, team_2, date, venue} = req.body;
    const match_id = uuidv4();
    let sql = "INSERT INTO matches (match_id, team_1, team_2, date, venue) VALUES (?,?,?,?,?)";
    connection.query(sql, [match_id, team_1, team_2, date, venue], (err, data)=>{
        if(err) res.send({message: err.message, status_code: err.status_code});
        else res.send({message: "Match created successfully", match_id});
    });
});

// 4. Get Match Schedules
app.get('/api/matches', async(req,res)=>{
    let sql = "SELECT match_id, team_1, team_2, date, venue FROM matches";
    connection.query(sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    })
});

// 5. Get Match Details
app.get('/api/matches/:match_id', async(req,res)=>{
    const { match_id } = req.params;
    let sql = "SELECT * FROM matches WHERE match_id=?";
    connection.query(sql, [match_id], async(err, data) => {
        if(err) throw err;
        res.send(data);
    })
});

// 7. Get Player Statitics
app.get('/api/players/:player_id/stats', async(req,res)=>{
    const { player_id } = req.params;
    let sql = "SELECT * FROM player WHERE player_id=?";
    connection.query(sql, [player_id], async(err, data) => {
        if(err) throw err;
        res.send(data);
    })
});


// Server Setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on Served http://localhost:${PORT}`);
    connection.connect((err)=>{
        if(err) throw err;
        console.log(`Database Connected!`);
    });
});


// 1 - DONE
// 2 - DONE
// 3 - DONE
// 4 - DONE
// 5 - Squad left
// 6 - Left
// 7 - DONE