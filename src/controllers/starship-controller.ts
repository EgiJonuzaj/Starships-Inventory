import { app } from "../app";
import {
  default as StarshipInventory,
  default as StarshipInventorySchema,
} from "../models/starship-inventory";

app.get("/starships/:model/inventory", async (req, res) => {
  const { model } = req.params;
  //it will find count by the model  
  const starship = await StarshipInventorySchema.findOne({ model });
  const starshipsCount = starship?.count ?? 0;
  res.json({ model, count: starshipsCount });
});

app.patch("/starships/:model/inventory/increment/:count", async (req, res) => {
  const { model, count: countStr } = req.params;
    //it will pars the count to decimal and check the status

  let count = 0;
  try {
    count = parseInt(countStr);
  } catch {
    res.statusMessage = "Cannot parse the count";
    return res.status(400).end();
  }
  //check the status and find by model
  const starship = await StarshipInventory.findOne({ model });
  if (!starship) {
    res.statusMessage = "Startship not found";
    return res.status(404).end();
  }
  //update the count by the number pasted

  const updated = await StarshipInventory.findOneAndUpdate(
    { model },
    { count: count + starship.count },
    { new: true }
  );
  return res.json(updated);
});

app.put("/starships/:model/inventory/set/:count", async (req, res) => {
  const { model, count: countStr } = req.params;
  let count = 0;
  try {
    count = parseInt(countStr);
  } catch {
    res.statusMessage = "Cannot parse the count";
    return res.status(400).end();
  }
  if (count < 0) {
    res.statusMessage = "You cannot set inventory to a negative number";
    return res.status(400).end();
  }
    //it will check if it is the model and if it is not the model it will create it

  const starship = await StarshipInventory.findOne({ model });
  if (!starship) {
    const inserted = await StarshipInventory.insertMany({ model, count });
    return res.json(inserted);
  }
  //return the model and count
  const updated = await StarshipInventory.findOneAndUpdate(
    { model },
    { count },
    { new: true }
  );
  return res.json(updated);
});

app.patch("/starships/:model/inventory/decrement/:count", async (req, res) => {
  const { model, count: countStr } = req.params;
  let count = 0;
  try {
    count = parseInt(countStr);
  } catch {
    res.statusMessage = "Cannot parse the count";
    return res.status(400).end();
  }
  const starship = await StarshipInventory.findOne({ model });
  if (!starship) {
    res.statusMessage = "Starship not found";
    return res.status(404).end();
  }
  // it will decrement the count by the model and number pasted 

  const newCount = starship.count - count;
  if (newCount < 0) {
    res.statusMessage = "You cannot decrease to a negative number";
    return res.status(400).end();
  }
  const updated = await StarshipInventory.findOneAndUpdate(
    { model },
    { count: newCount < 0 ? 0 : newCount },
    { new: true }
  );
  return res.json(updated);
});
