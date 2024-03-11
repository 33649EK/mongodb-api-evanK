# Social Network Api - Evan K

This project is a backend api for a social network application. It allows users to create, update, and delete users, thoughts, and reactions. It also allows users to add and remove friends. Express.js and mongoose are used to set up the server and interact with the database, respectively.

A walkthrough video can be found [here](https://youtu.be/OdhjFVV3lsY).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Clone the repository and run `npm install` to install the required dependencies. Then run `npm start` to start the server.

```bash
git clone
npm install
npm start
```


## Usage

The server will run on `localhost:3001`. The following routes are available:

- `/api/users` - GET
- `/api/users/:id` - GET, PUT, DELETE
- `/api/users/:userId/friends/:friendId` - POST, DELETE
- `/api/thoughts` - GET
- `/api/thoughts/:id` - GET, PUT, DELETE
- `/api/thoughts/:thoughtId/reactions` - POST
- `/api/thoughts/:thoughtId/reactions/:reactionId` - DELETE

## Credits

Evan K


## License

Licensed under the MIT License
