import express from "express";
import axios from "axios";

const app = express();
const port = 5050;

app.get("/starships/:id", async (req, res) => {
  const { id } = req.params;
  const starships = (await axios.get(`https://swapi.dev/api/starships/${id}`)).data;
  res.json(starships);
});

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
