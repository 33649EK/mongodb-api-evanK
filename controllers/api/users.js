const router = require("express").Router();
const mongoose = require("mongoose");
const { User, Thought } = require("../../models");

router.get("/", (req, res) => {
  async function getAllUsers() {
    try {
      const users = await User.find();
      console.log(users);
      res.json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  getAllUsers();
});

router.get("/:id", (req, res) => {
  async function getUserById(id) {
    try {
      const user = await User.findById(id)
        .populate("thoughts")
        .populate("friends", "-__v -thoughts -friends");
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  getUserById(req.params.id);
});

router.post("/", (req, res) => {
  async function createUser(userData) {
    try {
      const user = await User.create(userData);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  createUser(req.body);
});

router.put("/:id", (req, res) => {
  async function updateUser(id, userData) {
    try {
      const user = await User.findByIdAndUpdate(id, userData, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  updateUser(req.params.id, req.body);
});

router.delete("/:id", async (req, res) => {
  try {
    // Deletes the user and any associated thoughts
    const user = await User.findById(req.params.id);
    console.log(user);
    const thoughts = await Thought.deleteMany({ username: user.username });
    console.log(thoughts);

    const deletedUser = await user.deleteOne();
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:userId/friends/:friendId", (req, res) => {
  async function addFriend(userId, friendId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  addFriend(req.params.userId, req.params.friendId);
});

router.delete("/:userId/friends/:friendId", (req, res) => {
  async function removeFriend(userId, friendId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  removeFriend(req.params.userId, req.params.friendId);
});

module.exports = router;
