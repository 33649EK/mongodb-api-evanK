const { connect, connection } = require("mongoose");

connect("mongodb://localhost:27017/socialdb");

module.exports = connection;
