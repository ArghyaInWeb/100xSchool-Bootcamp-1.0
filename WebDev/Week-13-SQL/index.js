import express from "express";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
});

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

//   const newUser = await pool.query(
//     `INSERT INTO users (username, email, password) 
//     VALUES ('${username}', '${email}', '${password}')
//     RETURNING id`,
//   );

    const newUser = await pool.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING id`,
        [username, email, password]
    ) //! This syntax prevents SQL Injection 

  console.log(newUser);
  res.json({
    message: "Sign up done",
    id: newUser.rows[0].id
  });
});

app.post("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const isUser = await pool.query(
        `SELECT * FROM users
        WHERE email=$1 AND password=$2`,
        [email, password]
    )

    console.log(isUser)

    res.json({
        message: "Signed up successfully"
    })
});

app.listen(3000);
