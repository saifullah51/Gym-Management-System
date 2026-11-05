const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MYSQL CONNECTION
// ===============================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


db.connect((err) => {

    if (err) {
        console.log("MySQL connection failed:");
        console.log(err.message);
    } 
    else {
        console.log("MySQL connected successfully");
    }

});


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {

    res.send("Gym Management API is running!");

});


// ==================================================
// MEMBERS
// ==================================================


// GET ALL MEMBERS

app.get("/api/members", (req, res) => {

    const sql = `
        SELECT *
        FROM members
        ORDER BY member_id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);

    });

});


// ADD MEMBER

app.post("/api/members", (req, res) => {

    const {
        name,
        email,
        phone,
        join_date,
        status
    } = req.body;


    const sql = `
        INSERT INTO members
        (name, email, phone, join_date, status)
        VALUES (?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            name,
            email,
            phone,
            join_date,
            status || "Active"
        ],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }


            res.status(201).json({

                message: "Member added successfully",

                member_id: result.insertId

            });

        }
    );

});


// ==================================================
// MEMBERSHIP PLANS
// ==================================================


// GET ALL PLANS

app.get("/api/plans", (req, res) => {

    const sql = `
        SELECT
            plan_id,
            plan_name,
            duration_months,
            fee
        FROM membership_plans
        ORDER BY plan_id
    `;


    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(results);

    });

});


// ==================================================
// TRAINERS
// ==================================================


// GET ALL TRAINERS

app.get("/api/trainers", (req, res) => {

    const sql = `
        SELECT
            trainer_id,
            trainer_name,
            specialization,
            phone
        FROM trainers
        ORDER BY trainer_id
    `;


    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(results);

    });

});


// ==================================================
// ENROLLMENTS
// ==================================================


// GET ALL ENROLLMENTS

app.get("/api/enrollments", (req, res) => {

    const sql = `

        SELECT
            e.enrollment_id,

            m.name AS member_name,

            p.plan_name,

            t.trainer_name,

            e.start_date,

            e.expiry_date,

            CASE
                WHEN e.expiry_date >= CURDATE()
                THEN 'Active'
                ELSE 'Expired'
            END AS status

        FROM enrollments e

        INNER JOIN members m
            ON e.member_id = m.member_id

        INNER JOIN membership_plans p
            ON e.plan_id = p.plan_id

        LEFT JOIN trainers t
            ON e.trainer_id = t.trainer_id

        ORDER BY e.enrollment_id DESC

    `;


    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(results);

    });

});


// ==================================================
// SERVER
// ==================================================

const PORT = 5001;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});