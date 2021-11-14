import mongoose from "mongoose";

const StarshipSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Starship = mongoose.model<{ model: string; count: number }>(
  "Starship",
  StarshipSchema
);

export default Starship;
