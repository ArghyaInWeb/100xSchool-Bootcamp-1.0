import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const notes = [];
const users = [];

app.use(express.json());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(
    "E:/CODING/100xBootcamp-1/100xBootcamp-Codes/WebDev/Week-9-Notes-App/frontend/index.html",
  );
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  users.push({
    username,
    password,
  });

  res.json({
    message: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const findUser = users.find(
    (user) => user.username === username && user.password === password,
  );
  if (!findUser) {
    return res.status(403).json({
      message: "User doesn't exist. Sign up first.",
    });
  }

  const JWT_TOKEN = jwt.sign(
    {
      username: username,
    },
    "secret007",
  );

  res.json({
    token: JWT_TOKEN,
  });
});


// POST - Create a note
app.post("/new-note", (req, res) => {
  const getToken = req.headers.token;

  if (!getToken) {
    return res.status(403).json({
      message: "You are not logged in.",
    });
  }
  const verifyJWT = jwt.verify(getToken, "secret007");
  const username = verifyJWT.username;

  if (!username) {
    return res.status(403).json({
      message: "Malformed token",
    });
  }

  const note = req.body.note;

  notes.push({
    username: username,
    note: note
  });

  res.json({
    message: "Note created",
  });
});

// GET - Get all notes of an user
app.get("/notes", (req, res) => {
  const getToken = req.headers.token;

  if (!getToken) {
    return res.status(403).json({
      message: "You are not logged in.",
    });
  }
  const verifyJWT = jwt.verify(getToken, "secret007");
  const username = verifyJWT.username;

  if (!username) {
    return res.status(403).json({
      message: "Malformed token",
    });
  }

  const userNotes = notes.filter((note) => note.username === username);

  res.json({
    notes: userNotes
  });
});

app.get("/signup", (req, res) => {
  res.sendFile(
    "E:/CODING/100xBootcamp-1/100xBootcamp-Codes/WebDev/Week-9-Notes-App/frontend/signup.html",
  );
});

app.get("/signin", (req, res) => {
  res.sendFile(
    "E:/CODING/100xBootcamp-1/100xBootcamp-Codes/WebDev/Week-9-Notes-App/frontend/signin.html",
  );
});

app.listen(3000, () => {
  console.log(`http://localhost:${3000}`);
});
