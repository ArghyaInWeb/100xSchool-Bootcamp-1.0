import express from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "./auth.middleware.js";
import {
  userModel,
  organizationModel,
  boardModel,
  issueModel,
} from "./models.js";

const app = express();
const JWT_SECRET = "trelloSecret";

app.use(express.json());

//NOTE All POST endpoints

// sign up
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({
    username: username,
    password: password,
  });

  if (userExists) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }

  const newUser = await userModel.create({
    username: username,
    password: password,
  });

  res.json({
    userId: newUser._id,
    message: "You are signed up successfully",
  });
});

//sign in
app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await userModel.findOne({
    username: username,
    password: password,
  });

  if (!userExists) {
    res.status(403).json({
      message: "User does not exists",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
    },
    JWT_SECRET,
  );

  res.json({
    token,
  });
});

// onboarding
app.post("/onboard", (req, res) => {});

// create organization
app.post("/organization", authenticate, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const description = req.body.description;

  if (!title) {
    res.status(400).json({
      message: "Title is required",
    });
    return;
  }

  const newOrg = await organizationModel.create({
    title,
    description,
    admin: userId,
    members: [],
  });

  res.json({
    message: "Organization created",
    id: newOrg._id,
  });
});
// dashboard/board
app.post("/create-board", (req, res) => {});

// invite members
app.post("/members", authenticate, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.id;
  const memberUsername = req.body.username;

  const findOrganization = await organizationModel.findOne({
    _id: organizationId,
    admin: userId,
  });

  if (!findOrganization) {
    res.status(411).json({
      message: "Organization doesn't exist.",
    });
    return;
  }

  if (findOrganization.admin.toString() !== userId) {
    res.status(411).json({
      message: "Unauthorized request",
    });
    return;
  }

  const invitedUser = await userModel.findOne({
    username: memberUsername,
  });

  if (!invitedUser) {
    res.status(403).json({
      message: "User doesn't exist.",
    });
    return;
  }

  const alreadyMember = await organizationModel.findOne({
    _id: organizationId,
    members: invitedUser._id,
  });

  if (alreadyMember) {
    res.status(409).json({
      message: "User is already a member",
    });
    return;
  }

  const updatedOrg = await organizationModel.findOneAndUpdate(
    {
      _id: organizationId,
      admin: userId,
    },
    {
      $addToSet: {
        members: invitedUser._id,
      },
    },
    { new: true },
  );

  res.json({
    message: "Member successfully added to the organization",
    updatedOrg,
  });
});

//NOTE All GET endpoints

// get all organizations
app.get("/organization", authenticate, async (req, res) => {
  const userId = req.userId;
  const organizationId = req.query.organizationId;

  const organization = await organizationModel
    .findOne({
      _id: organizationId,
    })
    .populate({
      path: "members",
      select: {
        _id: 1,
        username: 1,
      },
    })
    .lean();

  if (!organization) {
    res.status(404).json({
      message: "Organization doesn't exist.",
    });
    return;
  }

  if (organization.admin.toString() !== userId) {
    res.status(403).json({
      message: "Unauthorized request",
    });
    return;
  }
  res.json({
    message: "Showing all organization",
    organization
  });
});

// get all boards
app.get("/boards", (req, res) => {});

// get all issues
app.get("/issues", (req, res) => {});

// get all members
app.get("/members", (req, res) => {});

// update/edit issue
app.put("issues", (req, res) => {});

// delete/remove members
app.delete("/members", authenticate, (req, res) => {
  const userId = req.userId;
  const organizationId = req.body.id;
  const memberUsername = req.body.userName;

  const organization = ORGANIZATION.find((org) => org.id === organizationId);

  if (!organization || organization.admin !== userId) {
    res.status(411).json({
      message: "Organization doesn't exist.",
    });
    return;
  }

  const findUser = USERS.find((u) => u.username === memberUsername);

  if (!findUser) {
    res.status(403).json({
      message: "User doesn't exist.",
    });
    return;
  }

  const isMember = organization.members.includes(findUser.id);
  if (!isMember) {
    res.status(411).res.json({
      message: "No user at this organization",
    });
    return;
  }

  organization.members = organization.members.filter(
    (id) => id !== findUser.id,
  );

  res.json({
    message: "Member removed from organization",
  });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
