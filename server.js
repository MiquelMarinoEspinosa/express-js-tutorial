const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

//console.log(app.get('env'));
console.log(process.env);

//Create a server
const port = process.env.PORT || 3000;

mongoose.connect(process.env.CONN_STR).then((conn) => {
  //console.log(conn);
  console.log("DB Connections Successful");
});

const server = app.listen(port, () => {
  console.log("server has started...");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occurred! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
