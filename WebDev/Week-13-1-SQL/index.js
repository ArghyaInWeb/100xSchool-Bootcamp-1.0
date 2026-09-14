import express from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import z from "zod";

// const pool = new Pool({
//   connectionString:
// });

const app = express();
app.use(express.json());

const SignupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.email(),
});

app.post("/signup", async (req, res) => {
  const { data, success, error } = SignupSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({
      message: "Incorrect Inputs",
      error: JSON.parse(error)
    });
    return;
  }

  const username = data.username;
  const email = data.email;
  const password = data.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING id`,
    [username, email, hashedPassword],
  ); //! This syntax prevents SQL Injection

  res.json({
    message: "Sign up done",
    id: newUser.rows[0].id,
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const isUser = await pool.query(
    `SELECT * FROM users
        WHERE email=$1`,
    [email],
  );

  const userExists = isUser.rows[0];

  if (!userExists) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
    return;
  }

  const correctPassword = await bcrypt.compare(password, userExists.password);

  if (!correctPassword) {
    res.status(403).json({
      message: "Incorrect password",
    });
  }

  res.json({
    message: "Signed in successfully",
  });
});

app.listen(3000);
