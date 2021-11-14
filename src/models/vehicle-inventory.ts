import mongoose from "mongoose";

const VehicleInventorySchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const VehicleInventory = mongoose.model<{ model: string; count: number }>(
  "VehicleInventory",
  VehicleInventorySchema
);

export default VehicleInventory;
