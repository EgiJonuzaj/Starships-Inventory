import mongoose from "mongoose";
import { app } from "./app";
import "./controllers/starship-controller";
import "./controllers/vehicle-controller";

const dbUri =
  "mongodb+srv://starship:P%40ssword01!!@cluster0.zokue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = 5050;

mongoose.connect(dbUri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
  app.listen(port, () => {
    console.log(
      `Timezones by location application is running on port ${port}.`
    );
  });
});
