import mongoose from "mongoose";

const StarshipInventorySchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const StarshipInventory = mongoose.model<{ model: string; count: number }>(
  "StarshipInventory",
  StarshipInventorySchema
);

export default StarshipInventory;
