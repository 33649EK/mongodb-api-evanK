const { Thought, User } = require("../../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  try {
    Thought.find().then((thoughtData) => {
      res.json(thoughtData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a thought and adds to a specific user's thoughts array
router.post("/:userId", (req, res) => {
  try {
    // Find the user that will be associated with the thought
    User.findOne({ _id: req.params.userId }).then((userData) => {
      //If req.body does not contain a username, set the username to the user's username
      if (!req.body.username) {
        req.body.username = userData.username;
      }

      // Create a thought
      Thought.create(req.body).then((thoughtData) => {
        userData.thoughts.push(thoughtData);
        userData.save();
        res.json(thoughtData);
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a thought by its _id
router.put("/:id", (req, res) => {
  try {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      (thoughtData) => {
        res.json(thoughtData);
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a thought by its _id
router.delete("/:id", (req, res) => {
  try {
    Thought.findByIdAndDelete(req.params.id).then((thoughtData) => {
      res.json(thoughtData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add a reaction to a thought
router.post("/:thoughtId/reactions", (req, res) => {
  try {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    ).then((thoughtData) => {
      res.json(thoughtData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
  try {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    ).then((thoughtData) => {
      res.json(thoughtData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
