import express from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt"

// const pool = new Pool({
//   connectionString: 
// });

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = await pool.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING id`,
        [username, email, hashedPassword]
    ) //! This syntax prevents SQL Injection 

  res.json({
    message: "Sign up done",
    id: newUser.rows[0].id
  });
});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const isUser = await pool.query(
        `SELECT * FROM users
        WHERE email=$1`,
        [email]
    );

    const userExists = isUser.rows[0]

    if(!userExists) {
      res.status(403).json({
        message: "Incorrect credentials"
      });
      return;
    };

    const correctPassword = await bcrypt.compare(password, userExists.password)

    if(!correctPassword) {
      res.status(403).json({
        message: "Incorrect password"
      })
    }

    res.json({
        message: "Signed in successfully"
    });
});

app.listen(3000);
