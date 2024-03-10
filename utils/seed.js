const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.once("open", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = await User.insertMany([
    { username: "JackFrost", email: "jackfrost@gmail.com" },
    { username: "Tar", email: "tar@gmail.com" },
  ]);

  console.log("Users seeded");

  const thoughts = await Thought.insertMany([
    { thoughtText: "This is a test thought", username: "JackFrost" },
    { thoughtText: "This is another test thought", username: "Tar" },
  ]);

  console.log("Thoughts seeded");

  for (let i = 0; i < thoughts.length; i++) {
    const thought = thoughts[i];
    const user = users[i];
    user.thoughts.push(thought);
    await user.save();
  }

  console.log("Thoughts linked to users");

  process.exit(0);
});
