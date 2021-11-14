import { app } from "../app";
import VehicleInventory from "../models/vehicle-inventory";

app.get("/vehicles/:model/inventory", async (req, res) => {
  const { model } = req.params;
  const vehicle = await VehicleInventory.findOne({ model });
  const vehicleCount = vehicle?.count ?? 0;
  res.json({ model, count: vehicleCount });
});

app.patch("/vehicles/:model/inventory/increment/:count", async (req, res) => {
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
  const vehicle = await VehicleInventory.findOne({ model });
  if (!vehicle) {
    const inserted = await VehicleInventory.insertMany({ model, count });
    return res.json(inserted);
  }

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
