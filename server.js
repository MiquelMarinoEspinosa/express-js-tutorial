const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

//console.log(app.get('env'));
console.log(process.env);

//Create a server
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    //console.log(conn);
    console.log("DB Connections Successful");
  })
  .catch((error) => {
    console.log("Some error has occurred");
  });

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field!"],
    unique: true,
  },
  description: String,
  duration: {
    type: Number,
    required: [true, "Duration is required field!"],
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
});

const movie = mongoose.model("Movie", movieSchema);

app.listen(port, () => {
  console.log("server has started...");
});
