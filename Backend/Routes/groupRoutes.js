import express from "express";
import Group from "../models/Group.js";
// import User from "../models/User.js"; 

const router = express.Router();

// Create a group
router.post("/create", async (req, res) => {
  const { name, members } = req.body;

  if (!name || !members || members.length === 0) {
    return res.status(400).json({ message: "Invalid group data" });
  }

  try {
    const newGroup = await Group.create({ name, members });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ message: "Failed to create group", error: err });
  }
});

// Get all groups for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const groups = await Group.find({ members: userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch groups", error: err });
  }
});

export default router;
