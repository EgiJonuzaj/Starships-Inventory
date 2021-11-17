import { app } from "../app";
import VehicleInventory from "../models/vehicle-inventory";

app.get("/vehicles/:model/inventory", async (req, res) => {
  const { model } = req.params;
  //it will find count by the model  
  const vehicle = await VehicleInventory.findOne({ model });
  const vehicleCount = vehicle?.count ?? 0;
  res.json({ model, count: vehicleCount });
});

app.patch("/vehicles/:model/inventory/increment/:count", async (req, res) => {
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
  const vehicle = await VehicleInventory.findOne({ model });
  if (!vehicle) {
    res.statusMessage = "Vehicle not found";
    return res.status(404).end();
  }
  //update the count by the number pasted
  const updated = await VehicleInventory.findOneAndUpdate(
    { model },
    { count: count + vehicle.count },
    { new: true }
  );
  return res.json(updated);
});

app.put("/vehicles/:model/inventory/set/:count", async (req, res) => {
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
  const vehicle = await VehicleInventory.findOne({ model });
  if (!vehicle) {
    const inserted = await VehicleInventory.insertMany({ model, count });
    return res.json(inserted);
  }
  //return the model and count
  const updated = await VehicleInventory.findOneAndUpdate(
    { model },
    { count },
    { new: true }
  );
  return res.json(updated);
});

app.patch("/vehicles/:model/inventory/decrement/:count", async (req, res) => {
  const { model, count: countStr } = req.params;
  let count = 0;
  try {
    count = parseInt(countStr);
  } catch {
    res.statusMessage = "Cannot parse the count";
    return res.status(400).end();
  }
  const vehicle = await VehicleInventory.findOne({ model });
  if (!vehicle) {
    res.statusMessage = "Vehicle not found";
    return res.status(404).end();
  }
  // it will decrement the count by the model and number pasted 
  const newCount = vehicle.count - count;
  if (newCount < 0) {
    res.statusMessage = "You cannot decrease to a negative number";
    return res.status(400).end();
  }
  const updated = await VehicleInventory.findOneAndUpdate(
    { model },
    { count: newCount < 0 ? 0 : newCount },
    { new: true }
  );
  return res.json(updated);
});
