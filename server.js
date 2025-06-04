const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

//console.log(app.get('env'));
console.log(process.env);

//Create a server
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONN_STR)
  .then((conn) => {
    //console.log(conn);
    console.log("DB Connections Successful");
  })
  .catch((error) => {
    console.log("Some error has occurred");
  });

app.listen(port, () => {
  console.log("server has started...");
});
